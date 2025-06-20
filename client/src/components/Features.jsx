import React from 'react';
import { Calendar, Shield, Users, Music } from 'lucide-react';
import SectionTitle from './SectionTitle';

const features = [
	{
		icon: <Calendar className='w-12 h-12 text-red-500' />,
		title: 'Event Schedule',
		description:
			'Explore our detailed event schedules with precise timings and locations.',
	},
	{
		icon: <Shield className='w-12 h-12 text-red-500' />,
		title: 'Secure Registration',
		description:
			'Register securely with our protected payment system and data encryption.',
	},
	{
		icon: <Users className='w-12 h-12 text-red-500' />,
		title: 'Network with Peers',
		description:
			'Connect with professionals and expand your network at our events.',
	},
	{
		icon: <Music className='w-12 h-12 text-red-500' />,
		title: 'Entertainment Package',
		description:
			'Enjoy high-quality entertainment alongside informative sessions.',
	},
];

const Features = () => {
	return (
		<section className='py-16 bg-gray-100'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{features.map((feature, index) => (
						<div
							key={index}
							className='bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300'
						>
							<div className='flex justify-center mb-4'>{feature.icon}</div>
							<h3 className='text-xl font-semibold mb-3 text-gray-800'>
								{feature.title}
							</h3>
							<p className='text-gray-600'>{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
