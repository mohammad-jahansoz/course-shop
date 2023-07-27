import { Router } from "express";
import isAdmin from "../middleware/isAdmin";
import {
  createCourse,
  getCourses,
  deleteCourse,
  editCourse,
  updateComment,
  createSeason,
} from "../controller/admin";
const router = Router();

router.post("/course", isAdmin, createCourse);
router.get("/courses", isAdmin, getCourses);
router.delete("/courses/:course_uid", isAdmin, deleteCourse);
router.put("/courses/:course_uid", isAdmin, editCourse);
router.put("/comment/:comment_uid", isAdmin, updateComment);
router.post("/season", isAdmin, createSeason);

export default router;
