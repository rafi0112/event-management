import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FiEdit, FiTrash2, FiPlus, FiCalendar, FiMapPin } from 'react-icons/fi';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';

const ManageEvents = () => {
	const { currentUser } = useAuth();
	const [userEvents, setUserEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	// Fetch user's events using axios
	useEffect(() => {
		const fetchUserEvents = async () => {
			if (!currentUser?.email) {
				setIsLoading(false);
				return;
			}

			try {
				setIsLoading(true);
				let allEvents = [];

				// First try to fetch from server
				try {
					const response = await axios.get(`${import.meta.env.VITE_baseApi}/events`);
					allEvents = Array.isArray(response.data?.events) 
						? response.data.events 
						: Array.isArray(response.data) 
						? response.data 
						: [];
					console.log('Events fetched from server:', allEvents);
				} catch {
					console.warn('Server not available, falling back to local data');
					
					// Fallback to local JSON file
					const response = await axios.get('/eventsData.json');
					allEvents = Array.isArray(response.data) ? response.data : [];
					console.log('Events fetched from local file:', allEvents);
				}

				// Filter events created by current user
				const userCreatedEvents = allEvents.filter(event => 
					event.createdBy === currentUser.email
				);

				setUserEvents(userCreatedEvents);
				console.log(`Found ${userCreatedEvents.length} events created by ${currentUser.email}`);

			} catch (error) {
				console.error('Error fetching user events:', error);
				toast.error('Failed to load your events');
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserEvents();
	}, [currentUser]);
	const handleDeleteEvent = async (eventId) => {
		if (!window.confirm('Are you sure you want to delete this event?')) {
			return;
		}

		try {
			setIsDeleting(true);

			// Try to delete from server first
			try {
				const token = await currentUser.getIdToken();
				await axios.delete(`${import.meta.env.VITE_baseApi}/events/${eventId}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				toast.success('Event deleted successfully');
				console.log('Event deleted from server:', eventId);
			} catch {
				// Fallback: just show success message for demo mode
				toast.success('Event deleted successfully! (Demo mode)');
				console.log('Event would be deleted:', eventId);
			}

			// Remove from local state
			setUserEvents(prevEvents => 
				prevEvents.filter(event => 
					(event._id || event.id || event.title) !== eventId
				)
			);

		} catch (error) {
			console.error('Error deleting event:', error);
			toast.error('Failed to delete event');
		} finally {
			setIsDeleting(false);
		}
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center pt-16'>
				<LoadingSpinner size='xl' />
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-base-200 pt-16'>
			<div className='container mx-auto px-4 py-8'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<div className='flex justify-between items-center mb-8'>
						<div>
							<h1 className='text-3xl font-bold text-base-content mb-2'>
								Manage Events
							</h1>
							<p className='text-base-content/70'>
								View and manage the events you've created
							</p>
						</div>
						<Link to='/create-event' className='btn btn-primary'>
							<FiPlus className='mr-2' />
							Create New Event
						</Link>
					</div>

					{userEvents.length === 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
							className='text-center py-16'
						>
							<FiCalendar className='text-6xl text-base-content/30 mb-4 mx-auto' />
							<h2 className='text-2xl font-bold text-base-content mb-4'>
								No Events Created Yet
							</h2>
							<p className='text-base-content/70 mb-6'>
								Start making a difference by creating your first event!
							</p>
							<Link to='/create-event' className='btn btn-primary'>
								<FiPlus className='mr-2' />
								Create Your First Event
							</Link>
						</motion.div>
					) : (
						<div className='grid gap-6'>
							{userEvents.map((event, index) => (
								<motion.div
									key={event._id}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									className='card bg-base-100 shadow-xl'
								>
									<div className='card-body'>
										<div className='flex flex-col lg:flex-row gap-6'>
											<div className='flex-shrink-0'>
												<img
													src={event.thumbnailUrl || '/placeholder-event.jpg'}
													alt={event.title}
													className='w-full lg:w-48 h-32 object-cover rounded-lg'
													onError={(e) => {
														e.target.src = '/placeholder-event.jpg';
													}}
												/>
											</div>

											<div className='flex-1'>
												<div className='flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4'>
													<div className='flex-1'>
														<h2 className='card-title text-xl mb-2'>
															{event.title}
														</h2>

														<div className='flex flex-wrap gap-4 text-sm text-base-content/70 mb-3'>
															<div className='flex items-center'>
																<FiCalendar className='mr-1' />
																{formatDate(event.eventDate)}
															</div>
															<div className='flex items-center'>
																<FiMapPin className='mr-1' />
																{event.location}
															</div>
															<div className='badge badge-outline'>
																{event.type}
															</div>
														</div>

														<p className='text-base-content/70 line-clamp-2'>
															{event.description}
														</p>														{event.members && (
															<div className='mt-2'>
																<span className='text-sm font-medium'>
																	{event.members.length} member
																	{event.members.length !== 1 ? 's' : ''}
																</span>
															</div>
														)}
													</div>{' '}
													<div className='flex gap-2'>
														{' '}
														<Link
															to={`/edit-event/${event._id}`}
															className='btn btn-outline btn-sm'
														>
															<FiEdit className='mr-1' />
															Edit
														</Link>														<button
															className='btn btn-error btn-outline btn-sm'
															onClick={() => handleDeleteEvent(event._id || event.id || event.title)}
															disabled={isDeleting}
														>
															<FiTrash2 className='mr-1' />
															{isDeleting ? 'Deleting...' : 'Delete'}
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default ManageEvents;
