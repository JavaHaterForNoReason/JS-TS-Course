import { Router } from "express";
import { index, create, show, update, remove } from "../controllers/user";
import loginVerify from "../middlewares/loginVerify";

const router = new Router();

// router.get("/", index);
// router.get("/:id", show);

router.post("/", loginVerify, create);
router.put("/", loginVerify, update);
router.delete("/", loginVerify, remove);

export default router;
