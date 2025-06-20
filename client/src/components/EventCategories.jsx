import React from 'react';

const EventCategories = ({ categories, activeCategory, onCategoryChange }) => {
	return (
		<div className='flex flex-wrap justify-center gap-2 md:gap-6 mb-8'>
			{categories.map((category) => (
				<button
					key={category}
					onClick={() => onCategoryChange(category)}
					className={`px-4 py-2 rounded-md transition-all duration-200 ${
						activeCategory === category
							? 'bg-red-500 text-white'
							: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
					}`}
				>
					{category}
				</button>
			))}
		</div>
	);
};

export default EventCategories;
