import React, { useState } from 'react';
import SectionTitle from './SectionTitle';

const galleryImages = [
	{
		id: 1,
		src: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		alt: 'Conference hall with audience',
	},
	{
		id: 2,
		src: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		alt: 'Networking session',
	},
	{
		id: 3,
		src: 'https://images.pexels.com/photos/2774197/pexels-photo-2774197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		alt: 'Workshop in progress',
	},
	{
		id: 4,
		src: 'https://images.pexels.com/photos/7648505/pexels-photo-7648505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		alt: 'Event registration desk',
	},
	{
		id: 5,
		src: 'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		alt: 'Speaker presentation',
	},
	{
		id: 6,
		src: 'https://images.pexels.com/photos/2774596/pexels-photo-2774596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		alt: 'Conference hall setup',
	},
];

const Gallery = () => {
	const [lightbox, setLightbox] = useState({
		open: false,
		imageIndex: 0,
	});

	const openLightbox = (index) => {
		setLightbox({ open: true, imageIndex: index });
		document.body.style.overflow = 'hidden';
	};

	const closeLightbox = () => {
		setLightbox({ ...lightbox, open: false });
		document.body.style.overflow = 'auto';
	};

	const nextImage = (e) => {
		e.stopPropagation();
		setLightbox({
			...lightbox,
			imageIndex: (lightbox.imageIndex + 1) % galleryImages.length,
		});
	};

	const prevImage = (e) => {
		e.stopPropagation();
		setLightbox({
			...lightbox,
			imageIndex:
				(lightbox.imageIndex - 1 + galleryImages.length) % galleryImages.length,
		});
	};

	return (
		<section className='py-16 mt-10'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<SectionTitle
					title='Event Gallery'
					subtitle='Moments from Previous Events'
					centered
				/>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{galleryImages.map((image, index) => (
						<div
							key={image.id}
							className='overflow-hidden rounded-lg cursor-pointer group'
							onClick={() => openLightbox(index)}
						>
							<img
								src={image.src}
								alt={image.alt}
								className='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110'
							/>
						</div>
					))}
				</div>

				
			</div>

			{/* Lightbox */}
			{lightbox.open && (
				<div
					className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4'
					onClick={closeLightbox}
				>
					<button
						className='absolute top-4 right-4 text-white text-3xl'
						onClick={closeLightbox}
					>
						&times;
					</button>

					<button
						className='absolute left-4 text-white text-3xl'
						onClick={prevImage}
					>
						&#8249;
					</button>

					<img
						src={galleryImages[lightbox.imageIndex].src}
						alt={galleryImages[lightbox.imageIndex].alt}
						className='max-h-[90vh] max-w-[90vw] object-contain'
					/>

					<button
						className='absolute right-4 text-white text-3xl'
						onClick={nextImage}
					>
						&#8250;
					</button>
				</div>
			)}
		</section>
	);
};

export default Gallery;
