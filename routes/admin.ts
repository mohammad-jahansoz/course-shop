import { Router } from "express";
import isAdmin from "../middleware/isAdmin";
import { createCourse } from "../controller/admin";
const router = Router();

router.post("/course", isAdmin, createCourse);

export default router;
