import users from "../models/user.js"
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import blogs from "../models/blog.js"


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const sign_up=async(req,res)=>{
  try{
  const{username,email,password,role}=req.body;
   if(!username || !email || !password){
           return res.status(400).json({msg: "Please fill in all fields."})
   }
  if(!validateEmail(email)){
    return res.status(400).json({msg:"invalid emails"})
  }
   
  const user = await users.findOne({email:email});
  if(user) return res.status(400).json({msg: "This email already exists."});

 if(!password.length>6){
  return res.status(400).json({msg:"password must be atleast 6  or and above characters"});
 }
  const password_hash=await bcrypt.hash(password,12);
 const payload = { "username":username,"email":email,"password":password_hash,"role":role};
const newUser=await new users(payload)
 await newUser.save();
  return res.status(500).json({ msg:"Register Success! your Account Has been successfully created"});
}catch(err){
  return res.status(400).json({msg:err.message})
}
}



export const login=async(req,res)=>{
  try{
const {email,password}=req.body;
const user=await users.findOne({email:email})
if(!user){
  return res.status(400).json({msg:"this email is not available"})
}
const ismatch=await bcrypt.compare(password,user.password)
if(!ismatch){
  return res.status(400).json({msg:"password is not correct"})
}
const payload = {id: user._id, name: user.username}
const token = jwt.sign(payload, process.env.usertoken_secret, {expiresIn: "1d"})
return res.json({username:user.username,email:user.email,token:token})
}catch(err){
  return res.status(500).json({msg:err.message})
}
}

export const like=async(req,res)=>{
    const id =req.user.id;
    try {
        await blogs.findByIdAndUpdate(req.params.id, {
            $push: { likes: id },
          });
          await blogs.findByIdAndUpdate(req.params.id, {
            $inc: { likess: 1 },
          });
          res.status(200).json("blog liked successfully.")
    } catch (err) {
        return res.status(500).json({msg:err.message})
    }
  };
  
  export const dislikes=async(req,res)=>{  
        try {
            await blogs.findByIdAndUpdate(req.params.id, {
              $push: { dislikes: req.user.id },
            });
            await blogs.findByIdAndUpdate(req.params.id, {
              $inc: { dislikess: 1 },
            });
            res.status(200).json("dislike successfull.")
          } catch (err) {
        return res.status(500).json({msg:err.message})
    }
  };

  


