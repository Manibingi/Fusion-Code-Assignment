# Calendar Application

A modern, full-stack calendar application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to create, view, and manage events across different calendar views.

## Features

- **Multiple Calendar Views**

  - Monthly View: Traditional calendar grid with event indicators
  - Weekly View: Detailed week view with time slots
  - Daily View: Comprehensive daily schedule with event details

- **Event Management**

  - Create new events with title, date, time, location, and description
  - View events across all calendar views
  - Events are color-coded and include icons for better visualization
  - Real-time event updates

- **Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design
  - Smooth transitions and animations
  - Interactive event cards
  - Beautiful gradients and modern styling

## Tech Stack

### Frontend

- React.js
- React Context API for state management
- Axios for API calls
- date-fns for date manipulation
- React Icons
- Tailwind CSS for styling

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- RESTful API architecture

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm package manager

## Project Structure

```
calendar-app/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/     # React components
│       ├── context/        # Context providers
│       ├── services/       # API services
│       └── App.jsx         # Main application component
│
└── server/                 # Backend Express application
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    └── index.js           # Server entry point
```

## Setup and Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Manibingi/Calendar-app
   cd Calendar-app
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the server directory with the following variables:

   ```env
   PORT=your port
   MONGO_URI=your mongo url
   ```

   Note: Replace the MongoDB URI with your actual MongoDB connection string. If you're using MongoDB Atlas, use your cluster's connection string.

4. **Start the development servers**

   In the server directory:

   ```bash
   nodemon index.js
   ```

   In the client directory:

   ```bash
   npm run dev
   ```
