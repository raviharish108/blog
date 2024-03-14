import express from "express"
import {addComment,getcomments,updatecomment,deletecomment} from "../controllers/comment.js"
import { verify } from "../middlewares/verify.js";

const router=express.Router();

router.post("/add_comment/:id",verify,addComment);
router.get("/getcomments/:id",verify,getcomments);
router.put("/updatecomment/:id",verify,updatecomment);
router.delete("/deletecomment/:id",verify,deletecomment);

export default router;