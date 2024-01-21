import { Router } from "express";

import create from "../controllers/upload";
import loginVerify from "../middlewares/loginVerify";

const router = new Router();

router.post("/", loginVerify, create);

export default router;
