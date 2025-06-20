import React from 'react';
import { useNavigate } from 'react-router';
import { FiCalendar, FiMapPin, FiTag, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const EventCard = ({ event }) => {
	const navigate = useNavigate();
	const handleViewDetails = () => {
		// Generate event URL slug from title if no ID is available
		const eventId = event._id || event.id || event.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
		navigate(`/events/${eventId}`);
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const truncateText = (text, maxLength = 100) => {
		if (text.length <= maxLength) return text;
		return text.substr(0, maxLength) + '...';
	};
	return (
		<motion.div
			whileHover={{ y: -5, scale: 1.02 }}
			transition={{ duration: 0.2 }}
			className='card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300'
		>
			<figure className='relative overflow-hidden'>
				<img
					src={
						event.thumbnailUrl || '../assets/react.svg'
					}
					alt={event.title}
					className='w-full h-48 object-cover'
					onError={(e) => {
						e.target.src = '/placeholder-event.jpg';
					}}
				/>
				<div className='absolute top-4 right-4'>
					<div className='badge badge-primary font-medium'>{event.type}</div>
				</div>
			</figure>

			<div className='card-body p-6'>
				<h2 className='card-title text-lg font-bold line-clamp-2 mb-2'>
					{event.title}
				</h2>

				<p className='text-base-content/70 text-sm mb-4 line-clamp-3'>
					{truncateText(event.description)}
				</p>

				<div className='space-y-2'>
					<div className='flex items-center text-sm text-base-content/70'>
						<FiCalendar className='w-4 h-4 mr-2 text-primary' />
						<span>{formatDate(event.eventDate || event.date)}</span>
					</div>

					<div className='flex items-center text-sm text-base-content/70'>
						<FiMapPin className='w-4 h-4 mr-2 text-primary' />
						<span className='line-clamp-1'>{event.location}</span>
					</div>

					<div className='flex items-center text-sm text-base-content/70'>
						<FiTag className='w-4 h-4 mr-2 text-primary' />
						<span>{event.type}</span>
					</div>					{event.members && (
						<div className='flex items-center text-sm text-base-content/70'>
							<FiUsers className='w-4 h-4 mr-2 text-primary' />
							<span>
								{event.members.length} member
								{event.members.length !== 1 ? 's' : ''} joined
							</span>
						</div>
					)}
				</div>

				<div className='card-actions justify-end mt-4'>
					<button
						className='btn btn-primary btn-sm'
						onClick={handleViewDetails}
					>
						View Details
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default EventCard;
