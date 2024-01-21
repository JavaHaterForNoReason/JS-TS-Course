import { Router } from "express";
import create from "../controllers/login";

const router = new Router();

router.post("/", create);

export default router;
