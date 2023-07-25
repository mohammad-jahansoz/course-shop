import { Router } from "express";
import isAdmin from "../middleware/isAdmin";
import { createCourse, getCourses } from "../controller/admin";
const router = Router();

router.post("/course", isAdmin, createCourse);
router.get("/courses", isAdmin, getCourses);

export default router;
