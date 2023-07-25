import { Router } from "express";
import { signin, signup, test } from "../controller/auth";
import isAuth from "../middleware/isAuth";
const router = Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/auth/test", isAuth, test);

export default router;
