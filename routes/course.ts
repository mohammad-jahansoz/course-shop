import { Router } from "express";
import { getCourses, setComment } from "../controller/course";
import isAuth from "../middleware/isAuth";

const router = Router();

router.get("/", getCourses);
router.post("/comment", isAuth, setComment);

export default router;
