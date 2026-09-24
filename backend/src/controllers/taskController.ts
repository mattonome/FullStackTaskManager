/**
 * File: taskController.ts
 * Purpose: CRUD operations for tasks.
 */

import { Request, Response } from "express";
import { Task } from "../models/Task";

// GET all tasks
export const getTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
};

// GET single task
export const getTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
};

// CREATE task
export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, priority } = req.body;
        if (!name) {
            res.status(400).json({ message: "Task name is required" });
            return;
        }
        const task = await Task.create({ name, priority });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
};

// UPDATE task (toggle complete or change name/priority)
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const updates = req.body;

        // If status is being set to completed, set completedAt
        if (updates.status === "completed") {
            updates.completedAt = new Date();
        } else if (updates.status === "pending") {
            updates.completedAt = null;
        }

        const task = await Task.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });

        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
};

// DELETE task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
};