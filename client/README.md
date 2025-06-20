# Social Development Events Platform

A comprehensive web platform for organizing and joining social development events, built with React, Node.js, and MongoDB.

## 🌟 Features

### Core Features

- **User Authentication**: Email/password and Google OAuth integration with Firebase
- **Event Management**: Create, edit, delete, and join social development events
- **Event Discovery**: Search, filter, and browse events by category and location
- **User Dashboard**: Manage created events and view joined events
- **Real-time Updates**: Dynamic event participant tracking
- **Responsive Design**: Mobile-first design with modern UI components

### Technical Features

- **Theme Toggle**: Light/dark mode support
- **Loading States**: Smooth loading spinners and skeleton screens
- **Error Handling**: Comprehensive error handling and user feedback
- **Form Validation**: Client-side and server-side validation
- **Image Upload**: Event thumbnail upload and preview
- **Pagination**: Efficient data loading with pagination
- **Protected Routes**: Role-based access control
- **JWT Authentication**: Secure token-based authentication
- **API Integration**: RESTful API with proper error handling

## 🚀 Tech Stack

### Frontend

- **React 19** - UI library
- **React Router 7** - Client-side routing
- **TailwindCSS 4** - Utility-first CSS framework
- **DaisyUI** - UI component library
- **Tanstack Query** - Data fetching and caching
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **React Datepicker** - Date selection
- **React Icons** - Icon library
- **Firebase** - Authentication and hosting

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting
- **Morgan** - HTTP request logger

### Development Tools

- **Vite** - Build tool and dev server
- **ESLint** - Code linting

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/social-dev-events.git
cd social-dev-events
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
cd ..
```

### 4. Firebase Setup

1. **Create a Firebase Project:**

   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Create a project" or select an existing one
   - Follow the setup wizard

2. **Enable Authentication:**

   - In your Firebase project, go to "Authentication"
   - Click "Get started"
   - Go to "Sign-in method" tab
   - Enable "Email/Password" and "Google" providers

3. **Get Firebase Configuration:**
   - Go to Project Settings (gear icon)
   - Scroll down to "Your apps" section
   - Click the web app icon `</>` or "Add app" if none exists
   - Register your app with a nickname
   - Copy the configuration object

### 5. Environment Setup

#### Frontend (.env.local)

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

#### Backend (server/.env)

```env
# Environment
NODE_ENV=development
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/social-dev-events
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/social-dev-events

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Origin
CLIENT_URL=http://localhost:5173
```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server:**

```bash
cd server
npm run dev
```

2. **Start the frontend development server:**

```bash
npm run dev
```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔧 Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## 🔐 Authentication

The application supports two authentication methods:

1. **Email/Password**: Traditional registration and login
2. **Google OAuth**: One-click Google authentication

Authentication is handled by Firebase on the frontend and JWT tokens on the backend.

## 🎨 UI Components

The application uses a modern, responsive design with:

- **Theme Support**: Light and dark mode toggle
- **Mobile-First**: Responsive design for all screen sizes
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading States**: Skeleton screens and spinners
- **Toast Notifications**: User feedback for actions
- **Form Validation**: Real-time validation with error messages

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Server-side validation for all inputs
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Configuration**: Controlled cross-origin requests
- **Helmet**: Security headers for Express

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Developer**: Social Development Events Platform
- **Project Type**: Full-stack web application
- **Framework**: React + Node.js + MongoDB

---

For questions or support, please open an issue on GitHub.
