/**
 * File: Task.ts
 * Purpose: Mongoose schema and model for Task.
 *          Mirrors the Task interface from the CLI version.
 */

import mongoose, { Schema, Document } from "mongoose";

export type Status = "pending" | "completed";
export type Priority = "low" | "medium" | "high";

export interface ITask extends Document {
    name: string;
    status: Status;
    priority: Priority;
    createdAt: Date;
    completedAt: Date | null;
}

const taskSchema = new Schema<ITask>(
    {
        name: {
            type: String,
            required: [true, "Task name is required"],
            trim: true
        },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending"
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        },
        completedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const Task = mongoose.model<ITask>("Task", taskSchema);