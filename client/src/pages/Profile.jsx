import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { toast } from 'react-hot-toast';
import {
	FaUser,
	FaEnvelope,
	FaCalendar,
	FaEdit,
	FaSave,
	FaTimes,
} from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import useDynamicTitle from '../hooks/useDynamicTitle';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
	const { currentUser: user, logout } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [loading, setLoading] = useState(false);

	useDynamicTitle('Profile');
	const [profileData, setProfileData] = useState({
		name: user?.displayName || user?.name || '',
		email: user?.email || '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProfileData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleUpdateProfile = async (e) => {
		e.preventDefault();

		if (!profileData.name.trim()) {
			toast.error('Name is required');
			return;
		}

		try {
			setLoading(true);
			// TODO: Implement profile update API call when backend is ready
			toast.success('Profile updated successfully!');
			setIsEditing(false);
		} catch (error) {
			toast.error('Failed to update profile');
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	const handleCancel = () => {
		setProfileData({
			name: user?.displayName || user?.name || '',
			email: user?.email || '',
		});
		setIsEditing(false);
	};

	const handleLogout = async () => {
		try {
			await logout();
			toast.success('Logged out successfully');
		} catch {
			toast.error('Failed to logout');
		}
	};

	if (!user) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='min-h-screen bg-base-100 py-8'
		>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl'>
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className='mb-8'
				>
					<h1 className='text-3xl lg:text-4xl font-bold text-base-content'>
						My Profile
					</h1>
					<p className='text-base-content/70 mt-2'>
						Manage your account information
					</p>
				</motion.div>

				<div className='grid lg:grid-cols-3 gap-8'>
					{/* Profile Card */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.2 }}
						className='lg:col-span-1'
					>
						<div className='card bg-base-200 shadow-lg'>
							<div className='card-body text-center'>
								{' '}
								<div className='avatar placeholder mb-4'>
									<div className='bg-primary text-primary-content rounded-full w-24 h-24'>
										<span className='text-3xl font-bold'>
											{(user?.displayName || user?.name)
												?.charAt(0)
												?.toUpperCase() || 'U'}
										</span>
									</div>
								</div>
								<h2 className='card-title justify-center text-xl'>
									{user?.displayName || user?.name}
								</h2>
								<p className='text-base-content/70'>{user.email}</p>
								<div className='divider'></div>
								<div className='stats stats-vertical shadow'>
									<div className='stat'>
										<div className='stat-title'>Member Since</div>
										<div className='stat-value text-sm'>
											{new Date(
												user.createdAt || Date.now()
											).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
											})}
										</div>
									</div>
								</div>
								<button
									onClick={handleLogout}
									className='btn btn-outline btn-error mt-4'
								>
									Logout
								</button>
							</div>
						</div>
					</motion.div>

					{/* Profile Form */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
						className='lg:col-span-2'
					>
						<div className='card bg-base-200 shadow-lg'>
							<div className='card-body'>
								<div className='flex justify-between items-center mb-6'>
									<h3 className='text-xl font-bold text-base-content'>
										Profile Information
									</h3>
									{!isEditing && (
										<button
											onClick={() => setIsEditing(true)}
											className='btn btn-outline btn-sm gap-2'
										>
											<FaEdit /> Edit
										</button>
									)}
								</div>

								<form onSubmit={handleUpdateProfile}>
									<div className='space-y-4'>
										{/* Name Field */}
										<div className='form-control'>
											<label className='label'>
												<span className='label-text font-medium'>
													<FaUser className='inline mr-2' />
													Full Name
												</span>
											</label>
											{isEditing ? (
												<input
													type='text'
													name='name'
													value={profileData.name}
													onChange={handleInputChange}
													className='input input-bordered w-full'
													placeholder='Enter your full name'
													required
												/>
											) : (
												<div className='input input-bordered bg-base-100 flex items-center'>
													{user?.displayName || user?.name || 'Not provided'}
												</div>
											)}
										</div>

										{/* Email Field */}
										<div className='form-control'>
											<label className='label'>
												<span className='label-text font-medium'>
													<FaEnvelope className='inline mr-2' />
													Email Address
												</span>
											</label>
											<div className='input input-bordered bg-base-100 flex items-center'>
												{user.email}
											</div>
											<label className='label'>
												<span className='label-text-alt text-base-content/60'>
													Email cannot be changed
												</span>
											</label>
										</div>

										{/* Joined Date */}
										<div className='form-control'>
											<label className='label'>
												<span className='label-text font-medium'>
													<FaCalendar className='inline mr-2' />
													Member Since
												</span>
											</label>
											<div className='input input-bordered bg-base-100 flex items-center'>
												{new Date(
													user.createdAt || Date.now()
												).toLocaleDateString('en-US', {
													weekday: 'long',
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												})}
											</div>
										</div>
									</div>

									{/* Action Buttons */}
									{isEditing && (
										<div className='card-actions justify-end mt-6 pt-4 border-t border-base-300'>
											<button
												type='button'
												onClick={handleCancel}
												className='btn btn-ghost gap-2'
											>
												<FaTimes /> Cancel
											</button>
											<button
												type='submit'
												disabled={loading}
												className='btn btn-primary gap-2'
											>
												{loading ? (
													<>
														<span className='loading loading-spinner loading-sm'></span>
														Saving...
													</>
												) : (
													<>
														<FaSave /> Save Changes
													</>
												)}
											</button>
										</div>
									)}
								</form>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default Profile;
