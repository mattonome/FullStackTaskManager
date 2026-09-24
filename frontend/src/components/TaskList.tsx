/**
 * File: TaskList.tsx
 * Purpose: Renders the list of tasks with filtering.
 */

import { useState } from "react";
import type { Task } from "../types/Task";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: string, currentStatus: string) => void;
    onDelete: (id: string) => void;
}

type Filter = "all" | "pending" | "completed";

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
    const [filter, setFilter] = useState<Filter>("all");

    const filteredTasks = tasks.filter((task) => {
        if (filter === "pending") return task.status === "pending";
        if (filter === "completed") return task.status === "completed";
        return true;
    });

    const counts = {
        all: tasks.length,
        pending: tasks.filter((t) => t.status === "pending").length,
        completed: tasks.filter((t) => t.status === "completed").length
    };

    return (
        <div className="task-list-container">
            <div className="filter-bar">
                <button
                    className={`filter-btn ${filter === "all" ? "active" : ""}`}
                    onClick={() => setFilter("all")}
                >
                    All ({counts.all})
                </button>
                <button
                    className={`filter-btn ${filter === "pending" ? "active" : ""}`}
                    onClick={() => setFilter("pending")}
                >
                    Pending ({counts.pending})
                </button>
                <button
                    className={`filter-btn ${filter === "completed" ? "active" : ""}`}
                    onClick={() => setFilter("completed")}
                >
                    Completed ({counts.completed})
                </button>
            </div>

            {filteredTasks.length === 0 ? (
                <div className="empty-state">
                    {filter === "all"
                        ? "No tasks yet. Add one above!"
                        : `No ${filter} tasks.`}
                </div>
            ) : (
                <div className="task-list">
                    {filteredTasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}