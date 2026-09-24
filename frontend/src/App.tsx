/**
 * File: App.tsx
 * Purpose: Main App component — orchestrates the Task Manager UI.
 */

import { useEffect, useState } from "react";
import type { Task, Priority } from "./types/Task";
import { taskService } from "./services/taskService";
import { AddTaskForm } from "./components/AddTaskForm";
import { TaskList } from "./components/TaskList";
import "./App.css";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load tasks on mount
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await taskService.getAll();
            setTasks(data);
            setError(null);
        } catch (err) {
            setError("Failed to load tasks. Is the backend running?");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (name: string, priority: Priority) => {
        try {
            const newTask = await taskService.create(name, priority);
            setTasks((prev) => [newTask, ...prev]);
        } catch (err) {
            setError("Failed to add task.");
            console.error(err);
        }
    };

    const handleToggle = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === "completed" ? "pending" : "completed";
            const updated = await taskService.update(id, { status: newStatus });
            setTasks((prev) =>
                prev.map((t) => (t._id === id ? updated : t))
            );
        } catch (err) {
            setError("Failed to update task.");
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await taskService.delete(id);
            setTasks((prev) => prev.filter((t) => t._id !== id));
        } catch (err) {
            setError("Failed to delete task.");
            console.error(err);
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <img
                    src="/mattcares_logo.jpg"
                    alt="Task Manager Logo"
                    className="app-logo"
                />
                <h1>Daily Task Manager</h1>
                <p className="subtitle">Track Your Daily Tasks Here</p>
            </header>

            <main className="app-main">
                <AddTaskForm onAdd={handleAdd} />

                {error && <div className="error-banner">{error}</div>}

                {loading ? (
                    <div className="loading">Loading tasks...</div>
                ) : (
                    <TaskList
                        tasks={tasks}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                )}
            </main>

            <footer className="app-footer">
                <p>Built By Matthew Onome Akhabue - All rights Reserved</p>
            </footer>
        </div>
    );
}

export default App;