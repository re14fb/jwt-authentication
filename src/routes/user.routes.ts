import { Router } from "express";
import { addUser, loginUser } from "../controllers/user.controllers";

const router =  Router();

router.post("/", addUser);
router.post("/login", loginUser);

export default router;