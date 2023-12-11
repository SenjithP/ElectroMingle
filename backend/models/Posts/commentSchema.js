import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema(
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
        rid: { type: mongoose.Schema.Types.ObjectId },
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
        from: { type: String },
        replyAt: { type: String },
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
