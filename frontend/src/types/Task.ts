/**
 * File: Task.ts
 * Purpose: TypeScript types for Task, mirroring the backend model.
 */

export type Status = "pending" | "completed";
export type Priority = "low" | "medium" | "high";

export interface Task {
    _id: string;
    name: string;
    status: Status;
    priority: Priority;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}