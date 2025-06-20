import React from 'react';

import { Link } from 'react-router';
import { AlertTriangle, ArrowBigRightDash } from 'lucide-react';
import useDynamicTitle from '../hooks/useDynamicTitle';

const NotFoundPage = () => {
	useDynamicTitle('404 - Page Not Found');

	return (
		<>
			<div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
				<div className='text-center'>
					<AlertTriangle className='w-20 h-20 text-red-500 mx-auto mb-6' />
					<h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
					<h2 className='text-2xl font-semibold text-gray-700 mb-6'>
						Page Not Found
					</h2>
					<p className='text-gray-600 max-w-md mx-auto mb-8'>
						The page you're looking for doesn't exist or has been moved. Please
						check the URL or navigate back to the homepage.
					</p>
					<Link
						to='/'
						className='px-6 py-3 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors flex items-center justify-center gap-2'
					>
						<span>Go to Homepage</span>
						<ArrowBigRightDash className='w-8 h-8 font-bold' />
					</Link>
				</div>
			</div>
		</>
	);
};

export default NotFoundPage;
