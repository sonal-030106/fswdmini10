# Medicine Tracker Application

A full-stack web application for tracking medicines with user authentication and CRUD operations.

## Features

- User authentication (register/login)
- Add, view, update, and delete medicines
- Track medicine dosage times (morning/evening/both)
- Mark medicines as taken
- Responsive UI with React and Bootstrap

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

4. Create a .env file in the root directory with the following variables:
   ```
   MONGODB_URI=mongodb://localhost:27017/medicine-tracker
   JWT_SECRET=your-secret-key
   PORT=5000
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

6. Start the frontend development server:
   ```bash
   cd client
   npm start
   ```

## Usage

1. Register a new account or login with existing credentials
2. Add medicines with name, dosage time, and timing
3. View your medicine list
4. Mark medicines as taken when you take them
5. Delete medicines when they're no longer needed

## API Endpoints

- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/medicine - Get all medicines for a user
- POST /api/medicine - Add a new medicine
- PUT /api/medicine/:id/taken - Mark medicine as taken
- DELETE /api/medicine/:id - Delete a medicine 
