import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SectionTitle from '../components/SectionTitle';
import { Users, Award, Calendar, Target } from 'lucide-react';
import useDynamicTitle from '../hooks/useDynamicTitle';

const AboutPage = () => {
	useDynamicTitle('About - E-Management');

	return (
		<>
			<div className='relative  py-16 md:py-24'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='max-w-3xl'>
						<h1 className='text-4xl md:text-5xl font-bold mb-6'>
							About E-Management
						</h1>
						<p className='text-xl  mb-8'>
							Creating exceptional event experiences since 2010. We specialize
							in organizing conferences and events that inspire, connect, and
							educate.
						</p>
					</div>
				</div>

				{/* Our Story */}
				<section className='py-16'>
					<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
							<div>
								<SectionTitle title='Our Story' subtitle='How We Started' />

								<p className='text-gray-600 mb-6'>
									E-Management was founded in 2010 with a vision to transform
									how events are planned and executed. What began as a small
									team of passionate event enthusiasts has grown into a leading
									event management company trusted by businesses and
									organizations worldwide.
								</p>

								<p className='text-gray-600 mb-6'>
									Our journey has been marked by a commitment to innovation,
									excellence, and creating meaningful connections. We believe
									that exceptional events have the power to inspire change,
									drive business growth, and build communities.
								</p>

								<p className='text-gray-600'>
									Today, we're proud to have organized over 500 successful
									events across 20 countries, bringing together more than
									100,000 attendees from diverse backgrounds and industries.
								</p>
							</div>

							<div className='relative'>
								<img
									src='https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
									alt='Our team collaborating'
									className='rounded-lg shadow-xl'
								/>

								<div className='absolute -bottom-6 -left-6 bg-red-500 text-white p-4 rounded-lg'>
									<p className='text-2xl font-bold'>15+</p>
									<p className='text-sm'>Years Experience</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Core Values */}
				<section className='py-16 bg-white'>
					<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
						<SectionTitle
							title='Our Core Values'
							subtitle='What Drives Us'
							centered
						/>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12'>
							<div className='bg-gray-50 p-6 rounded-lg'>
								<Users className='w-12 h-12 text-red-500 mb-4' />
								<h3 className='text-xl font-semibold mb-3'>Collaboration</h3>
								<p className='text-gray-600'>
									We work closely with our clients and partners to create events
									that exceed expectations.
								</p>
							</div>

							<div className='bg-gray-50 p-6 rounded-lg'>
								<Award className='w-12 h-12 text-red-500 mb-4' />
								<h3 className='text-xl font-semibold mb-3'>Excellence</h3>
								<p className='text-gray-600'>
									We strive for perfection in every detail, ensuring flawless
									execution of each event.
								</p>
							</div>

							<div className='bg-gray-50 p-6 rounded-lg'>
								<Calendar className='w-12 h-12 text-red-500 mb-4' />
								<h3 className='text-xl font-semibold mb-3'>Innovation</h3>
								<p className='text-gray-600'>
									We continuously explore new ideas and technologies to enhance
									the event experience.
								</p>
							</div>

							<div className='bg-gray-50 p-6 rounded-lg'>
								<Target className='w-12 h-12 text-red-500 mb-4' />
								<h3 className='text-xl font-semibold mb-3'>Impact</h3>
								<p className='text-gray-600'>
									We create events that leave a lasting impression and deliver
									meaningful results.
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default AboutPage;
