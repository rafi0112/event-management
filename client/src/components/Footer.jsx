import React from 'react';
import { Link } from 'react-router';
import {
	Mail,
	Phone,
	MapPin,
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube,
} from 'lucide-react';

const Footer = () => {
	return (
		<footer className='bg-gray-900 text-white pt-12 pb-6'>
			<div className='container  w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
					{/* Brand & Contact */}
					<div>
						<div className='flex items-center gap-2 mb-4'>
							<div className='h-10 w-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold'>
								E
							</div>
							<span className='text-xl font-bold'>E-Management</span>
						</div>
						<div className='space-y-3 text-gray-400 text-sm'>
							<div className='flex items-center'>
								<Phone className='w-4 h-4 mr-2 text-red-500' />
								<span>+880 14333293729</span>
							</div>
							<div className='flex items-center'>
								<Mail className='w-4 h-4 mr-2 text-red-500' />
								<span>info@event.com</span>
							</div>
							<div className='flex items-start'>
								<MapPin className='w-4 h-4 mr-2 mt-1 text-red-500' />
								<span>D Block, Rampura</span>
							</div>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
						<ul className='space-y-2 text-gray-400 text-sm'>
							<li>
								<Link to='/' className='hover:text-white transition'>
									Home
								</Link>
							</li>
							<li>
								<Link to='/events' className='hover:text-white transition'>
									Events
								</Link>
							</li>

							<li>
								<Link to='/about' className='hover:text-white transition'>
									About Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Social Media */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>Follow Us</h3>
						<div className='flex space-x-4 text-gray-400'>
							<Facebook className='hover:text-white cursor-pointer w-5 h-5' />
							<Twitter className='hover:text-white cursor-pointer w-5 h-5' />
							<Instagram className='hover:text-white cursor-pointer w-5 h-5' />
							<Linkedin className='hover:text-white cursor-pointer w-5 h-5' />
							<Youtube className='hover:text-white cursor-pointer w-5 h-5' />
						</div>
					</div>
				</div>

				{/* Bottom Line */}
				<div className='border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500'>
					&copy; {new Date().getFullYear()} E-Management. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
