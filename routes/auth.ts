import { Router } from "express";
import { signin, signup } from "../controller/auth";
import isAuth from "../middleware/isAuth";
import isAdmin from "../middleware/isAdmin";
const router = Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/auth/test", isAdmin);

export default router;
