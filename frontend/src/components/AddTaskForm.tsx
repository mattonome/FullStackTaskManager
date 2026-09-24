/**
 * File: AddTaskForm.tsx
 * Purpose: Form for adding a new task.
 */

import { useState } from "react";
import type { FormEvent } from "react";
import type { Priority } from "../types/Task";

interface AddTaskFormProps {
    onAdd: (name: string, priority: Priority) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
    const [name, setName] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name.trim(), priority);
        setName("");
        setPriority("medium");
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <input
                type="text"
                placeholder="What needs to be done?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="task-input"
                maxLength={100}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="priority-select"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <button type="submit" className="add-button">
                Add Task
            </button>
        </form>
    );
}