
import Comment from "../models/comment.js";
import blogs from "../models/blog.js";
import comment from "../models/comment.js";

export const addComment=async(req,res,next)=>{
  const newComment=new Comment({ ...req.body,blogId:req.params.id,userId:req.user.id});
  try {
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {
    return res.status(500).json({msg:err.message})
  }
};
export const getcomments=async(req,res)=>{
    try{
       const comments=await Comment.find({blogId:req.params.id});
       if(!comments){
        return res.status(500).json({msg:"something wrong"})
       }
       return res.status(200).json(comments);
    }catch(err){
        res.status(500).json({msg:err.message})
    }
   }
      
   export const updatecomment=async(req,res)=>{
    try{
        const cmt=await Comment.findOne({_id:req.params.id})
        if(!cmt){
            return res.status(500).json({msg:"comment not found!"})
        }
       
        if(cmt.userId!=req.user.id){
            return res.status(500).json({msg:"you can edit your comment only"})
        }
            await Comment.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true});
            return res.status(200).json({msg:"successfully updated comment"})
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
   }
   export const deletecomment=async(req,res)=>{
    try{
        const{id}=req.params;
        const cmt=await Comment.findOne({_id:id})
        if(!cmt){
            return res.status(500).json({msg:"comment not found!"})
        }
        if(cmt.userId!=req.user.id){
            return res.status(500).json({msg:"you can delete your comment only"})
       } 
         await Comment.findByIdAndDelete(req.params.id);
         return res.status(200).json({msg:"successfully deleted!!"});
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
   
   }

  
 
 