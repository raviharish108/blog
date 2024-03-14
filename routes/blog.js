import express from "express"
import {create_blog,getblogs,getoneblog,updateblog,deleteblog,getByTag,search} from "../controllers/blog.js"
import { verify } from "../middlewares/verify.js";
const router=express.Router();

router.post("/create",verify,create_blog);
router.get("/getblogs",verify,getblogs);
router.get("/getoneblog/:id",verify,getoneblog);
router.put("/updateblog/:id",verify,updateblog);
router.delete("/deleteblog/:id",verify,deleteblog);
router.get("/getbytag",verify,getByTag);
router.get("/searchblog",verify,search);
export default router;