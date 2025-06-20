import React, { useState } from 'react';
import { NavLink, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { FiSun, FiMoon, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
	const { currentUser, logout } = useAuth();
	const { theme, toggleTheme } = useTheme();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const handleLogout = async () => {
		try {
			await logout();
			setIsDropdownOpen(false);
		} catch (error) {
			console.error('Failed to log out:', error);
		}
	};

	return (
		<header className='bg-base-100 shadow-sm fixed w-full top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<Link to='/' className='flex items-center space-x-2'>
						<div className='h-8 w-8 bg-primary rounded-full flex items-center justify-center'>
							<span className='text-white font-bold text-sm'>SE</span>
						</div>
						<span className='font-bold text-lg text-primary'>
							Social Events
						</span>
					</Link>

					{/* Desktop Menu */}
					<div className='hidden md:flex items-center space-x-6'>
						<NavLink
							to='/'
							className={({ isActive }) =>
								isActive
									? 'text-primary font-medium'
									: 'text-base-content hover:text-primary transition font-medium'
							}
						>
							Home
						</NavLink>
						<NavLink
							to='/events'
							className={({ isActive }) =>
								isActive
									? 'text-primary font-medium'
									: 'text-base-content hover:text-primary transition font-medium'
							}
						>
							Upcoming Events
						</NavLink>
						<NavLink
							to='/about'
							className={({ isActive }) =>
								isActive
									? 'text-primary font-medium'
									: 'text-base-content hover:text-primary transition font-medium'
							}
						>
							About
						</NavLink>

						{/* Theme Toggle */}
						<button
							onClick={toggleTheme}
							className='btn btn-ghost btn-circle'
							aria-label='Toggle theme'
						>
							{theme === 'light' ? <FiMoon /> : <FiSun />}
						</button>

						{/* Auth Section */}
						{currentUser ? (
							<div className='relative'>
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className='flex items-center space-x-2 btn btn-ghost'
								>
									<img
										src={
											currentUser.photoURL ||
											'https://www.gravatar.com/avatar/default?d=mp'
										}
										alt='Profile'
										className='w-8 h-8 rounded-full'
									/>{' '}
									<span className='hidden lg:block'>
										{currentUser.displayName || currentUser.name || 'User'}
									</span>
									<FiChevronDown />
								</button>

								{/* Dropdown Menu */}
								{isDropdownOpen && (
									<div className='absolute right-0 mt-2 w-48 bg-base-100 rounded-md shadow-lg border border-base-300 z-50'>
										<div className='py-1'>
											<Link
												to='/create-event'
												className='block px-4 py-2 text-sm text-base-content hover:bg-base-200'
												onClick={() => setIsDropdownOpen(false)}
											>
												Create Event
											</Link>
											<Link
												to='/manage-events'
												className='block px-4 py-2 text-sm text-base-content hover:bg-base-200'
												onClick={() => setIsDropdownOpen(false)}
											>
												Manage Events
											</Link>
											<Link
												to='/joined-events'
												className='block px-4 py-2 text-sm text-base-content hover:bg-base-200'
												onClick={() => setIsDropdownOpen(false)}
											>
												Joined Events
											</Link>
											<Link
												to='/profile'
												className='block px-4 py-2 text-sm text-base-content hover:bg-base-200'
												onClick={() => setIsDropdownOpen(false)}
											>
												Profile
											</Link>
											<button
												onClick={handleLogout}
												className='block w-full text-left px-4 py-2 text-sm text-base-content hover:bg-base-200'
											>
												Logout
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							<Link to='/login' className='btn btn-primary'>
								Login
							</Link>
						)}
					</div>

					{/* Mobile Menu Button */}
					<div className='md:hidden flex items-center space-x-2'>
						<button
							onClick={toggleTheme}
							className='btn btn-ghost btn-circle btn-sm'
							aria-label='Toggle theme'
						>
							{theme === 'light' ? <FiMoon /> : <FiSun />}
						</button>
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className='btn btn-ghost btn-circle'
						>
							{isMenuOpen ? <FiX /> : <FiMenu />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className='md:hidden bg-base-100 shadow-sm border-t border-base-300'>
					<div className='px-4 pt-2 pb-3 space-y-1'>
						<NavLink
							to='/'
							className={({ isActive }) =>
								isActive
									? 'block px-3 py-2 rounded-md text-base text-primary font-bold'
									: 'block px-3 py-2 rounded-md text-base font-medium text-base-content hover:text-primary hover:bg-base-200'
							}
							onClick={() => setIsMenuOpen(false)}
						>
							Home
						</NavLink>
						<NavLink
							to='/events'
							className={({ isActive }) =>
								isActive
									? 'block px-3 py-2 rounded-md text-base text-primary font-bold'
									: 'block px-3 py-2 rounded-md text-base font-medium text-base-content hover:text-primary hover:bg-base-200'
							}
							onClick={() => setIsMenuOpen(false)}
						>
							Upcoming Events
						</NavLink>
						<NavLink
							to='/about'
							className={({ isActive }) =>
								isActive
									? 'block px-3 py-2 rounded-md text-base text-primary font-bold'
									: 'block px-3 py-2 rounded-md text-base font-medium text-base-content hover:text-primary hover:bg-base-200'
							}
							onClick={() => setIsMenuOpen(false)}
						>
							About
						</NavLink>

						{currentUser ? (
							<div className='border-t border-base-300 pt-2'>
								<div className='flex items-center space-x-3 px-3 py-2'>
									<img
										src={
											currentUser.photoURL ||
											'https://www.gravatar.com/avatar/default?d=mp'
										}
										alt='Profile'
										className='w-8 h-8 rounded-full'
									/>{' '}
									<span className='text-base-content font-medium'>
										{currentUser.displayName || currentUser.name || 'User'}
									</span>
								</div>
								<Link
									to='/create-event'
									className='block px-3 py-2 rounded-md text-base font-medium text-base-content hover:bg-base-200'
									onClick={() => setIsMenuOpen(false)}
								>
									Create Event
								</Link>
								<Link
									to='/manage-events'
									className='block px-3 py-2 rounded-md text-base font-medium text-base-content hover:bg-base-200'
									onClick={() => setIsMenuOpen(false)}
								>
									Manage Events
								</Link>
								<Link
									to='/joined-events'
									className='block px-3 py-2 rounded-md text-base font-medium text-base-content hover:bg-base-200'
									onClick={() => setIsMenuOpen(false)}
								>
									Joined Events
								</Link>
								<button
									onClick={() => {
										handleLogout();
										setIsMenuOpen(false);
									}}
									className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-base-content hover:bg-base-200'
								>
									Logout
								</button>
							</div>
						) : (
							<div className='px-3 py-2'>
								<Link
									to='/login'
									className='btn btn-primary w-full'
									onClick={() => setIsMenuOpen(false)}
								>
									Login
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</header>
	);
};

export default Navbar;
