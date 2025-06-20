import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import LoadingSpinner from '../components/LoadingSpinner';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { login, signInWithGoogle } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await login(email, password);
			navigate('/');
		} catch (error) {
			console.error('Login error:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			setLoading(true);
			await signInWithGoogle();
			navigate('/');
		} catch (error) {
			console.error('Google sign-in error:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen hero bg-base-200'>
			<div className='hero-content flex-col lg:flex-row-reverse max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center lg:text-left lg:w-1/2'
				>
					<h1 className='text-5xl font-bold text-primary'>Welcome Back!</h1>
					<p className='py-6 text-lg'>
						Join thousands of volunteers making a difference in their
						communities. Sign in to discover upcoming social development events
						and connect with like-minded people.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:w-1/2'
				>
					<form className='card-body' onSubmit={handleSubmit}>
						<h2 className='text-2xl font-bold text-center mb-4'>Sign In</h2>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<div className='relative'>
								<input
									type='email'
									placeholder='your@email.com'
									className='input input-bordered w-full pl-10'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<FiMail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
							</div>
						</div>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Password</span>
							</label>
							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder='Your password'
									className='input input-bordered w-full pl-10 pr-10'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<FiLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content'
								>
									{showPassword ? <FiEyeOff /> : <FiEye />}
								</button>
							</div>
							<label className='label'>
								<Link
									to='/forgot-password'
									className='label-text-alt link link-hover text-primary'
								>
									Forgot password?
								</Link>
							</label>
						</div>

						<div className='form-control mt-6'>
							<button
								type='submit'
								className='btn btn-primary'
								disabled={loading}
							>
								{loading ? <LoadingSpinner size='sm' /> : 'Sign In'}
							</button>
						</div>

						<div className='divider'>OR</div>

						<div className='form-control'>
							<button
								type='button'
								onClick={handleGoogleSignIn}
								className='btn btn-outline btn-primary'
								disabled={loading}
							>
								<FaGoogle className='mr-2' />
								Sign in with Google
							</button>
						</div>

						<div className='text-center mt-4'>
							<span className='text-base-content/70'>
								Don't have an account?{' '}
							</span>
							<Link to='/register' className='link link-primary'>
								Sign up here
							</Link>{' '}
						</div>
					</form>
				</motion.div>
			</div>
		</div>
	);
};

export default Login;
