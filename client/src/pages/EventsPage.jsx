import React, { useState, useMemo, useEffect } from 'react';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiSearch, FiFilter, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import axios from 'axios';

const EventsPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedType, setSelectedType] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const eventsPerPage = 12;

	// Fetch events using axios
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
				const eventsData = Array.isArray(response.data?.events) 
					? response.data.events 
					: Array.isArray(response.data) 
					? response.data 
					: [];
				
				setEvents(eventsData);
			} catch (err) {
				console.error('Error fetching events:', err);
				setError('Failed to load events. Please try again later.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchEvents();
	}, []);

	const eventTypes = [
		'All',
		'Cleanup',
		'Plantation',
		'Donation',
		'Education',
		'Healthcare',
		'Community Building',
		'Environmental',
		'Other',
	];
	// Filter events based on search term, type, and date (upcoming only)
	const filteredEvents = useMemo(() => {
		const now = new Date();
		return events.filter((event) => {
			// Check if event is upcoming (event date is in the future)
			const eventDate = new Date(event.eventDate);
			const isUpcoming = eventDate > now;

			const matchesSearch =
				event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.description.toLowerCase().includes(searchTerm.toLowerCase());

			const matchesType =
				selectedType === '' ||
				selectedType === 'All' ||
				event.type === selectedType;

			return isUpcoming && matchesSearch && matchesType;
		});
	}, [events, searchTerm, selectedType]);

	// Pagination
	const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
	const startIndex = (currentPage - 1) * eventsPerPage;
	const paginatedEvents = filteredEvents.slice(
		startIndex,
		startIndex + eventsPerPage
	);

	const handlePageChange = (page) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

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
					<p className='text-base-content/70'>
						{error}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-base-200 pt-16'>
			{' '}
			{/* Hero Section */}
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='hero bg-primary text-primary-content py-16'
			>
				<div className='hero-content text-center'>
					<div className='max-w-md'>
						<FiCalendar className='text-6xl mb-4 mx-auto' />
						<h1 className='text-5xl font-bold mb-4'>Upcoming Events</h1>
						<p className='text-lg'>
							Discover meaningful social development events in your community.
							Join us in making a positive impact together.
						</p>
					</div>
				</div>
			</motion.div>
			{/* Filters Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className='bg-base-100 shadow-lg py-6'
			>
				<div className='container mx-auto px-4'>
					<div className='flex flex-col lg:flex-row gap-4 items-center justify-between'>
						{/* Search */}
						<div className='relative flex-1 max-w-md'>
							<input
								type='text'
								placeholder='Search events by title, location, or description...'
								className='input input-bordered w-full pl-10'
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									setCurrentPage(1);
								}}
							/>
							<FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
						</div>

						{/* Event Type Filter */}
						<div className='flex items-center gap-2'>
							<FiFilter className='text-base-content/50' />
							<select
								className='select select-bordered'
								value={selectedType}
								onChange={(e) => {
									setSelectedType(e.target.value);
									setCurrentPage(1);
								}}
							>
								{eventTypes.map((type) => (
									<option key={type} value={type === 'All' ? '' : type}>
										{type}
									</option>
								))}
							</select>
						</div>

						{/* Results Count */}
						<div className='text-base-content/70'>
							{filteredEvents.length} event
							{filteredEvents.length !== 1 ? 's' : ''} found
						</div>
					</div>
				</div>
			</motion.div>
			{/* Events Grid */}
			<div className='container mx-auto px-4 py-8'>
				{paginatedEvents.length > 0 ? (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
						>
							{paginatedEvents.map((event, index) => (
								<motion.div
									key={event._id || event.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
								>
									<EventCard event={event} />
								</motion.div>
							))}
						</motion.div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className='flex justify-center mt-12'>
								<div className='join'>
									<button
										className='join-item btn'
										onClick={() => handlePageChange(currentPage - 1)}
										disabled={currentPage === 1}
									>
										Previous
									</button>

									{[...Array(totalPages)].map((_, index) => {
										const page = index + 1;
										if (
											page === 1 ||
											page === totalPages ||
											(page >= currentPage - 1 && page <= currentPage + 1)
										) {
											return (
												<button
													key={page}
													className={`join-item btn ${
														currentPage === page ? 'btn-active' : ''
													}`}
													onClick={() => handlePageChange(page)}
												>
													{page}
												</button>
											);
										} else if (
											page === currentPage - 2 ||
											page === currentPage + 2
										) {
											return (
												<button
													key={page}
													className='join-item btn btn-disabled'
												>
													...
												</button>
											);
										}
										return null;
									})}

									<button
										className='join-item btn'
										onClick={() => handlePageChange(currentPage + 1)}
										disabled={currentPage === totalPages}
									>
										Next
									</button>
								</div>
							</div>
						)}
					</>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className='text-center py-16'
					>
						<div className='max-w-md mx-auto'>
							<FiCalendar className='text-6xl text-base-content/30 mb-4 mx-auto' />
							<h3 className='text-2xl font-bold text-base-content mb-4'>
								No Events Found
							</h3>
							<p className='text-base-content/70 mb-6'>
								{searchTerm || selectedType
									? 'Try adjusting your search criteria or filters.'
									: 'No upcoming events are currently available.'}
							</p>
							{(searchTerm || selectedType) && (
								<button
									className='btn btn-primary'
									onClick={() => {
										setSearchTerm('');
										setSelectedType('');
										setCurrentPage(1);
									}}
								>
									Clear Filters
								</button>
							)}
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
};

export default EventsPage;
