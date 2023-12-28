import express from "express";
import {
  createPost,
  viewPost,
  likePost,
  commentPost,
  likePostComment,
  replyPostComment,
  getCommentPost,
  savePost,
  getSavedPosts,
  getMyPosts,
  deleteComment,
  deleteReplyComment,
  deletePost
} from "../controllers/Posts/postController.js";
import { upload } from "../utils/multer.js";

const postRouter = express.Router();

postRouter.post("/electrician/create-post", upload, createPost);
postRouter.get("/electrician/view-post", viewPost);
postRouter.post("/electrician/like-post", likePost);
postRouter.post("/electrician/like-Comment", likePostComment);

postRouter.post("/electrician/reply-comment", replyPostComment);

postRouter.get("/electrician/get-post-comments", getCommentPost);
postRouter.post("/electrician/comment-post", commentPost);
postRouter.post("/electrician/save-posts", savePost);
 
postRouter.get("/electrician/get-saved-post", getSavedPosts);
postRouter.get("/electrician/get-my-post", getMyPosts);

postRouter.delete("/electrician/deletePost", deletePost);
postRouter.put("/electrician/deleteReplyComment", deleteReplyComment);
postRouter.delete("/electrician/deleteComment", deleteComment);
export default postRouter;
