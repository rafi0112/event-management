import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import {
	FiMail,
	FiLock,
	FiUser,
	FiImage,
	FiEye,
	FiEyeOff,
	FiCheck,
	FiX,
} from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		photoURL: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { register, signInWithGoogle } = useAuth();
	const navigate = useNavigate();

	const [requirements, setRequirements] = useState([]);
	useEffect(() => {
		const passwordRequirements = [
			{ regex: /.{6,}/, label: 'At least 6 characters' },
			{ regex: /[A-Z]/, label: 'At least one uppercase letter' },
			{ regex: /[a-z]/, label: 'At least one lowercase letter' },
		];

		const updatedRequirements = passwordRequirements.map((req) => ({
			...req,
			met: req.regex.test(formData.password),
		}));
		setRequirements(updatedRequirements);
	}, [formData.password]);

	const isPasswordValid = requirements.every((req) => req.met);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!isPasswordValid) {
			return;
		}

		try {
			setLoading(true);
			await register(
				formData.email,
				formData.password,
				formData.name,
				formData.photoURL
			);
			navigate('/');
		} catch (error) {
			console.error('Registration error:', error);
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
			<div className='hero-content flex-col lg:flex-row max-w-6xl'>
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center lg:text-left lg:w-1/2'
				>
					<h1 className='text-5xl font-bold text-primary'>Join Us Today!</h1>
					<p className='py-6 text-lg'>
						Be part of a growing community of change-makers. Create an account
						to organize social development events, volunteer for causes you care
						about, and make a lasting impact in your community.
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className='card shrink-0 w-full max-w-md shadow-2xl bg-base-100 lg:w-1/2'
				>
					<form className='card-body' onSubmit={handleSubmit}>
						<h2 className='text-2xl font-bold text-center mb-4'>
							Create Account
						</h2>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Full Name</span>
							</label>
							<div className='relative'>
								<input
									type='text'
									name='name'
									placeholder='Your full name'
									className='input input-bordered w-full pl-10'
									value={formData.name}
									onChange={handleInputChange}
									required
								/>
								<FiUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
							</div>
						</div>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Email</span>
							</label>
							<div className='relative'>
								<input
									type='email'
									name='email'
									placeholder='your@email.com'
									className='input input-bordered w-full pl-10'
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
								<FiMail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
							</div>
						</div>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Photo URL (Optional)</span>
							</label>
							<div className='relative'>
								<input
									type='url'
									name='photoURL'
									placeholder='https://example.com/photo.jpg'
									className='input input-bordered w-full pl-10'
									value={formData.photoURL}
									onChange={handleInputChange}
								/>
								<FiImage className='absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50' />
							</div>
						</div>

						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Password</span>
							</label>
							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									name='password'
									placeholder='Your password'
									className='input input-bordered w-full pl-10 pr-10'
									value={formData.password}
									onChange={handleInputChange}
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
						</div>

						{/* Password Requirements */}
						{formData.password && (
							<div className='bg-base-200 p-4 rounded-lg'>
								<p className='text-sm font-medium mb-2'>
									Password Requirements:
								</p>
								<div className='space-y-2'>
									{requirements.map((req, index) => (
										<div key={index} className='flex items-center text-sm'>
											{req.met ? (
												<FiCheck className='text-success mr-2' />
											) : (
												<FiX className='text-error mr-2' />
											)}
											<span className={req.met ? 'text-success' : 'text-error'}>
												{req.label}
											</span>
										</div>
									))}
								</div>
							</div>
						)}

						<div className='form-control mt-6'>
							<button
								type='submit'
								className='btn btn-primary'
								disabled={
									loading ||
									!isPasswordValid ||
									!formData.name ||
									!formData.email
								}
							>
								{loading ? <LoadingSpinner size='sm' /> : 'Create Account'}
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
								Sign up with Google
							</button>
						</div>

						<div className='text-center mt-4'>
							<span className='text-base-content/70'>
								Already have an account?{' '}
							</span>
							<Link to='/login' className='link link-primary'>
								Sign in here
							</Link>
						</div>
					</form>
				</motion.div>
			</div>
		</div>
	);
};

export default Register;
