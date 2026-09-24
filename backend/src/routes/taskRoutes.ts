/**
 * File: taskRoutes.ts
 * Purpose: Express routes for task endpoints.
 */

import { Router } from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/taskController";

const router = Router();

router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default router;