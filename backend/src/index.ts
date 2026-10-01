/**
 * File: index.ts
 * Purpose: Main entry point for the Express backend.
 *          Configured for both local development and production deployment.
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// CORS Configuration
// ============================================
// Explicitly allow local dev + Vercel + Render origins.
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://full-stack-task-manager-alpha.vercel.app"
];

const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (Postman, curl, mobile apps)
        if (!origin) {
            return callback(null, true);
        }

        // Check explicit whitelist
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Allow any Vercel preview/production URL
        if (origin.endsWith(".vercel.app")) {
            return callback(null, true);
        }

        // Allow Render subdomains (for internal health checks)
        if (origin.endsWith(".onrender.com")) {
            return callback(null, true);
        }

        // Log and reject unknown origins gracefully
        console.warn(`⚠️  CORS blocked origin: ${origin}`);
        return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204
};

// Apply CORS to ALL routes (including preflight OPTIONS)
app.use(cors(corsOptions));

// Explicitly handle preflight for Express 5 compatibility
app.options(/.*/, cors(corsOptions));

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