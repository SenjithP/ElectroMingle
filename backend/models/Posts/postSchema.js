import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    electricianId: {
      type: Schema.Types.ObjectId,
      ref: "Electrician",
      default: null,
    },
   
    description: {
      type: String,
    },
    fileName:{
      type: Array,
    },
    likes: [{
      type:String
    }],
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comments",
    }],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
