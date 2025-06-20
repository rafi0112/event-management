import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import AboutPage from '../pages/About';
import EventDetails from '../pages/EventDetails';
import NotFoundPage from '../pages/NotFoundPage';
import EventsPage from '../pages/EventsPage';
import Gallery from '../components/Gallery';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from '../pages/ForgotPassword';
import CreateEvent from '../pages/CreateEvent';
import EditEvent from '../pages/EditEvent';
import ManageEvents from '../pages/ManageEvents';
import JoinedEvents from '../pages/JoinedEvents';

export const routes = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <NotFoundPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/events',
				element: <EventsPage />,
			},
			{
				path: '/events/:id',
				element: <ProtectedRoute element={<EventDetails />} />,
			},
			{
				path: '/about',
				element: <AboutPage />,
			},
			{
				path: 'gallery',
				element: <Gallery />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/profile',
				element: <ProtectedRoute element={<Profile />} />,
			},
			{
				path: 'forgot-password',
				element: <ForgotPassword />,
			},
			{
				path: 'create-event',
				element: <ProtectedRoute element={<CreateEvent />} />,
			},
			{
				path: 'edit-event/:id',
				element: <ProtectedRoute element={<EditEvent />} />,
			},
			{
				path: 'manage-events',
				element: <ProtectedRoute element={<ManageEvents />} />,
				// element: <ManageEvents />,
			},
			{
				path: 'joined-events',
				element: <ProtectedRoute element={<JoinedEvents />} />,
			},
		],
	},
]);
