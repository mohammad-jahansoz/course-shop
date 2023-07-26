import { Router } from "express";
import { getCourses, setComment, getCourse } from "../controller/course";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/", getCourses);
router.post("/comment", isAuth, setComment);
router.get("/:course_uid", getCourse);

export default router;
