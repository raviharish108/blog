import express from "express";
import * as dotenv from "dotenv";
import {connect} from "./connect.js"
import userroutes from "./routes/user.js"
import blogroutes from "./routes/blog.js"
import commentroutes from "./routes/comment.js"
const PORT= 5000;
const app=express();
app.use(express.json());
dotenv.config();
// app.use(cors())
app.get("/",(req,res)=>{
    res.send("hello world")
})
app.use("/api/user",userroutes);
app.use("/api/blog",blogroutes);
app.use("/api/comment",commentroutes);
app.listen(PORT, async() => {
    await connect();
    await console.log('Server is running on port', PORT)
})