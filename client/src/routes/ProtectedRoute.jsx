import React from 'react';
import { Navigate } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ element }) => {
	const { currentUser, loading } = useAuth();
	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<LoadingSpinner size='lg' />
			</div>
		);
	}

	if (!currentUser) {
		return <Navigate to='/login' replace />;
	}

	return element;
};

export default ProtectedRoute;
