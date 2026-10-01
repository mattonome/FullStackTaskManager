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
// CORS Middleware (Manual - No `cors` package)
// ============================================
// This must be the FIRST middleware, immediately after `const app = express()`.
// Bypasses Express 5 wildcard route parsing issues.
app.use((req, res, next) => {
    const origin = req.headers.origin;

    // Allow local development and any Vercel deployment
    if (origin && (origin.includes("localhost") || origin.endsWith(".vercel.app"))) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    // These headers are safe to set for all requests
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Handle the preflight request immediately and stop further processing
    if (req.method === "OPTIONS") {
        return res.status(204).end();
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
        message: "Task Manager API - V2 MANUAL CORS",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });
});

// ============================================
// Start Server
// ============================================
const start = async (): Promise<void> => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

start();