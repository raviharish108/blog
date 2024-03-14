import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      blog: {
        type: String,
        required: true,
      },
      tags: {
        type: [String],
        default: [],
      }, 
      likess: {
        type: Number,
        default: 0,
      },
      likes: {
        type: [String],
        default: [],
      },
      dislikess: {
        type: Number,
        default: 0,
      },
      dislikes: {
        type: [String],
        default: [],
      },
},{
    timestamps: true
})

export default mongoose.model("blogs",blogSchema)