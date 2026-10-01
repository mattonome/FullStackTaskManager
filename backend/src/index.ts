/**
 * File: index.ts
 * Purpose: Main entry point for the Express backend.
 *          Configured for both local development and production deployment.
 */

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// CORS Configuration (Manual Headers)
// ============================================
// Express 5 changed wildcard route parsing (path-to-regexp v8),
// which breaks the `cors` middleware's preflight handling.
// Setting headers manually with `res.setHeader` avoids this entirely.
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://full-stack-task-manager-alpha.vercel.app"
];

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (origin && (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app"))) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    // Handle preflight requests immediately
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

// ============================================
// Body Parsing Middleware
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// Routes
// ============================================
app.use("/api/tasks", taskRoutes);

// ============================================
// Health Check Endpoint
// ============================================
app.get("/", (req, res) => {
    res.json({
        message: "Task Manager API is running",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });
});

// ============================================
// 404 Handler
// ============================================
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.originalUrl
    });
});

// ============================================
// Global Error Handler
// ============================================
app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error("❌ Error:", err.message);
        res.status(500).json({
            message: "Internal server error",
            error: process.env.NODE_ENV === "production" ? undefined : err.message
        });
    }
);

// ============================================
// Start Server
// ============================================
const start = async (): Promise<void> => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
            console.log(`   Allowed origins:`, allowedOrigins);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

start();