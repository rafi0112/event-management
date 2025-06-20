import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FiCalendar, FiMapPin, FiUsers, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router';
import axios from 'axios';

const JoinedEvents = () => {
	const { currentUser } = useAuth();
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch all events using axios
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				setIsLoading(true);
				setError(null);
				
				// First try to fetch from the server
				let response;
				try {
					response = await axios.get(`${import.meta.env.VITE_baseApi}/events`);
					console.log('Events fetched from server:', response.data);
				} catch {
					console.warn('Server not available, falling back to local data');
					
					// Fallback to local JSON file
					response = await axios.get('/eventsData.json');
					console.log('Events fetched from local file:', response.data);
				}
						// Handle different response structures
				let eventsData = Array.isArray(response.data?.events) 
					? response.data.events 
					: Array.isArray(response.data) 
					? response.data 
					: [];
				
				// Add index-based IDs to events if they don't have them (for local data)
				eventsData = eventsData.map((event, index) => ({
					...event,
					_id: event._id || index.toString()
				}));
				
				setEvents(eventsData);
			} catch (err) {
				console.error('Error fetching events:', err);
				setError('Failed to load events. Please try again later.');
			} finally {
				setIsLoading(false);
			}
		};

		if (currentUser) {
			fetchEvents();
		} else {
			setIsLoading(false);
		}
	}, [currentUser]);

	// Filter events that the current user has joined and sort by date
	const joinedEvents = useMemo(() => {
		if (!currentUser || !events.length) return [];
		
		const userJoinedEvents = events.filter(event => 
			event.members && event.members.includes(currentUser.email)
		);
		
		// Sort by event date (earliest first)
		return userJoinedEvents.sort((a, b) => {
			return new Date(a.eventDate) - new Date(b.eventDate);
		});
	}, [events, currentUser]);

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const isEventUpcoming = (eventDate) => {
		return new Date(eventDate) > new Date();
	};
	const sortedEvents = joinedEvents;

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center pt-16'>
				<LoadingSpinner size='xl' />
			</div>
		);
	}

	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center pt-16'>
				<div className='text-center'>
					<h2 className='text-2xl font-bold text-error mb-4'>
						Error Loading Events
					</h2>
					<p className='text-base-content/70 mb-4'>
						{error}
					</p>
					<button 
						onClick={() => window.location.reload()} 
						className='btn btn-primary'
					>
						Try Again
					</button>
				</div>
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
					<div className='mb-8'>
						<h1 className='text-3xl font-bold text-base-content mb-2'>
							My Joined Events
						</h1>
						<p className='text-base-content/70'>
							Events you've joined, sorted by date
						</p>
					</div>

					{sortedEvents.length === 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
							className='text-center py-16'
						>
							<FiUsers className='text-6xl text-base-content/30 mb-4 mx-auto' />
							<h2 className='text-2xl font-bold text-base-content mb-4'>
								No Events Joined Yet
							</h2>
							<p className='text-base-content/70 mb-6'>
								Explore upcoming events and join the ones that interest you!
							</p>
							<Link to='/events' className='btn btn-primary'>
								<FiCalendar className='mr-2' />
								Browse Events
							</Link>
						</motion.div>
					) : (						<div className='grid gap-6'>
							{sortedEvents.map((event, index) => {
								// Generate a unique key for each event
								const eventKey = event._id || event.id || `${event.title}-${index}`;
								// Generate event URL slug from title
								const eventSlug = event.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
								
								return (
									<motion.div
										key={eventKey}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.4, delay: index * 0.1 }}
										className={`card bg-base-100 shadow-xl ${
											!isEventUpcoming(event.eventDate) ? 'opacity-75' : ''
										}`}
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
															<div className='flex items-center gap-2 mb-2'>
																<h2 className='card-title text-xl'>
																	{event.title}
																</h2>
																{isEventUpcoming(event.eventDate) ? (
																	<div className='badge badge-success'>
																		Upcoming
																	</div>
																) : (
																	<div className='badge badge-neutral'>Past</div>
																)}
															</div>

															<div className='flex flex-wrap gap-4 text-sm text-base-content/70 mb-3'>
																<div className='flex items-center'>
																	<FiCalendar className='mr-1' />
																	{formatDate(event.eventDate)}
																</div>
																<div className='flex items-center'>
																	<FiMapPin className='mr-1' />
																	{event.location}
																</div>
																<div className='flex items-center'>
																	<FiClock className='mr-1' />
																	{isEventUpcoming(event.eventDate)
																		? `${Math.ceil(
																				(new Date(event.eventDate) - new Date()) /
																					(1000 * 60 * 60 * 24)
																		  )} days left`
																		: 'Event completed'}
																</div>
																<div className='badge badge-outline'>
																	{event.type}
																</div>
															</div>

															<p className='text-base-content/70 line-clamp-2'>
																{event.description}
															</p>

															{event.members && (
																<div className='mt-2'>
																	<span className='text-sm font-medium'>
																		<FiUsers className='inline mr-1' />
																		{event.members.length} member
																		{event.members.length !== 1 ? 's' : ''} joined
																	</span>
																</div>
															)}

															<div className='mt-3'>
																<span className='text-sm text-base-content/60'>
																	Organized by: {event.createdBy || 'Anonymous'}
																</span>
															</div>
														</div>

														<div className='flex gap-2'>
															<Link
																to={`/events/${eventSlug}`}
																className='btn btn-outline btn-sm'
															>
																View Details
															</Link>
														</div>
													</div>
												</div>
											</div>
										</div>
									</motion.div>
								);
							})}
						</div>
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default JoinedEvents;
