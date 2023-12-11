import Post from "../../models/Posts/postSchema.js";
import Electrician from "../../models/electricianSchema.js";
import Shop from "../../models/shopSchema.js";
import Comment from "../../models/Posts/commentSchema.js";
import jwt from "jsonwebtoken";

export const createPost = async (req, res) => {
  try {
    const { description } = req.body;
    const images = req.files.map((file) => file.filename);
    if (!images) {
      return res.status(400).json({ message: "No image provided" });
    }

    let electricianId = null;
    let shopId = null;

    const token = req.cookies.electricianjwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing JWT" });
    }

    const decodedToken = jwt.verify(token, process.env.ELECTRICIAN_JWT_SECRET);
    const electrician = decodedToken.userId;

    if (electrician) {
      electricianId = electrician;
    }

    const post = await Post.create({
      electricianId,
      shopId,
      description,
      fileName: images,
    });

    res.status(200).json({ message: "Posted successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const viewPost = async (req, res) => {
  try {
    // Use populate to retrieve data from the referenced Electrician model
    const allPosts = await Post.find({}).populate("electricianId");

    if (!allPosts || allPosts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }

    // Create an array to store the status for each post

    // Reverse the order of the posts
    const reversedPosts = allPosts.reverse();

    // Send the response with the posts and their statuses
    res.status(200).json({ electricianPosts: reversedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const token = req.cookies.electricianjwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing JWT" });
    }

    const decodedToken = jwt.verify(token, process.env.ELECTRICIAN_JWT_SECRET);

    const postId = req.body.postId;
    const electricianId = decodedToken.userId;
    const electricianDetails = await Electrician.findById(electricianId);
    const electricianName = electricianDetails.electricianName;
    if (!postId) {
      return res.status(400).json({ error: "postId is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the electrician has already liked the post
    const likedIndex = post.likes.findIndex((like) =>
      like.includes(electricianId)
    );

    if (likedIndex === -1) {
      // If not liked, like the post
      post.likes.push(electricianId + electricianName);
      await post.save();
      res.status(200).json({
        message: "Post liked successfully",
      });
    } else {
      // If already liked, unlike the post
      post.likes.splice(likedIndex, 1);
      await post.save();
      res.status(200).json({
        message: "Post unliked successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { description, electricianCommentId, postId } = req.body;

    console.log(req.body);
    if (description === null) {
      return res.status(404).json({ message: "Comment is required" });
    }
    const newComment = new Comment({
      comment: description,
      electricianId: electricianCommentId,
      postId: postId,
    });
    await newComment.save();

    const post = await Post.findById(postId);
    post.comments.push(newComment._id);
    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      new: true,
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getCommentPost = async (req, res) => {
  try {
    const postId = req.query.id;
    const postComments = await Comment.find({postId:postId}).populate(
      "electricianId"
    );
    res.status(200).json(postComments);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const replyPostComment = async (req, res) => {
  const { userId } = req.body.user;
  const { comment, replyAt, from } = req.body;
  const { id } = req.params;

  if (comment === null) {
    res.status(404).json({ message: "Comment is required." });
  }
  try {
    const commentInfo = await Comment.findById(id);
    commentInfo.replies.push({
      comment,
      replyAt,
      from,
      userId,
      created_At: Date.now(),
    });
    commentInfo.save();
    res.status(200).json(commentInfo);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
