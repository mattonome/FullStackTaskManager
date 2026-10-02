/**
 * File: index.ts
 * Purpose: Express backend that serves both the API and the React frontend.
 *          Single-deployment architecture — no CORS needed.
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// Body Parsing Middleware
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// API Routes
// ============================================
app.use("/api/tasks", taskRoutes);

// API health check
app.get("/api", (req, res) => {
    res.json({
        message: "Task Manager API is running",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString()
    });
});

// ============================================
// Serve React Frontend Static Files
// ============================================
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// SPA fallback — send index.html for any non-API route
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
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
            console.log(`   Serving frontend from: ${publicPath}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

start();