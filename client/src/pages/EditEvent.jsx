import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import { FaArrowLeft, FaCalendar, FaCamera } from 'react-icons/fa';
import {
	FiCalendar,
	FiMapPin,
	FiImage,
	FiType,
	FiFileText,
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import useDynamicTitle from '../hooks/useDynamicTitle';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

const EditEvent = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { currentUser } = useAuth();	const [event, setEvent] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdating, setIsUpdating] = useState(false);
	const [error, setError] = useState(null);
	const [errors, setErrors] = useState({});

	useDynamicTitle('Edit Event');

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		type: 'Cleanup',
		eventDate: new Date(),
		location: '',
		thumbnailUrl: '',
	});

	const [selectedDate, setSelectedDate] = useState(new Date());
	const eventTypes = [
		'Cleanup',
		'Plantation',
		'Donation',
		'Education',
		'Healthcare',
		'Community Building',
		'Environmental',
		'Other',
	];

	const validateForm = () => {
		const newErrors = {};

		if (!formData.title.trim()) {
			newErrors.title = 'Event title is required';
		}

		if (!formData.description.trim()) {
			newErrors.description = 'Event description is required';
		} else if (formData.description.length < 50) {
			newErrors.description = 'Description must be at least 50 characters long';
		}

		if (!formData.location.trim()) {
			newErrors.location = 'Event location is required';
		}

		if (!formData.thumbnailUrl.trim()) {
			newErrors.thumbnailUrl = 'Thumbnail image URL is required';
		} else {
			try {
				new URL(formData.thumbnailUrl);
			} catch {
				newErrors.thumbnailUrl = 'Please enter a valid URL';
			}
		}

		if (formData.eventDate <= new Date()) {
			newErrors.eventDate = 'Event date must be in the future';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Fetch event details using axios
	useEffect(() => {
		const fetchEventDetails = async () => {
			try {
				setIsLoading(true);
				setError(null);
						// Fetch event data from server API only
				const token = await currentUser.getIdToken();
				const response = await axios.get(`${import.meta.env.VITE_baseApi}/events/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				console.log('Event fetched from server:', response.data);
				
				const eventData = response.data;
				setEvent(eventData);

				// Populate form with existing data
				const eventDate = new Date(eventData.eventDate);
				setFormData({
					title: eventData.title || '',
					description: eventData.description || '',
					type: eventData.type || 'Cleanup',
					eventDate: eventDate,
					location: eventData.location || '',
					thumbnailUrl: eventData.thumbnailUrl || '',
				});
				setSelectedDate(eventDate);

			} catch (err) {
				console.error('Error fetching event details:', err);
				setError(err.message || 'Failed to load event details');
			} finally {
				setIsLoading(false);
			}
		};

		if (id) {
			fetchEventDetails();
		}
	}, [id]);
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors((prev) => ({
				...prev,
				[name]: '',
			}));
		}
	};
	const handleDateChange = (date) => {
		setSelectedDate(date);
		setFormData((prev) => ({
			...prev,
			eventDate: date,
		}));

		if (errors.eventDate) {
			setErrors((prev) => ({
				...prev,
				eventDate: '',
			}));
		}
	};	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			setIsUpdating(true);

			const submissionData = {
				...formData,
				eventDate: selectedDate.toISOString(),
				createdBy: event.createdBy, // Keep original creator
				members: event.members || [event.createdBy], // Keep existing members
			};			// Update event on server
			const response = await axios.put(`${import.meta.env.VITE_baseApi}/events/${id}`, submissionData);
			console.log('Event updated on server:', response.data);
			toast.success('Event updated successfully!');

			// Navigate back to manage events
			navigate('/manage-events');

		} catch (error) {
			console.error('Error updating event:', error);
			toast.error(error.response?.data?.message || 'Failed to update event');
		} finally {
			setIsUpdating(false);
		}
	};

	const handleGoBack = () => {
		navigate('/manage-events');
	};

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<LoadingSpinner />
			</div>
		);
	}
	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-red-600 mb-4'>
						Error Loading Event
					</h2>
					<p className='text-gray-600 mb-4'>
						{error}
					</p>
					<button
						onClick={() => navigate('/manage-events')}
						className='btn btn-primary'
					>
						Back to Manage Events
					</button>
				</div>
			</div>
		);
	}

	if (!event) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-gray-800 mb-4'>
						Event Not Found
					</h2>
					<p className='text-gray-600 mb-4'>
						The event you're trying to edit doesn't exist.
					</p>
					<button
						onClick={() => navigate('/manage-events')}
						className='btn btn-primary'
					>
						Back to Manage Events
					</button>
				</div>
			</div>
		);
	}
	// Check if current user is the creator
	if (event && event.createdBy !== currentUser?.email) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-red-600 mb-4'>
						Access Denied
					</h2>
					<p className='text-gray-600 mb-4'>
						You don't have permission to edit this event.
					</p>
					<button
						onClick={() => navigate('/events')}
						className='btn btn-primary'
					>
						Back to Events
					</button>
				</div>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen bg-base-100 py-8'
		>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className='mb-8'
				>
					<button onClick={handleGoBack} className='btn btn-ghost mb-4 gap-2'>
						<FaArrowLeft /> Back to Manage Events
					</button>
					<h1 className='text-3xl lg:text-4xl font-bold text-base-content'>
						Edit Event
					</h1>
					<p className='text-base-content/70 mt-2'>
						Update your event details below
					</p>
				</motion.div>

				{/* Form */}
				<motion.form
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					onSubmit={handleSubmit}
					className='card bg-base-200 shadow-lg'
				>					<div className='card-body'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
							{/* Left Column */}
							<div className='space-y-6'>
								{/* Event Title */}
								<div className='form-control'>
									<label className='label'>
										<span className='label-text font-medium'>
											Event Title *
										</span>
									</label>
									<div className='relative'>
										<input
											type='text'
											name='title'
											value={formData.title}
											onChange={handleInputChange}
											placeholder='e.g., Road Cleaning in Mirpur 10, Dhaka'
											className={`input input-bordered w-full pl-10 ${
												errors.title ? 'input-error' : ''
											}`}
											required
										/>
										<FiFileText className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
									</div>
									{errors.title && (
										<label className='label'>
											<span className='label-text-alt text-error'>
												{errors.title}
											</span>
										</label>
									)}
								</div>

								{/* Event Type */}
								<div className='form-control'>
									<label className='label'>
										<span className='label-text font-medium'>Event Type *</span>
									</label>
									<div className='relative'>
										<select
											name='type'
											value={formData.type}
											onChange={handleInputChange}
											className='select select-bordered w-full pl-10'
											required
										>
											{eventTypes.map((type) => (
												<option key={type} value={type}>
													{type}
												</option>
											))}
										</select>
										<FiType className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
									</div>
								</div>

								{/* Location */}
								<div className='form-control'>
									<label className='label'>
										<span className='label-text font-medium'>Location *</span>
									</label>
									<div className='relative'>
										<input
											type='text'
											name='location'
											value={formData.location}
											onChange={handleInputChange}
											placeholder='e.g., Hossainpur, Kishoreganj'
											className={`input input-bordered w-full pl-10 ${
												errors.location ? 'input-error' : ''
											}`}
											required
										/>
										<FiMapPin className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
									</div>
									{errors.location && (
										<label className='label'>
											<span className='label-text-alt text-error'>
												{errors.location}
											</span>
										</label>
									)}
								</div>

								{/* Date */}
								<div className='form-control'>
									<label className='label'>
										<span className='label-text font-medium'>Event Date *</span>
									</label>
									<div className='relative'>
										<DatePicker
											selected={selectedDate}
											onChange={handleDateChange}
											minDate={new Date()}
											dateFormat='MMMM d, yyyy'
											className={`input input-bordered w-full pl-10 ${
												errors.eventDate ? 'input-error' : ''
											}`}
											placeholderText='Select event date'
											required
										/>
										<FiCalendar className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
									</div>
									{errors.eventDate && (
										<label className='label'>
											<span className='label-text-alt text-error'>
												{errors.eventDate}
											</span>
										</label>
									)}
								</div>
							</div>

							{/* Right Column */}
							<div className='space-y-6'>
								{/* Thumbnail URL */}
								<div className='form-control'>
									<label className='label'>
										<span className='label-text font-medium'>
											Thumbnail Image URL *
										</span>
									</label>
									<div className='relative'>
										<input
											type='url'
											name='thumbnailUrl'
											value={formData.thumbnailUrl}
											onChange={handleInputChange}
											placeholder='https://example.com/image.jpg'
											className={`input input-bordered w-full pl-10 ${
												errors.thumbnailUrl ? 'input-error' : ''
											}`}
											required
										/>
										<FiImage className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
									</div>
									{errors.thumbnailUrl && (
										<label className='label'>
											<span className='label-text-alt text-error'>
												{errors.thumbnailUrl}
											</span>
										</label>
									)}
									{formData.thumbnailUrl && !errors.thumbnailUrl && (
										<div className='mt-2'>
											<img
												src={formData.thumbnailUrl}
												alt='Thumbnail preview'
												className='w-32 h-24 object-cover rounded-lg border'
												onError={() =>
													setErrors((prev) => ({
														...prev,
														thumbnailUrl: 'Invalid image URL',
													}))
												}
											/>
										</div>
									)}
								</div>

								{/* Description */}
								<div className='form-control'>
									<label className='label'>
										<span className='label-text font-medium'>
											Event Description *
										</span>
									</label>
									<textarea
										name='description'
										value={formData.description}
										onChange={handleInputChange}
										placeholder='Describe your event, its goals, what volunteers should expect, and any requirements...'
										className={`textarea textarea-bordered h-32 resize-none ${
											errors.description ? 'textarea-error' : ''
										}`}
										required
									></textarea>
									<label className='label'>
										<span className='label-text-alt'>
											{formData.description.length}/50 minimum characters
										</span>
									</label>
									{errors.description && (
										<label className='label'>
											<span className='label-text-alt text-error'>
												{errors.description}
											</span>
										</label>
									)}
								</div>
							</div>
						</div>

						{/* Submit Button */}
						<div className='card-actions justify-end mt-8 pt-6 border-t border-base-300'>
							<button
								type='button'
								onClick={handleGoBack}
								className='btn btn-ghost'
							>
								Cancel
							</button>							<button
								type='submit'
								disabled={isUpdating}
								className='btn btn-primary'
							>
								{isUpdating ? (
									<>
										<span className='loading loading-spinner loading-sm'></span>
										Updating...
									</>
								) : (
									'Update Event'
								)}
							</button>
						</div>
					</div>
				</motion.form>
			</div>
		</motion.div>
	);
};

export default EditEvent;
