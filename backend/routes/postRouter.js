import express from "express";
import { createPost, viewPost,likePost,commentPost,replyPostComment,getCommentPost } from "../controllers/Posts/postController.js";
import { upload } from "../utils/multer.js";

const postRouter = express.Router();

postRouter.post("/electrician/create-post", upload, createPost);
postRouter.get("/electrician/view-post", viewPost);     
postRouter.post("/electrician/like-post",likePost)
postRouter.post("reply-comment/:id",replyPostComment)
 
postRouter.get("/electrician/get-post-comments",getCommentPost)                              
postRouter.post("/electrician/comment-post",commentPost)
export default postRouter;
