import { Router } from "express";
import { signin, signup, test } from "../controller/auth";
const router = Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/auth/test", test);

export default router;
