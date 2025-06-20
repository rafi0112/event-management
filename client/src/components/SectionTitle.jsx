import React from 'react';
const SectionTitle = ({
	title,
	subtitle,
	centered = false,
}) => {
	return (
		<div className={`mb-12 ${centered ? 'text-center' : ''}`}>
			<h2 className='text-3xl font-bold mb-2 text-gray-800'>{title}</h2>

			{subtitle && <p className='text-gray-600 text-lg'>{subtitle}</p>}

			<div
				className={`h-1 w-20 bg-red-500 mt-4 ${centered ? 'mx-auto' : ''}`}
			></div>
		</div>
	);
};

export default SectionTitle;
