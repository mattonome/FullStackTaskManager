# Full-Stack Task Manager

## Overview

As a software engineer, I am expanding my skillset by building a complete full-stack web application that connects a modern React frontend to a cloud-hosted MongoDB database through a TypeScript-powered Express API. This project represents my journey into production-grade full-stack development — from local development to live cloud deployment.

The **Full-Stack Task Manager** is a web application that allows users to create, view, complete, and delete tasks through a clean, responsive interface. All data is persisted to a MongoDB Atlas cloud database, and the application is fully deployed as a **single service on Render**, where Express serves both the REST API and the compiled React frontend.

**Purpose:** This software was created to deepen my understanding of full-stack web development by building a production-ready application. Through this project, I gained hands-on experience with:

- Building a RESTful API with Node.js, Express, and TypeScript
- Modeling data with Mongoose and connecting to MongoDB Atlas
- Building a modern React frontend with Vite and TypeScript
- Managing state and handling async operations in React
- Making HTTP requests with Axios
- Deploying a full-stack application to the cloud (single-service architecture)
- Serving a compiled React build from an Express backend
- Managing environment variables and secrets across environments


[Software Demo Video](https://drive.google.com/file/d/1U2ACVnGYeGJOoMZTn4a5FWkmjuotU2Co/view?usp=sharing)

### Live Demo

| Service | URL |
| :--- | :--- |
| **GitHub Repository** | `https://github.com/mattonome/FullStackTaskManager` |
| **Application (Render)** | `https://taskmanager.onrender.com` |

> **Note:** The app runs on Render's free tier, which sleeps after 15 minutes of inactivity. The first request may take 30–60 seconds to wake it up.

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
- **Express** — web framework for the REST API and static file server
- **TypeScript** — type-safe server code
- **Mongoose** — MongoDB object modeling
- **dotenv** — environment variable management

### Database
- **MongoDB Atlas** — cloud-hosted NoSQL database

### Deployment
- **Render** — single-service hosting (Express serves both API and React build)

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
│ │ └── index.ts # Express app — serves API + React build
│ ├── public/ # React build output (populated by build.sh)
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
│ │ │ └── taskService.ts # API calls (relative path)
│ │ ├── types/
│ │ │ └── Task.ts # TypeScript types
│ │ ├── App.tsx
│ │ ├── App.css
│ │ └── main.tsx
│ ├── package.json
│ └── vite.config.ts
├── build.sh # Render build script
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

- [TypeScript Documentation](https://www.typescriptlang.org/docs/) — Official TypeScript handbook

- [React Documentation](https://react.dev/) — Official React documentation

- [Node.js Documentation](https://nodejs.org/docs/latest/api/) — Node.js API reference

- [Express Documentation](https://expressjs.com/) — Express.js guide

- [Mongoose Documentation](https://mongoosejs.com/docs/) — MongoDB object modeling

- [MongoDB Atlas Documentation](https://www.mongodb.com/docs/atlas/) — Cloud database guide

- [Render Documentation](https://render.com/docs) — Full-stack deployment

- [Stack Overflow](https://stackoverflow.com/) — Community Q&A
