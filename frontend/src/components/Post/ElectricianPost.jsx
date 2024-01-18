import { useEffect, useState } from "react";
import { format } from "timeago.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import {
  useElectricianCommentPostMutation,
  useElectricianGetCommentPostMutation,
  useElectricianLikeCommentMutation,
  useElectricianLikePostMutation,
  useSaveElectricianPostMutation,
  useReplyCommentPostMutation,
  useDeleteReplyCommentMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
} from "../../slices/postApiSlice";
import { useSelector } from "react-redux";
import { AiFillLike } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoReport } from "react-icons/go";
import Swal from "sweetalert2";
import { FaRegCommentDots } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import InputEmoji from "react-input-emoji";
import { toast } from "react-toastify";
import { BsReply } from "react-icons/bs";
import { ELECTRICIAN_POSTS_DIR_PATH } from "../../urls";

const ElectricianPost = ({
  electricianPosts,
  electicianDetails,
  onDataFromChild,
}) => {
  const [count, setCount] = useState(0);

  const sendDataToParent = (count) => {
    // Call the callback function provided by the parent
    onDataFromChild(count);
  };

  // Example usage in your component
  useEffect(() => {
    // Simulate receiving data and sending it back to the parent
    const simulatedData = count;
    sendDataToParent(simulatedData);
  }, [count]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { electricianInfo } = useSelector((state) => state.auth);
  const [showCommentsMap, setShowCommentsMap] = useState({});
  const [showRepliesMap, setShowRepliesMap] = useState({});
  const [postComment, setPostComment] = useState([]);
  const [replyInputStates, setReplyInputStates] = useState({});
  const [
    postIdSentToBackEndGetCorrespondingComments,
    setPostIdSentToBackEndGetCorrespondingComments,
  ] = useState(null);

  const [formData, setFormData] = useState({
    description: "",
  });
  const [replyFormData, setReplyFormData] = useState({
    replyComment: "",
  });
  const [commentClicked, setCommentClicked] = useState(false);
  const [commentPost] = useElectricianCommentPostMutation();
  const [electricianLikePost] = useElectricianLikePostMutation();
  const [electricianLikeComment] = useElectricianLikeCommentMutation();
  const [saveElectricianPost] = useSaveElectricianPostMutation();
  const [deleteReplyComment] = useDeleteReplyCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [deletePost] = useDeletePostMutation();

  const [electricianGetCommentPost] = useElectricianGetCommentPostMutation();
  const [replyCommentPost] = useReplyCommentPostMutation();

  const handleLikeButtonClick = async (postId) => {
    await electricianLikePost({ postId }).unwrap();
    setCount((prevCount) => prevCount + 1);
  };

  const handleCommentLikeButtonClick = async (commentId) => {
    await electricianLikeComment({ commentId }).unwrap();
    setCommentClicked(true);
  };

  const handleLikeClick = async (postId) => {
    // Find the post with the given postId
    const post = electricianPosts.find((item) => item._id === postId);

    // Check if the post exists
    if (!post) {
      Swal.fire({
        title: "Error",
        text: "Post not found",
        icon: "error",
      });
      return;
    }

    let likedBy = post.likes.map((item) => item.slice(24));

    // Check if there are no likes
    if (likedBy.length === 0) {
      likedBy.push("No One Likes This Post, Be The First To Like This Post");
    }

    // Build HTML content for Swal
    const likedByContent = likedBy
      .map((item, index) => `<li key=${index}>${item}</li>`)
      .join("");

    // Display the list using Swal
    Swal.fire({
      title: "Liked By",
      html: `<ul>${likedByContent}</ul>`,
      showCloseButton: true,
      focusConfirm: false,
    });
  };

  const handleCommentLikeClick = async (commentId) => {
    // Find the comment with the given postId
    const comment = postComment.find((item) => item._id === commentId);

    // Check if the comment exists
    if (!comment) {
      Swal.fire({
        title: "Error",
        text: "comment not found",
        icon: "error",
      });
      return;
    }

    let likedBy = comment.likes.map((item) => item.slice(24));

    // Check if there are no likes
    if (likedBy.length === 0) {
      likedBy.push(
        "No One Likes This comment, Be The First To Like This comment"
      );
    }

    // Build HTML content for Swal
    const likedByContent = likedBy
      .map((item, index) => `<li key=${index}>${item}</li>`)
      .join("");

    // Display the list using Swal
    Swal.fire({
      title: "Liked By",
      html: `<ul>${likedByContent}</ul>`,
      showCloseButton: true,
      focusConfirm: false,
    });
  };

  const handleCommentClick = async (postId) => {
    // Close all other comment sessions

    setShowCommentsMap((prevMap) => {
      const updatedMap = {};

      // Iterate through the previous map and close other sessions
      Object.keys(prevMap).forEach((prevPostId) => {
        updatedMap[prevPostId] = false;
      });

      // Open the clicked comment session
      updatedMap[postId] = !prevMap[postId];

      return updatedMap;
    });

    // Update the postId sent to the backend
    setPostIdSentToBackEndGetCorrespondingComments(postId);

    // Set the state to indicate that handleCommentClick has been triggered
    setCommentClicked(true);
  };

  const commentSubmitHandler = async (e, postId) => {
    e.preventDefault();
    const { description } = formData;
    try {
      const electricianCommentId = electricianInfo._id;
      const result = await commentPost({
        postId,
        description,
        electricianCommentId,
      }).unwrap();
      // Clear description after successful submission
      setFormData({ description: "" });
      setCommentClicked(true);
      setCount((prevCount) => prevCount + 1);

      toast.success("comment added");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (description) => {
    setFormData({ ...formData, description });
  };

  useEffect(() => {
    // Check if handleCommentClick has been triggered
    if (commentClicked) {
      const fetchComments = async () => {
        try {
          const getCommentResult = await electricianGetCommentPost({
            id: postIdSentToBackEndGetCorrespondingComments,
          });

          if (getCommentResult.data) {
            const reversedComments = [...getCommentResult.data].reverse();
            setPostComment(reversedComments);
          }
        } catch (error) {
          // Handle errors, log, or notify the user
          console.error("Error fetching comments:", error);
        } finally {
          // Reset the commentClicked state to false after fetching comments
          setCommentClicked(false);
        }
      };

      // Call fetchComments when the component mounts and whenever the count changes
      fetchComments();
    }
  }, [
    count,
    commentClicked,
    electricianGetCommentPost,
    postIdSentToBackEndGetCorrespondingComments,
  ]);

  const handleSaveOptionClick = async (postId) => {
    try {
      const result = await saveElectricianPost({
        postId,
        electricianId: electricianInfo._id,
      }).unwrap();
      if (result.message) {
        toast.success(result.message);
      } else {
        toast.error("Some thing went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyInputChange = (e) => {
    const { name, value } = e.target;
    setReplyFormData({ ...replyFormData, [name]: value });
  };

  const handleReplyComment = async (e, commentId) => {
    e.preventDefault();
    const { replyComment } = replyFormData;
    try {
      const electricianCommentId = electricianInfo._id;
      const result = await replyCommentPost({
        commentId,
        replyComment,
        electricianCommentId,
      }).unwrap();
      // Clear description after successful submission
      setReplyFormData({ replyComment: "" });
      setCommentClicked(true);
      setCount((prevCount) => prevCount + 1);

      toast.success("comment reply added");
    } catch (error) {
      console.error(error);
    }
  };

  const deletePostHandler = async (postId) => {
    try {
      const response = await deletePost({
        postId,
      }).unwrap();
      if (response.message) {
        toast.success("Post delete success");
        setCount((prevCount) => prevCount + 1);
      } else {
        toast.error("Post not deleted! Please try again");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCommentHandler = async (commentId) => {
    try {
      const response = await deleteComment({
        commentId,
      }).unwrap();
      if (response.message) {
        setCount((prevCount) => prevCount + 1);
        setCommentClicked(true);
        toast.success("Comment delete success");
      } else {
        toast.error("Comment not deleted! Please try again");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRepliedCommentHandler = async (replyCommentId, commentId) => {
    try {
      const response = await deleteReplyComment({
        replyCommentId,
        commentId,
      }).unwrap();
      if (response.message) {
        toast.success("Comment delete success");
        setCommentClicked(true);
      } else {
        toast.error("Comment not deleted! Please try again");
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(electricianPosts, "electricianPosts");
  return (
    <>
      {electricianPosts.map((posts) => (
        <div key={posts.id} className="bg-white mt-5 rounded-lg md:shadow-md">
          <div className="flex p-5 gap-5 items-start">
            <div className="flex-shrink-0">
              <img
                src={posts.electricianId.electricianProfileImage}
                alt="Profile"
                className="rounded-full w-16 h-16 object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold mt-1">
                {posts.electricianId.electricianName}
              </h2>

              <h5 className="text-sm text-gray-500">
                {format(posts.createdAt)}
              </h5>
            </div>
            <div className="ml-auto">
              <div>
                <span className="flex gap-5">
                  {posts.electricianId._id === electricianInfo._id ? (
                    <h6
                      onClick={() => deletePostHandler(posts._id)}
                      className="cursor-pointer relative group"
                    >
                      <RiDeleteBin6Line />
                      <span className="absolute left-1/2 transform -translate-x-1/2 bg-black text-xs text-white px-2 py-1 hidden group-hover:block">
                        Delete
                      </span>
                    </h6>
                  ) : (
                    <h6 className="cursor-pointer relative group">
                      <GoReport />
                      <span className="absolute left-1/2 transform -translate-x-1/2 bg-black text-xs text-white px-2 py-1 hidden group-hover:block">
                        Report
                      </span>
                    </h6>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="px-5 text-justify">
            <p>{posts.description}</p>
          </div>

          <div className="p-5  w-full text-center">
            {posts.fileName.length > 1 ? (
              <Slider {...settings}>
                {posts.fileName.map((fileName, index) => (
                  <div key={index}>
                    {fileName.endsWith(".mp4") ? (
                      <video controls className="w-full h-[350px] object-fill">
                        <source
                          src={ELECTRICIAN_POSTS_DIR_PATH + fileName}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        className="w-full h-[350px] object-fill"
                        src={ELECTRICIAN_POSTS_DIR_PATH + fileName}
                        alt={`Image ${index}`}
                      />
                    )}
                  </div>
                ))}
              </Slider>
            ) : (
              <span>
                {posts.fileName[0].endsWith(".mp4") ? (
                  <video controls>
                    <source
                      src={ELECTRICIAN_POSTS_DIR_PATH + posts.fileName[0]}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={ELECTRICIAN_POSTS_DIR_PATH  + posts.fileName[0]}
                    alt="Smvs"
                  />
                )}
              </span>
            )}
          </div>

          <div className="flex pb-5 justify-around text-center">
            <div className="flex gap-2 cursor-pointer">
              <div onClick={() => handleLikeButtonClick(posts?._id)}>
                {posts.likes?.includes(
                  electricianInfo?._id.toString() + electricianInfo.name
                ) ? (
                  <AiFillLike size={20} color="blue" />
                ) : (
                  <AiFillLike size={20} Like />
                )}
              </div>
              <p onClick={() => handleLikeClick(posts._id)}>
                {posts?.likes?.length} Likes
              </p>
            </div>

            <div className="flex gap-2 cursor-pointer">
              <FaRegCommentDots />
              <h2
                onClick={() => {
                  handleCommentClick(posts._id);
                }}
              >
                COMMENT ({posts?.comments?.length})
              </h2>
            </div>

            <div
              onClick={() => {
                handleSaveOptionClick(posts._id);
              }}
              className="cursor-pointer flex gap-2"
            >
              <CiSaveDown2 />
              <h2>SAVE</h2>
            </div>
          </div>

          {showCommentsMap[posts._id] && (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault(); // Prevents the default form submission behavior
                  commentSubmitHandler(e, posts._id);
                }}
              >
                <div className="flex items-center gap-4 border-t border-gray-300 p-4">
                  <img
                    src={electicianDetails.data?.electricianProfileImage}
                    className="w-9 h-9 rounded-full object-cover"
                    alt="Profile"
                  />
                  <div className="flex-1">
                    <InputEmoji
                      placeholder="What's on your mind?"
                      cleanOnEnter
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault(); // Prevents the default newline behavior
                          commentSubmitHandler(e, posts._id);
                        }
                      }}
                      className="w-full px-4 h-10 border-b border-solid border-blue-500 focus:outline-none focus:border-b-blue-700 text-16 leading-7 text-black placeholder:text-gray-500 rounded-md cursor-pointer"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1 bg-buttonColor text-white rounded-md hover:bg-blue-700 focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <div
                className="comments-container scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-gray-300"
                style={{
                  maxHeight: "400px",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                <div>
                  {postComment && postComment.length > 0 ? (
                    postComment.map((comments, index) => (
                      <div key={index} className="w-full border-t-2 m-2 py-2">
                        <div className="flex gap-3 items-center mb-1">
                          <img
                            src={comments.electricianId.electricianProfileImage}
                            className="w-9 h-9 rounded-full object-cover"
                            alt="Profile"
                          />
                          <div>
                            <p className="font-medium text-base text-ascent-1">
                              {comments.electricianId.electricianName}
                            </p>
                            <span className="text-ascent-2 text-sm">
                              {format(comments.createdAt)}
                            </span>
                          </div>
                          {comments.electricianId._id ===
                            electricianInfo._id && (
                            <div
                              onClick={() => deleteCommentHandler(comments._id)}
                              className="ml-auto mr-11 cursor-pointer"
                            >
                              <RiDeleteBin6Line />
                            </div>
                          )}
                        </div>

                        <div className="ml-12 mr-8">
                          <p className="text-ascent-2 text-justify">
                            {comments.comment}
                          </p>
                          <div className="mt-2 flex gap-6">
                            <div className="text-xs cursor-pointer flex gap-2">
                              <div
                                onClick={() =>
                                  handleCommentLikeButtonClick(comments?._id)
                                }
                              >
                                {comments.likes?.includes(
                                  electricianInfo?._id.toString() +
                                    electricianInfo.name
                                ) ? (
                                  <AiFillLike color="blue" />
                                ) : (
                                  <AiFillLike Like />
                                )}
                              </div>
                              <div>
                                <p
                                  onClick={() =>
                                    handleCommentLikeClick(comments._id)
                                  }
                                >
                                  {comments?.likes?.length} Likes
                                </p>
                              </div>
                            </div>

                            <div className="text-xs cursor-pointer flex gap-2">
                              <BsReply />
                              <p
                                onClick={() => {
                                  // Hide displayed replies
                                  setShowRepliesMap((prevMap) => ({
                                    ...prevMap,
                                    [comments._id]: false,
                                  }));
                                  // Toggle the visibility of the reply text area
                                  setReplyInputStates((prevStates) => ({
                                    ...prevStates,
                                    [comments._id]: !prevStates[comments._id],
                                  }));
                                }}
                              >
                                REPLY
                              </p>
                            </div>
                          </div>

                          {replyInputStates[comments._id] && (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault(); // Prevents the default form submission behavior
                                handleReplyComment(e, comments._id);
                              }}
                            >
                              <div className="flex items-center gap-4 border-t border-gray-300 pt-4">
                                <img
                                  src={
                                    electicianDetails.data
                                      ?.electricianProfileImage
                                  }
                                  className="w-9 h-9 rounded-full object-cover"
                                  alt="Profile"
                                />

                                <div className="flex-1">
                                  <textarea
                                    placeholder="What's Your reply?"
                                    name="replyComment"
                                    value={replyFormData.replyComment}
                                    onChange={handleReplyInputChange}
                                    className="w-full px-4 h-10 border-b border-solid border-blue-500 focus:outline-none focus:border-b-blue-700 text-16 leading-7 text-black placeholder:text-gray-500 rounded-md cursor-pointer"
                                    required
                                  />
                                </div>
                                <button
                                  type="submit"
                                  className="px-4 py-1 bg-buttonColor text-white rounded-md hover:bg-blue-700 focus:outline-none"
                                >
                                  Submit
                                </button>

                                <h6
                                  className="cursor-pointer"
                                  onClick={() => {
                                    // Toggle the visibility of displayed replies
                                    setShowRepliesMap((prevMap) => ({
                                      ...prevMap,
                                      [comments._id]: !prevMap[comments._id],
                                    }));
                                    // Do not hide the reply text area when clicking "Show Replies"
                                  }}
                                >
                                  {`Show (${comments.replies.length}) Replies`}
                                </h6>
                              </div>
                            </form>
                          )}
                        </div>

                        {showRepliesMap[comments._id] && (
                          <div>
                            {comments.replies.length > 0 ? (
                              comments.replies.map((repliedComment, index) => (
                                <div key={index} className="px-8">
                                  <div className="flex gap-3 ml-16 items-center m-1">
                                    <img
                                      src={
                                        repliedComment.electricianId
                                          .electricianProfileImage
                                      }
                                      className="w-7 h-7 rounded-full object-cover"
                                      alt="Profile"
                                    />
                                    <div>
                                      <p className="font-medium text-sm text-ascent-1">
                                        {
                                          repliedComment.electricianId
                                            .electricianName
                                        }
                                      </p>
                                      <span className="text-xs">
                                        {format(repliedComment.created_At)}
                                      </span>
                                    </div>
                                    {repliedComment.electricianId._id ===
                                      electricianInfo._id && (
                                      <div
                                        onClick={() =>
                                          deleteRepliedCommentHandler(
                                            repliedComment._id,
                                            comments._id
                                          )
                                        }
                                        className="ml-auto mr-11 cursor-pointer"
                                      >
                                        <RiDeleteBin6Line />
                                      </div>
                                    )}
                                  </div>
                                  <p className="ml-[104px] text-base text-justify">
                                    {repliedComment.comment}
                                  </p>
                                  <div className="border-b py-1"></div>
                                </div>
                              ))
                            ) : (
                              <div className="px-8">No replies found</div>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-ascent-2 text-sm">
                      No comments available
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
};
ElectricianPost.propTypes = {
  electricianPosts: PropTypes.array.isRequired,
  electicianDetails: PropTypes.object.isRequired,
  onDataFromChild: PropTypes.func.isRequired,
};
export default ElectricianPost;
