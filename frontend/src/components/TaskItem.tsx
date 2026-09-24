/**
 * File: TaskItem.tsx
 * Purpose: Single task item with toggle and delete actions.
 */

import type { Task } from "../types/Task";

interface TaskItemProps {
    task: Task;
    onToggle: (id: string, currentStatus: string) => void;
    onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    const isCompleted = task.status === "completed";

    return (
        <div className={`task-item ${isCompleted ? "completed" : ""}`}>
            <div className="task-content">
                <label className="checkbox-wrapper">
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => onToggle(task._id, task.status)}
                    />
                    <span className="checkmark"></span>
                </label>

                <div className="task-details">
                    <span className="task-name">{task.name}</span>
                    <div className="task-meta">
                        <span className={`priority priority-${task.priority}`}>
                            {task.priority}
                        </span>
                        <span className="task-date">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => onDelete(task._id)}
                className="delete-button"
                title="Delete task"
            >
                ×
            </button>
        </div>
    );
}