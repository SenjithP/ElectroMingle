import mongoose, { Schema } from "mongoose";

const savePostSchema = new mongoose.Schema(
  {
    electricianId: {
      type: Schema.Types.ObjectId,
      ref: "Electrician",
      default: null,
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "Shop",
      default: null,
    },
    postId: 
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    
  },
  {
    timestamps: true,
  }
);

const SavePost = mongoose.model("SavePost", savePostSchema);

export default SavePost;
