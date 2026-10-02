/**
 * File: index.ts
 * Purpose: Express backend that serves both the API and the React frontend.
 *          Single-deployment architecture — no CORS needed.
 */

import express from "express";
import path from "path";
import fs from "fs";
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
// API Routes (register BEFORE static/SPA)
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
console.log(`📂 Serving static files from: ${publicPath}`);
console.log(`   Exists: ${fs.existsSync(publicPath)}`);
console.log(`   index.html exists: ${fs.existsSync(path.join(publicPath, "index.html"))}`);

app.use(express.static(publicPath));

// ============================================
// SPA Fallback (middleware, not a GET route)
// ============================================
// This must be registered LAST so it doesn't intercept API routes.
app.use((req, res) => {
    // If an API route wasn't matched, return JSON 404 — not HTML.
    if (req.path.startsWith("/api")) {
        return res.status(404).json({
            message: "API route not found",
            path: req.originalUrl
        });
    }

    // Otherwise serve the React app
    const indexPath = path.join(publicPath, "index.html");
    if (fs.existsSync(indexPath)) {
        return res.sendFile(indexPath);
    }
    return res.status(404).send("Frontend not built");
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