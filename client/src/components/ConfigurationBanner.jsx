import React from 'react';
import { auth } from '../firebase/config';

const ConfigurationBanner = () => {
	const isFirebaseConfigured = auth !== null;

	if (isFirebaseConfigured) {
		return null; // Don't show banner if everything is configured
	}

	return (
		<div className='bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4'>
			<div className='flex'>
				<div className='flex-shrink-0'>
					<svg
						className='h-5 w-5 text-yellow-400'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
							clipRule='evenodd'
						/>
					</svg>
				</div>
				<div className='ml-3'>
					<p className='text-sm text-yellow-700'>
						<strong>Demo Mode:</strong> Firebase authentication is not
						configured.
						<span className='block mt-1'>
							To enable full authentication features, please set up Firebase
							credentials in your <code>.env.local</code> file.
						</span>
						<span className='block mt-1 text-xs'>
							Visit{' '}
							<a
								href='https://console.firebase.google.com'
								target='_blank'
								rel='noopener noreferrer'
								className='underline'
							>
								Firebase Console
							</a>{' '}
							to get your configuration.
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ConfigurationBanner;
