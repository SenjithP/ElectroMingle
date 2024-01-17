import Post from "../../models/Posts/postSchema.js";
import Electrician from "../../models/electricianSchema.js";
import Comment from "../../models/Posts/commentSchema.js";
import jwt from "jsonwebtoken";
import SavePost from "../../models/Posts/savePostSchema.js";

export const createPost = async (req, res) => {
  try {
    const { description } = req.body;
    const images = req.files.map((file) => file.filename);
    if (!images) {
      return res.status(400).json({ message: "No image provided" });
    }

    let electricianId = null;

    const token = req.cookies.electricianjwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing JWT" });
    }

    const decodedToken = jwt.verify(token, process.env.ELECTRICIAN_JWT_SECRET);
    const electrician = decodedToken.electricianId;

    if (electrician) {
      electricianId = electrician;
    }

    const post = await Post.create({
      electricianId,
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
    const electricianId = decodedToken.electricianId;
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
    const postComments = await Comment.find({ postId: postId }).populate([
      {
        path: "electricianId",
      },
      {
        path: "replies",
        populate: {
          path: "electricianId",
        },
      },
    ]);

    res.status(200).json(postComments);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const likePostComment = async (req, res) => {
  try {
    const token = req.cookies.electricianjwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing JWT" });
    }

    const decodedToken = jwt.verify(token, process.env.ELECTRICIAN_JWT_SECRET);

    const commentId = req.body.commentId;
    const electricianId = decodedToken.electricianId;
    const electricianDetails = await Electrician.findById(electricianId);
    const electricianName = electricianDetails.electricianName;
    if (!commentId) {
      return res.status(400).json({ error: "commentId is required" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "comment not found" });
    }

    // Check if the electrician has already liked the post
    const likedIndex = comment.likes.findIndex((like) =>
      like.includes(electricianId)
    );

    if (likedIndex === -1) {
      // If not liked, like the post
      comment.likes.push(electricianId + electricianName);
      await comment.save();
      res.status(200).json({
        message: "comment liked successfully",
      });
    } else {
      // If already liked, unlike the post
      comment.likes.splice(likedIndex, 1);
      await comment.save();
      res.status(200).json({
        message: "comment unliked successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const replyPostComment = async (req, res) => {
  const { electricianCommentId, commentId, replyComment } = req.body;

  if (!replyComment || replyComment.trim().length === 0) {
    res.status(404).json({ message: "Comment is required." });
  }
  try {
    const commentInfo = await Comment.findById(commentId);
    commentInfo.replies.push({
      electricianId: electricianCommentId,
      comment: replyComment,
    });
    commentInfo.save();
    res.status(200).json(commentInfo);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const { postId, electricianId } = req.body;

    // Check if electricianId and postId combination exists
    const existingSavePost = await SavePost.findOne({ electricianId, postId });

    if (existingSavePost) {
      return res.status(200).json({ message: "Post already saved." });
    } else {
      // If electricianId and postId combination doesn't exist, create a new document
      const savePostData = {
        electricianId: electricianId,
        postId: postId,
        // Add other properties as needed
      };

      const savedPost = new SavePost(savePostData);
      await savedPost.save();
      return res.status(200).json({ message: "Post saved successfully." });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getSavedPosts = async (req, res) => {
  try {
    // Validate that the required parameter 'id' is provided in the query
    const electricianId = req.query.id;
    if (!electricianId) {
      return res.status(400).json({
        message: "Electrician ID is required in the query parameters.",
      });
    }

    const allElectriciansSavedPosts = await SavePost.find({
      electricianId,
    }).populate({
      path: "postId",
      populate: {
        path: "electricianId",
        model: Electrician, // Replace with the actual model name for Electrician
      },
    });

    // If electrician's saved posts found, return them
    if (allElectriciansSavedPosts && allElectriciansSavedPosts.length > 0) {
      const reversedPosts = allElectriciansSavedPosts.reverse();
      return res.status(200).json({ allElectriciansSavedPosts: reversedPosts });
    }

    return res.status(404).json({
      message: "No saved posts found for the specified user.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    // Validate the presence of 'id' in the query parameters
    const userId = req.query.id;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required in the query parameters." });
    }

    // Find electrician's posts based on the provided user ID
    const electriciansMyPost = await Post.find({
      electricianId: userId,
    }).populate("electricianId");

    // If electrician's saved posts found, return them
    if (electriciansMyPost && electriciansMyPost.length > 0) {
      const reversedPosts = electriciansMyPost.reverse();
      return res.status(200).json({ electriciansMyPost: reversedPosts });
    }

    return res
      .status(404)
      .json({ message: "No posts found for the provided user ID." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "Invalid postId" });
    }
    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const commentRelated = await Comment.find({ postId });
    if (commentRelated.length === 0) {
      return res.status(200).json({ message: "Post deleted successfully" });
    }
    await Comment.deleteMany({ postId });
    return res
      .status(200)
      .json({ message: "Post and related comments deleted successfully" });
  } catch (error) {
    console.error("Errors:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;

    // Delete the comment
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Find the post that contains the comment and remove the commentId from its replies array
    const post = await Post.findOneAndUpdate(
      { comments: commentId },
      { $pull: { comments: commentId } },
      { new: true }
    );

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found for the given comment" });
    }

    return res
      .status(200)
      .json({ message: "Reply comment deleted successfully" });
  } catch (error) {
    console.error("Errors:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteReplyComment = async (req, res) => {
  try {
    const { commentId, replyCommentId } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comment.replies.pull({ _id: replyCommentId });
    await comment.save();
    return res
      .status(200)
      .json({ message: "Reply comment deleted successfully" });
  } catch (error) {
    console.error("Errors:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
