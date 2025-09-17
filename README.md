# Cognitive Skills & Student Performance Dashboard

## Overview
This project is a dashboard application to analyze cognitive skills, predict student performance, and identify learning personas. It includes a Next.js frontend with modern UI components and an Express.js backend API for data management.

## Features
- Interactive charts and visualizations of cognitive skills and assessment scores
- Student table with search, sort, and pagination
- Insights section with key findings and recommendations
- Backend API serving student data, analytics, and insights
- Deployment ready for Vercel

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd cognitive-dashboard/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   The backend API will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd cognitive-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

### Environment Variables
- You can set `NEXT_PUBLIC_BACKEND_URL` in the frontend `.env.local` file to point to the backend API URL if different from the default.

## Deployment
- The project is ready to be deployed on Vercel.
- Connect the GitHub repository to Vercel and configure environment variables as needed.

## Repository
- A GitHub repository will be created to host the project code.

## License
MIT License
