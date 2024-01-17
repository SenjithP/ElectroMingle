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
  deletePost,
} from "../controllers/Posts/postController.js";
import { upload } from "../utils/multer.js";
import electricianVerifyToken from "../Middlewares/electricianAuthenticationMiddleware.js";

const postRouter = express.Router();

postRouter.post(
  "/electrician/create-post",
  electricianVerifyToken,
  upload,
  createPost
);
postRouter.get("/electrician/view-post", electricianVerifyToken, viewPost);
postRouter.post("/electrician/like-post", electricianVerifyToken, likePost);
postRouter.post(
  "/electrician/like-Comment",
  electricianVerifyToken,
  likePostComment
);

postRouter.post(
  "/electrician/reply-comment",
  electricianVerifyToken,
  replyPostComment
);

postRouter.get(
  "/electrician/get-post-comments",
  electricianVerifyToken,
  getCommentPost
);
postRouter.post(
  "/electrician/comment-post",
  electricianVerifyToken,
  commentPost
);
postRouter.post("/electrician/save-posts", electricianVerifyToken, savePost);

postRouter.get(
  "/electrician/get-saved-post",
  electricianVerifyToken,
  getSavedPosts
);
postRouter.get("/electrician/get-my-post", electricianVerifyToken, getMyPosts);

postRouter.delete(
  "/electrician/deletePost",
  electricianVerifyToken,
  deletePost
);
postRouter.put(
  "/electrician/deleteReplyComment",
  electricianVerifyToken,
  deleteReplyComment
);
postRouter.delete(
  "/electrician/deleteComment",
  electricianVerifyToken,
  deleteComment
);
export default postRouter;
