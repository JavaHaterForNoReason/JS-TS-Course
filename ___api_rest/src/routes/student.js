import { Router } from "express";
import { index, show, create, update, remove } from "../controllers/student";

import loginVerify from "../middlewares/loginVerify";

const router = new Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", loginVerify, create);
router.put("/:id", loginVerify, update);
router.delete("/:id", loginVerify, remove);

export default router;
