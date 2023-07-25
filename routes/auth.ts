import { Router } from "express";
import { signin, signup } from "../controller/auth";
import isAuth from "../middleware/isAuth";

const router = Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);

export default router;
