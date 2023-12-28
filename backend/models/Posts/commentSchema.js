import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    electricianId: {
      type: Schema.Types.ObjectId,
      ref: "Electrician",
      default: null,
    },
   
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: String,
      required: true,
    },
    replies: [
      {
        electricianId: {
          type: Schema.Types.ObjectId,
          ref: "Electrician",
          default: null,
        },
        
        comment: { type: String },
        created_At: { type: Date, default: Date.now },
        updated_At: { type: Date, default: Date.now },
        likes: [{ type: String }],
      },
    ],
    likes: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
