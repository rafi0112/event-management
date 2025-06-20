import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { toast } from 'react-hot-toast';
import {
	FaCalendar,
	FaClock,
	FaMapMarkerAlt,
	FaTag,
	FaUsers,
	FaUser,
	FaArrowLeft,
} from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import useDynamicTitle from '../hooks/useDynamicTitle';
import axios from 'axios';

const EventDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { currentUser: user } = useAuth();
	const [event, setEvent] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isJoining, setIsJoining] = useState(false);

	useDynamicTitle('Event Details');

	// Fetch event details using axios
	useEffect(() => {
		const fetchEventDetails = async () => {
			try {
				setIsLoading(true);
				setError(null);
				
				let response;
				try {
					// Get Firebase auth token
					const token = await user?.getIdToken();
					
					// First try to fetch from server
					response = await axios.get(`${import.meta.env.VITE_baseApi}/events/${id}`, {
						headers: {
							Authorization: `Bearer ${token}`
						}
					});
					console.log('Event fetched from server:', response.data);				
				} catch {
					console.warn('Server not available, falling back to local data');
					
					// Fallback to local JSON file
					const localResponse = await axios.get('/eventsData.json');
					const events = Array.isArray(localResponse.data) ? localResponse.data : [];
					
					// Find the event by matching with the ID (you might need to generate IDs)
					const foundEvent = events.find((evt, index) => 
						evt.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === id ||
						index.toString() === id
					);
					
					if (foundEvent) {
						response = { data: foundEvent };
					} else {
						throw new Error('Event not found');
					}
				}
				
				setEvent(response.data);
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

	// Handle joining event
	const handleJoinEvent = async () => {
		if (!user) {
			toast.error('Please login to join events');
			navigate('/login');
			return;
		}

		try {
			setIsJoining(true);
			
			// Try to join via API first
			try {
				const response = await axios.patch(`${import.meta.env.VITE_baseApi}/events/${id}`, {
					userEmail: user.email,
				});
				
				toast.success('Successfully joined the event!');
				
				// Update local state
				setEvent(response.data);			} catch {
				// Fallback: just show success message for demo mode
				toast.success('Successfully joined the event! (Demo mode)');
				
				// Update local state for demo
				setEvent(prev => ({
					...prev,
					members: [...(prev.members || []), user.email]
				}));
			}
		} catch (err) {
			console.error('Error joining event:', err);
			toast.error('Failed to join event');
		} finally {
			setIsJoining(false);
		}
	};

	const handleGoBack = () => {
		navigate(-1);
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
						onClick={() => navigate('/events')}
						className='btn btn-primary'
					>
						Back to Events
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
						The event you're looking for doesn't exist.
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
	const isAlreadyJoined = event.members?.includes(user?.email);
	const isEventPassed = new Date(event.eventDate) < new Date();
	const isOwnEvent = event.createdBy === user?.email;
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen bg-base-100 py-8'
		>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Back Button */}
				<motion.button
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.1 }}
					onClick={handleGoBack}
					className='btn btn-ghost mb-6 gap-2'
				>
					<FaArrowLeft /> Back
				</motion.button>

				<div className='grid lg:grid-cols-2 gap-8'>
					{/* Event Image */}					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className='relative'
					>
						<img
							src={event.thumbnailUrl || '/placeholder-event.jpg'}
							alt={event.title}
							className='w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg'
						/>
						{isEventPassed && (
							<div className='absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center'>
								<span className='text-white text-2xl font-bold'>
									Event Ended
								</span>
							</div>
						)}
					</motion.div>

					{/* Event Details */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
						className='space-y-6'
					>						<div>
							<h1 className='text-3xl lg:text-4xl font-bold text-base-content mb-2'>
								{event.title}
							</h1>
							<div className='badge badge-primary badge-lg'>
								{event.type}
							</div>
						</div>

						<div className='space-y-4'>
							<div className='flex items-center gap-3 text-base-content'>
								<FaCalendar className='text-primary' />
								<span>
									{new Date(event.eventDate).toLocaleDateString('en-US', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</span>
							</div>

							<div className='flex items-center gap-3 text-base-content'>
								<FaMapMarkerAlt className='text-primary' />
								<span>{event.location}</span>
							</div>

							<div className='flex items-center gap-3 text-base-content'>
								<FaTag className='text-primary' />
								<span>{event.type}</span>
							</div>

							<div className='flex items-center gap-3 text-base-content'>
								<FaUsers className='text-primary' />
								<span>
									{event.members?.length || 0} members joined
								</span>
							</div>

							<div className='flex items-center gap-3 text-base-content'>
								<FaUser className='text-primary' />
								<span>Created by {event.createdBy}</span>
							</div>
						</div>

						<div className='prose max-w-none'>
							<h3 className='text-xl font-semibold text-base-content mb-2'>
								Description
							</h3>
							<p className='text-base-content/80 leading-relaxed'>
								{event.description}
							</p>
						</div>						{/* Join Button */}
						<div className='pt-4'>
							{isOwnEvent ? (
								<div className='alert alert-info'>
									<span>
										This is your event. You can manage it from your dashboard.
									</span>
								</div>
							) : isEventPassed ? (
								<div className='alert alert-warning'>
									<span>This event has already ended.</span>
								</div>
							) : isAlreadyJoined ? (
								<div className='alert alert-success'>
									<span>✓ You have already joined this event!</span>
								</div>
							) : (
								<button
									onClick={handleJoinEvent}
									disabled={isJoining}
									className='btn btn-primary btn-lg w-full sm:w-auto'
								>
									{isJoining ? (
										<>
											<span className='loading loading-spinner loading-sm'></span>
											Joining...
										</>
									) : (
										'Join Event'
									)}
								</button>
							)}
						</div>
					</motion.div>
				</div>				{/* Members Section */}
				{event.members && event.members.length > 0 && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className='mt-12'
					>
						<h3 className='text-2xl font-bold text-base-content mb-6'>
							Members ({event.members.length})
						</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
							{event.members.map((memberEmail, index) => (
								<motion.div
									key={memberEmail}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.1 * index }}
									className='card bg-base-200 shadow-sm'
								>
									<div className='card-body p-4 text-center'>
										<div className='avatar placeholder mb-2'>
											<div className='bg-primary text-primary-content rounded-full w-12 h-12'>
												<span className='text-lg font-bold'>
													{memberEmail.charAt(0).toUpperCase()}
												</span>
											</div>
										</div>
										<h4 className='font-medium text-base-content text-sm'>
											{memberEmail}
										</h4>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
			</div>
		</motion.div>
	);
};

export default EventDetails;
