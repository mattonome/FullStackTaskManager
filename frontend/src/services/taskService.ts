/**
 * File: taskService.ts
 * Purpose: API service for communicating with the backend.
 */

import axios from "axios";
import type { Task, Priority, Status } from "../types/Task";

const API_URL = "https://taskmanager.onrender.com/api/tasks";

export const taskService = {
    // Get all tasks
    async getAll(): Promise<Task[]> {
        const response = await axios.get<Task[]>(API_URL);
        return response.data;
    },

    // Create a new task
    async create(name: string, priority: Priority): Promise<Task> {
        const response = await axios.post<Task>(API_URL, { name, priority });
        return response.data;
    },

    // Update a task (toggle complete, change name, etc.)
    async update(
        id: string,
        updates: { status?: Status; name?: string; priority?: Priority }
    ): Promise<Task> {
        const response = await axios.put<Task>(`${API_URL}/${id}`, updates);
        return response.data;
    },

    // Delete a task
    async delete(id: string): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
};