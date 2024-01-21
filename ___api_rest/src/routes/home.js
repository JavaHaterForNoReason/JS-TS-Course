import { Router } from "express";
import index from "../controllers/home";

const router = new Router();

router.get("/", index);

export default router;
