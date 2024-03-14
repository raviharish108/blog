import express from "express"
import {sign_up,login,like,dislikes} from "../controllers/user.js"
import { verify } from "../middlewares/verify.js";

const router=express.Router();

router.post("/signup", sign_up);
router.post("/login",login);
router.get("/likes/:id",verify,like);
router.get("/dislikes/:id",verify,dislikes);


export default router;