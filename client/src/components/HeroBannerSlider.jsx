import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CountdownTimer from './CountdownTimer';

const HeroBannerSlider = () => {
	// Default placeholder slides
	const slides = [
		{
			id: 1,
			title: 'Join Community Development Events',
			subtitle: 'Connect, Learn, and Make a Difference',
			image:
				'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1920&q=80',
			date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
		},
		{
			id: 2,
			title: 'Build Better Communities Together',
			subtitle: 'Participate in Social Impact Events',
			image:
				'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80',
			date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
		},
		{
			id: 3,
			title: 'Create Lasting Social Change',
			subtitle: 'Organize and Join Development Events',
			image:
				'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1920&q=80',
			date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
		},
	];

	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay]}
			spaceBetween={0}
			slidesPerView={1}
			navigation
			pagination={{ clickable: true }}
			autoplay={{ delay: 5000 }}
			loop
		>
			{slides.map((slide, index) => {
				const eventDate = new Date(slide.date);

				return (
					<SwiperSlide key={index}>
						<div
							className='relative h-screen min-h-[600px] flex items-center justify-center bg-cover bg-center'
							style={{
								backgroundImage: `linear-gradient(
                  rgba(0, 0, 0, 0.6), 
                  rgba(0, 0, 0, 0.6)
                ), url('${slide.backgroundImage}')`,
							}}
						>
							<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center'>
								<div className='mb-4'>
									<img
										src='https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
										alt='Speaker'
										className='w-24 h-24 rounded-full mx-auto object-cover border-4 border-white'
									/>
								</div>

								<p className='text-white mb-2'>
									{eventDate.toLocaleDateString('en-US', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
									})}{' '}
									·{' '}
									{eventDate.toLocaleTimeString('en-US', {
										hour: '2-digit',
										minute: '2-digit',
									})}
								</p>

								<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight'>
									{slide.title}
								</h1>

								<p className='text-xl text-white mb-10'>{slide.location}</p>
								<CountdownTimer targetDate={eventDate} />
								<div className='mt-8'>
									<button className='px-8 py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition-colors'>
										Register Now
									</button>
								</div>
							</div>
						</div>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default HeroBannerSlider;
