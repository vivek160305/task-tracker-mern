# Task Tracker MERN App

A full-stack Task Tracker application built using the MERN stack (MongoDB, Express, React, Node.js).

## Features
- User Authentication (Login / Register)
- Create, Read, Update, Delete Tasks
- Task Status & Priority Management
- Search, Filter, and Sort Tasks
- Analytics Dashboard
- Responsive UI

## Tech Stack
- Frontend: React, Vite, Axios, Tailwind/CSS
- Backend: Node.js, Express.js, MongoDB, JWT
- Database: MongoDB

## Setup Instructions

### Backend
bash
cd backend
npm install
npm run dev

###frontend
cd frontend
npm install
npm run dev

###API ENDPOINTS
POST /api/auth/register
POST /api/auth/login

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
GET    /api/tasks/analytics



