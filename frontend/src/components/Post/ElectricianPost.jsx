import { useEffect, useState } from "react";
import profilePhoto from "../../assets/images/elecProfile.jpg";
import { format } from "timeago.js";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  useElectricianCommentPostMutation,
  useElectricianGetCommentPostMutation,
  useElectricianLikePostMutation,
  useSaveElectricianPostMutation,
} from "../../slices/postApiSlice";
import { useSelector } from "react-redux";
const ELECTRICIAN_POSTS_DIR_PATH = "http://localhost:8080/postImagesAndVideos/";
import { AiFillLike } from "react-icons/ai";
import Swal from "sweetalert2";
import { FaRegCommentDots } from "react-icons/fa";
import { CiSaveDown2 } from "react-icons/ci";
import InputEmoji from "react-input-emoji";
import { toast } from "react-toastify";
import { BsReply } from "react-icons/bs";

const ElectricianPost = ({ electricianPosts, onDataFromChild }) => {
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
  const [postComment, setPostComment] = useState([]);

  const [
    postIdSentToBackEndGetCorrespondingComments,
    setPostIdSentToBackEndGetCorrespondingComments,
  ] = useState(null);

  const [formData, setFormData] = useState({
    description: "",
  });
  const [commentClicked, setCommentClicked] = useState(false);
  const [commentPost] = useElectricianCommentPostMutation();
  const [replyComments, setReplyComments] = useState(false);
  const [showRepliedComment, setShowRepliedComment] = useState(false);
  const [likePost] = useElectricianLikePostMutation();
  const [saveElectricianPost] = useSaveElectricianPostMutation()

  const [electricianGetCommentPost] = useElectricianGetCommentPostMutation();

  const handleLikeButtonClick = async (postId) => {
    await likePost({ postId }).unwrap();
    setCount((prevCount) => prevCount + 1);
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
    console.log(postId);
    const { description } = formData;
    console.log(description);
    try {
      const electricianCommentId = electricianInfo._id;
      console.log(electricianCommentId);
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

  const handleReplyCommentClick = () => {
    setReplyComments(!replyComments);
  };
  const handleShowRepliedComment = () => {
    setShowRepliedComment(!showRepliedComment);
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
            console.log(getCommentResult.data);
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
  }, [count, commentClicked]);

  const handleSaveOptionClick = async(postId)=>{
    try {
      const result = await saveElectricianPost({postId,electricianId:electricianInfo._id}).unwrap()
      if(result.message){
        toast.success(result.message)
      }else{
        toast.error("Some thing went wrong")
      }
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <>
      {electricianPosts.map((posts) => (
        <div key={posts.id} className="bg-white mt-5 rounded-lg md:shadow-md">
          <div className="flex p-5 gap-5 items-start">
            <div className="flex-shrink-0">
              <img
                src={profilePhoto}
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
              {posts.electricianId ? (
                <div>
                  <h4 className="text-lg font-semibold">Electrician</h4>
                  <span className="flex gap-5">
                    <h6 className="text-sm text-gray-500">Report</h6>
                    <p className="text-sm text-gray-500">Delete</p>
                  </span>
                </div>
              ) : (
                <div>
                  <h4 className="text-lg font-semibold">Shop</h4>
                  <h6 className="text-sm text-gray-500">Report</h6>
                </div>
              )}
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
                    src={ELECTRICIAN_POSTS_DIR_PATH + posts.fileName[0]}
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
                COMMENT
              </h2>
            </div>
           
            <div onClick={()=>{handleSaveOptionClick(posts._id)}} className="cursor-pointer flex gap-2">
              <CiSaveDown2 />
              <h2 >SAVE</h2>
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
                    src={profilePhoto}
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
                            src={profilePhoto}
                            className="w-9 h-9 rounded-full object-cover"
                            alt="Profile"
                          />
                          <div>
                            <p className="font-medium text-base text-ascent-1">
                              {comments.electricianId.electricianName}
                            </p>
                            <span className="text-ascent-2 text-sm">
                              {format(comments.updatedAt)}
                            </span>
                          </div>
                        </div>

                        <div className="ml-12 mr-8">
                          <p className="text-ascent-2 text-justify">
                            {comments.comment}
                          </p>
                          <div className="mt-2 flex gap-6">
                            <div
                              className="text-xs cursor-pointer flex gap-2"
                              onClick={handleLikeClick}
                            >
                              <AiFillLike />
                              <p>LIKE </p>
                            </div>
                            <div className="text-xs cursor-pointer flex gap-2">
                              <BsReply />
                              <p onClick={handleReplyCommentClick}>REPLY</p>
                            </div>
                          </div>

                          {replyComments && (
                            <div className="flex items-center gap-4 border-t border-gray-300 pt-4">
                              <img
                                src={profilePhoto}
                                className="w-9 h-9 rounded-full object-cover"
                                alt="Profile"
                              />
                              <div className="flex-1">
                                <textarea
                                  placeholder="What's Your reply?"
                                  name="description"
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
                                onClick={handleShowRepliedComment}
                              >
                                (Show Replies)
                              </h6>
                            </div>
                          )}
                        </div>

                        {showRepliedComment && (
                          <div className="px-8">
                            <div className="flex gap-3 ml-16 items-center m-1">
                              <img
                                src={profilePhoto}
                                className="w-7 h-7 rounded-full object-cover"
                                alt="Profile"
                              />
                              <div>
                                <p className="font-medium text-sm text-ascent-1">
                                  Robert R
                                </p>
                                <span className="text-xs">14-08-2023</span>
                              </div>
                            </div>
                            <p className="ml-[104px] text-base text-justify">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Quam dicta debitis placeat quae facere
                              voluptates!
                            </p>
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

export default ElectricianPost;
