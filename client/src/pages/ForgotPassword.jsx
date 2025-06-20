import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';

const ForgotPassword = () => {
	// const navigate = useNavigate();
	const [email, setEmail] = useState('');

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const prefilledEmail = params.get('email');
		if (prefilledEmail) {
			setEmail(prefilledEmail);
		}
	}, []);

	const handleResetPassword = () => {
		// Simulate redirecting to Gmail
		window.location.href = 'https://mail.google.com';
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-md w-full space-y-8'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Reset Your Password
					</h2>
				</div>
				<form className='mt-8 space-y-6' onSubmit={(e) => e.preventDefault()}>
					<div className='rounded-md shadow-sm -space-y-px'>
						<div>
							<label htmlFor='email' className='sr-only'>
								Email address
							</label>
							<div className='relative'>
								<input
									id='email'
									name='email'
									type='email'
									required
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm'
									placeholder='Email address'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<div>
						<button
							type='button'
							onClick={handleResetPassword}
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
						>
							Reset Password
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
