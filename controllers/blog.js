import blogs from "../models/blog.js";

export const create_blog=async(req,res)=>{
    try{
        const {title,blog}=req.body;
        const payload={
                  "title":title,
                  "blog":blog,
                  "userId":req.user.id,
            }
         const new_blog=await new blogs(payload);
         await new_blog.save();
         return res.json({msg:"successfully created new blog"}) 
        }catch(err){
        return res.status(500).json({msg:err.message})
       }
       }
       export const getblogs=async(req,res)=>{
        try{
           const myblogs=await blogs.find({userId:req.user.id});
           if(!myblogs){
            return res.status(500).json({msg:"something wrong"})
           }
           return res.status(200).json(myblogs);
        }catch(err){
            res.status(500).json({msg:err.message})
        }
       }
       
       export const getoneblog=async(req,res)=>{
        try{
        const {id}= req.params;
        const blog=await blogs.findOne({_id:id});
        if(!blog){
            return res.status(400).json({msg:"blog not found!"})
        }
        if(blog.userId!=req.user.id){
            return res.status(400).json({msg:"you can access your blog only!!"});
        }
        return res.status(200).json(blog)
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
}
       
       export const updateblog=async(req,res)=>{
        try{
            const{id}=req.params;
            const blog=await blogs.findOne({_id:id})
            if(!blog){
                return res.status(500).json({msg:"blog not found!"})
            }
           
            if(blog.userId!=req.user.id){
                return res.status(500).json({msg:"you can edit your blog only"})
            }
                await blogs.findByIdAndUpdate({_id:id},{$set: req.body},{new:true});
                return res.status(200).json({msg:"successfully updated"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
       }
       export const deleteblog=async(req,res)=>{
        try{
            const{id}=req.params;
            const blog=await blogs.findOne({_id:id})
            if(!blog){
                return res.status(500).json({msg:"blog not found!"})
            }
            if(blog.userId!=req.user.id){
                return res.status(500).json({msg:"you can delete your blog only"})
           } 
             await blogs.findByIdAndDelete(req.params.id);
             return res.status(200).json({msg:"successfully deleted!!"});
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
       
       }

      
       export const getByTag =async(req,res)=>{
        const tags = req.query.tags.split(",");
        try {
          const blogs= await blogs.find({title:{$in:tags}}).limit(20);
          return res.status(200).json(blogs);
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
      };

      export const search=async(req,res) => {
        const query=req.query.q;
        try {
          const blogs=await blogs.find({
            title: { $regex: query, $options: "i" },
          }).limit(40);
          res.status(200).json(blogs);
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
      };
      
      
