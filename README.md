# Full-Stack Task Manager

## Overview

As a software engineer, I am expanding my skillset by building a complete full-stack web application that connects a modern React frontend to a cloud-hosted MongoDB database through a TypeScript-powered Express API. This project represents my journey into production-grade full-stack development — from local development to live cloud deployment.

The **Full-Stack Task Manager** is a web application that allows users to create, view, complete, and delete tasks through a clean, responsive interface. All data is persisted to a MongoDB Atlas cloud database, and the application is fully deployed with the frontend on Vercel and the backend API on Render.

**Purpose:** This software was created to deepen my understanding of full-stack web development by building a production-ready application. Through this project, I gained hands-on experience with:

- Building a RESTful API with Node.js, Express, and TypeScript
- Modeling data with Mongoose and connecting to MongoDB Atlas
- Building a modern React frontend with Vite and TypeScript
- Managing state and handling async operations in React
- Making HTTP requests with Axios and handling CORS
- Deploying a full-stack application to cloud platforms (Render + Vercel)
- Managing environment variables and secrets across environments

[Software Demo Video](http://youtube.link.goes.here)

### Live Demo

| Service | URL |
| :--- | :--- |
| **GitHub Repository** | `https://github.com/mattonome/FullStackTaskManager` |
| **Frontend (Vercel)** | `https://full-stack-task-manager-alpha.vercel.app/` |
| **Backend API (Render)** | `https://taskmanager.onrender.com` |
| **API Health Check** | `https://taskmanager.onrender.com/api/tasks` |

> **Note:** The backend runs on Render's free tier and sleeps after 15 minutes of inactivity. The first request may take 30–60 seconds to wake it up.

## Features

- ✅ **Create tasks** with customizable priority (low / medium / high)
- ✅ **View all tasks** in a clean, card-based layout
- ✅ **Mark tasks complete** with a single click
- ✅ **Delete tasks** instantly
- ✅ **Filter tasks** by status (All / Pending / Completed)
- ✅ **Persistent storage** — tasks are saved to MongoDB Atlas
- ✅ **Responsive design** — works on desktop and mobile
- ✅ **Real-time counts** — see how many tasks are pending vs. completed

## Tech Stack

### Frontend
- **React 19** with **TypeScript**
- **Vite** — fast build tool and dev server
- **Axios** — HTTP client for API requests
- **CSS3** — custom styling with gradients and animations

### Backend
- **Node.js** — JavaScript runtime
- **Express** — web framework for the REST API
- **TypeScript** — type-safe server code
- **Mongoose** — MongoDB object modeling
- **dotenv** — environment variable management
- **CORS** — cross-origin resource sharing

### Database
- **MongoDB Atlas** — cloud-hosted NoSQL database

### Deployment
- **Vercel** — frontend hosting
- **Render** — backend hosting

## Development Environment

**Tools Used:**
- **Visual Studio Code** — primary code editor
- **Node.js (v22.19.0)** — runtime environment
- **npm** — package manager
- **tsx** — fast TypeScript execution
- **Git** — version control
- **GitHub** — remote repository hosting
- **MongoDB Compass** — GUI for browsing the database
- **Thunder Client** — VS Code extension for testing APIs

**Programming Languages:**
- **TypeScript 5.9.3** — used on both frontend and backend
- **CSS3** — styling the frontend

## Project Structure
FullStackTaskManager/
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── db.ts # MongoDB connection
│ │ ├── controllers/
│ │ │ └── taskController.ts # CRUD operations
│ │ ├── models/
│ │ │ └── Task.ts # Mongoose schema
│ │ ├── routes/
│ │ │ └── taskRoutes.ts # Express routes
│ │ └── index.ts # Express app entry point
│ ├── .env.example
│ ├── package.json
│ └── tsconfig.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── AddTaskForm.tsx
│ │ │ ├── TaskItem.tsx
│ │ │ └── TaskList.tsx
│ │ ├── services/
│ │ │ └── taskService.ts # API calls
│ │ ├── types/
│ │ │ └── Task.ts # TypeScript types
│ │ ├── App.tsx
│ │ ├── App.css
│ │ └── main.tsx
│ ├── package.json
│ └── vite.config.ts
├── .gitignore
└── README.md

Useful Websites
`https://www.typescriptlang.org/docs/` TypeScript Documentation – Official TypeScript handbook

`https://react.dev/` React Documentation – Official React documentation

`https://nodejs.org/docs/latest/api/` Node.js Documentation – Node.js API reference

`https://expressjs.com/` Express Documentation – Express.js guide

`https://mongoosejs.com/docs/` Mongoose Documentation – MongoDB object modeling

`https://render.com/docs` Render Documentation – Backend deployment

`https://vercel.com/docs` Vercel Documentation – Frontend deployment
