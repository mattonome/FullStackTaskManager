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
            console.log(`✅ CORS allowed: ${origin}`);
            return callback(null, true);
        }

        // Allow any Vercel preview/production URL
        if (origin.endsWith(".vercel.app")) {
            console.log(`✅ CORS allowed (Vercel): ${origin}`);
            return callback(null, true);
        }

        // Allow Render subdomains (for internal health checks)
        if (origin.endsWith(".onrender.com")) {
            console.log(`✅ CORS allowed (Render): ${origin}`);
            return callback(null, true);
        }

        console.warn(`⚠️  CORS blocked origin: ${origin}`);
        return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204
};

// ============================================
// CORS Middleware (handles preflight automatically)
// ============================================
// The `cors` middleware handles OPTIONS preflight requests automatically
// when applied globally. This is the ONLY CORS setup needed.
app.use(cors(corsOptions));

// ============================================
// Custom Middleware to Explicitly Set CORS Headers
// ============================================
// This bypasses any platform-level header stripping by Render.
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app"))) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    // Handle preflight requests
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