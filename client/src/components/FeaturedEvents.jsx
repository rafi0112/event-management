import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventCategories from './EventCategories';
import SectionTitle from './SectionTitle';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

const FeaturedEvents = () => {
	const [activeCategory, setActiveCategory] = useState('all');
	const [showAll, setShowAll] = useState(false);
	const [events, setEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

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
				
				// Filter to get top 3 events with most members
				const sortedByMembers = eventsData
					.filter(event => event.members && event.members.length > 0)
					.sort((a, b) => b.members.length - a.members.length)
					.slice(0, 3);
				
				// If we don't have 3 events with members, fill with other events
				if (sortedByMembers.length < 3) {
					const remainingEvents = eventsData
						.filter(event => !sortedByMembers.includes(event))
						.slice(0, 3 - sortedByMembers.length);
					sortedByMembers.push(...remainingEvents);
				}
				
				setEvents(sortedByMembers);
			} catch (err) {
				console.error('Error fetching events:', err);
				setError('Failed to load events. Please try again later.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchEvents();
	}, []);
	// Ensure events is always an array
	const displayEvents = Array.isArray(events) ? events : [];

	// Fallback data when backend is not available (only used if no events loaded)
	
	// Use fallback events only if no events were loaded and there's an error
	const finalDisplayEvents = displayEvents;

	if (isLoading) {
		return (
			<section className='py-16 bg-gray-50'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<SectionTitle
						title='Top Featured Events'
						subtitle='Events with Most Members'
						centered
					/>
					<div className='flex justify-center'>
						<LoadingSpinner />
					</div>
				</div>
			</section>
		);
	}
	
	// Show fallback events if there's an error instead of blocking the UI
	if (error && finalDisplayEvents.length === 0) {
		console.warn('Failed to load events from API, using fallback data');
	}
	
	const categories = [...new Set(finalDisplayEvents.map((event) => event.type))];
	categories.unshift('all');

	// Updated smooth scrolling to scroll from bottom to top when the "View More" button is clicked
	const handleScroll = () => {
		const section = document.querySelector('section');
		if (section) {
			if (showAll) {
				// Scroll to the top of the section when "Show Less Events" is clicked
				window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
			} else {
				window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
			}
		}
	};	const filteredEvents =
		activeCategory === 'all'
			? finalDisplayEvents
			: finalDisplayEvents.filter((event) => event.type === activeCategory);

	const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 3);

	return (		<section className='py-16 bg-gray-50'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<SectionTitle
					title='Top Featured Events'
					subtitle='Top 3 Events with Most Members'
					centered
				/>
				<EventCategories
					categories={categories}
					activeCategory={activeCategory}
					onCategoryChange={setActiveCategory}
				/>				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{displayedEvents.map((event) => (
						<EventCard
							key={event._id || event.id}
							event={event}
						/>
					))}
				</div>

				{finalDisplayEvents.length === 0 && !isLoading && (
					<div className='text-center py-8'>
						<p className='text-gray-500'>No events available at the moment.</p>
					</div>
				)}

				<div className='text-center mt-12'>
					{filteredEvents.length > 3 && (
						<button
							className='px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors'
							onClick={() => {
								setShowAll(!showAll);
								handleScroll();
							}}
						>
							{showAll ? 'Show Top 3 Events' : 'View All Events'}
						</button>
					)}
				</div>
			</div>
		</section>
	);
};

export default FeaturedEvents;
