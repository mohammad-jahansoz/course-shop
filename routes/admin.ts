import { Router } from "express";
import isAdmin from "../middleware/isAdmin";
import { createCourse, getCourses, deleteCourse } from "../controller/admin";
const router = Router();

router.post("/course", isAdmin, createCourse);
router.get("/courses", isAdmin, getCourses);
router.delete("/courses/:course_uid", isAdmin, deleteCourse);

export default router;
