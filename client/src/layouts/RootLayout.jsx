import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ConfigurationBanner from '../components/ConfigurationBanner';
import { Outlet } from 'react-router';

const RootLayout = () => {
	return (
		<>
			<Navbar />
			<ConfigurationBanner />
			<div className='w-11/12 mx-auto '>
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default RootLayout;
