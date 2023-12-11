import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineIosShare } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";
import profilePhoto from "../../assets/images/elecProfile.jpg";
import imageUpload from "../../assets/images/uploadImage.png";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from "sweetalert2";

import videoUpload from "../../assets/images/uploadVideo.png";
import ElectricianHeader from "../../components/Header/electricianHeader";
import {
  useElectricianLikePostMutation,
  useElectricianPostingMutation,
  useElectricianViewPostsMutation,
  useElectricianCommentPostMutation,
  useElectricianGetCommentPostMutation,
} from "../../slices/postApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
const ELECTRICIAN_POSTS_DIR_PATH = "http://localhost:8080/postImagesAndVideos/";

const ElectriciansHomeScreen = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const { electricianInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [electricianPosts, setElectricianPosts] = useState([]);
  const [viewPosts] = useElectricianViewPostsMutation();
  const [electricianPost] = useElectricianPostingMutation();
  const [likePost] = useElectricianLikePostMutation();
  const [commentPost] = useElectricianCommentPostMutation();
  const [count, setCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [replyComments, setReplyComments] = useState(false);
  const [showRepliedComment, setShowRepliedComment] = useState(false);
  const [electricianGetCommentPost] = useElectricianGetCommentPostMutation();
  const [showCommentsMap, setShowCommentsMap] = useState({});
  const [commentClicked, setCommentClicked] = useState(false);

  const [postComment, setPostComment] = useState([]);
  const [
    postIdSentToBackEndGetCorrespondingComments,
    setPostIdSentToBackEndGetCorrespondingComments,
  ] = useState(null);

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
  }, [commentClicked, postIdSentToBackEndGetCorrespondingComments]);

  const handleReplyCommentClick = () => {
    setReplyComments(!replyComments);
  };
  const handleShowRepliedComment = () => {
    setShowRepliedComment(!showRepliedComment);
  };

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState();
  const [postVideo, setPostVideo] = useState();

  const [imageError, setImageError] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  const imageRef = useRef();
  const videoRef = useRef();

  const isImageValid = (fileName) => {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const ext = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(ext);
  };

  const isVideoValid = (fileName) => {
    const allowedExtensions = ["mp4"];
    const ext = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(ext);
  };

  const onImageChange = (event) => {
    const file = event.target.files[0];
    setPostImage(file);
    if (file) {
      const fileName = file.name;
      if (isImageValid(fileName)) {
        setImage({
          image: URL.createObjectURL(file),
        });

        setImageError(null);
      } else {
        setImage(null);
        setImageError("Unsupported Image File.");
        setTimeout(() => setImageError(null), 5000);
      }
    }
  };

  const onVideoChange = (event) => {
    const file = event.target.files[0];
    setPostVideo(file);

    if (file) {
      const fileName = file.name;
      if (isVideoValid(fileName)) {
        setVideo({
          video: URL.createObjectURL(file),
        });
        setVideoError(null);
      } else {
        setVideo(null);
        setVideoError("Unsupported Video File.");
        setTimeout(() => setVideoError(null), 5000);
      }
    }
  };

  // Function to handle input change

  const [formData, setFormData] = useState({
    description: "",
  });

  const handleInputChange = (description) => {
    setFormData({ ...formData, description });
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
      setCount((prevCount) => prevCount + 1);

      toast.success("comment added");
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!description || description.trim() === "") {
      toast.error("Please provide a description");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("description", description);

      if (!postImage && !postVideo) {
        toast.error("Please provide either an image or a video");
        return;
      }

      if (postImage && postVideo) {
        formData.append("file", postImage);
        formData.append("file", postVideo);
      } else if (postImage) {
        formData.append("file", postImage);
      } else if (postVideo) {
        formData.append("file", postVideo);
      } else {
        toast.error("please select a file");
      }
      await electricianPost(formData).unwrap();

      setDescription("");
      if (postImage && postVideo) {
        setImage(null);
        setVideo(null);
      } else if (postImage) {
        setImage(null);
      } else {
        setVideo(null);
      }
      setCount(count + 1);

      toast.success("Post added successfully");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await viewPosts();

        if (result.data) {
          setElectricianPosts(result.data.electricianPosts);
          setAllPosts(allPosts);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [viewPosts, count]);

  const handleLikeButtonClick = async (postId) => {
    await likePost({ postId }).unwrap();
    setCount(count + 1);
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

  return (
    <>
      <ElectricianHeader electricianName={electricianInfo?.electricianName} />

      <section className="max-h-halfscreen  flex flex-col md:flex-row">
        {/* First part - 25% on small screens, 50% on medium screens and above */}
        <ElectricianSideBar />
        {/* Second part - 50% on small screens, 50% on medium screens and above */}
        <div className="md:w-1/10 lg:w-1/2 text-center m-5 max-h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-white-300">
          <div className="flex items-center bg-white p-3 md:shadow-md rounded-lg">
            <div className="w-full">
              <form onSubmit={submitHandler} encType="multipart/form-data">
                <div className="flex gap-3">
                  <img
                    src={profilePhoto}
                    alt="Profile Photo"
                    className="w-14 h-14 mt-2 justify-center align-middle object-cover rounded-full"
                  />
                  <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    name="description"
                    className="text-lg font-semibold mb-1 p-1 w-full border border-gray-300 rounded-md focus:outline-none"
                    placeholder="What's on your mind, Robert?"
                  />
                </div>
                <div className="flex ml-16 justify-between items-center">
                  <div className="flex gap-6">
                    <label
                      htmlFor="fileInput1"
                      className="cursor-pointer flex items-center"
                    >
                      <img
                        src={imageUpload}
                        alt="Image Upload"
                        className="w-10 h-8 rounded-md"
                      />
                      <span className="text-xs">Upload Image</span>
                    </label>
                    <input
                      type="file"
                      name="file"
                      ref={imageRef}
                      onChange={onImageChange}
                      id="fileInput1"
                      className="hidden"
                      accept=".jpg, .jpeg, .png"
                    />
                    {imageError && (
                      <p className="text-red-600 text-sm">{imageError}</p>
                    )}

                    <label
                      htmlFor="fileInput2"
                      className="cursor-pointer flex items-center"
                    >
                      <img
                        src={videoUpload}
                        alt="Video Upload"
                        className="w-10 h-8 rounded-md"
                      />
                      <span className="text-xs">Upload Video</span>
                    </label>
                    <input
                      type="file"
                      name="file"
                      ref={videoRef}
                      onChange={onVideoChange}
                      id="fileInput2"
                      className="hidden"
                      accept=".mp4"
                    />

                    {videoError && (
                      <p className="text-red-600 text-sm">{videoError}</p>
                    )}
                  </div>
                  <button className="bg-buttonColor text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>

          {image && (
            <div className="previewVideo">
              <IoMdClose onClick={() => setImage(null)} className="closeIcon" />
              <img src={image.image} className="w-full h-full rounded-md" />
            </div>
          )}

          {video && (
            <div className="previewVideo">
              <IoMdClose onClick={() => setVideo(null)} className="closeIcon" />
              <video
                src={video.video}
                controls
                className="w-full h-full rounded-md"
              />
            </div>
          )}

          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : electricianPosts.length > 0 ? (
            electricianPosts.map((posts) => (
              <div
                key={posts.id}
                className="bg-white mt-5 rounded-lg md:shadow-md"
              >
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
                            <video
                              controls
                              className="w-full h-[350px] object-fill"
                            >
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
                  <div className="flex gap-2">
                    <MdOutlineIosShare />
                    <h2>SHARE</h2>
                  </div>
                  <div className="flex gap-2">
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
                          src={profilePhoto}
                          className="w-9 h-9 rounded-full object-cover"
                          alt="Profile"
                        />
                        <div className="flex-1">
                          <InputEmoji
                            placeholder="What's on your mind?"
                            value={description}
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
                            <div
                              key={index}
                              className="w-full border-t-2 m-2 py-2"
                            >
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
                                {/* <div className="mt-2 flex gap-6">
                                  <div
                                    className="text-xs cursor-pointer flex gap-2"
                                    onClick={handleLikeClick}
                                  >
                                    <AiFillLike />
                                    <p>LIKE </p>
                                  </div>
                                  <div className="text-xs cursor-pointer flex gap-2">
                                    <BsReply />
                                    <p onClick={handleReplyCommentClick}>
                                      REPLY
                                    </p>
                                  </div>
                                </div> */}

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
                                      <span className="text-xs">
                                        14-08-2023
                                      </span>
                                    </div>
                                  </div>
                                  <p className="ml-[104px] text-base text-justify">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Quam dicta debitis placeat
                                    quae facere voluptates!
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
            ))
          ) : (
            <div>No Post found</div>
          )}
        </div>
        ;
        {/* Third part - 25% on small screens, 25% on medium screens and above */}
        <div className="hidden lg:block lg:w-1/4 rounded-r-lg py-5 m-5 md:shadow-md text-center">
          <div className={"flex flex-col items-center justify-center"}>
            <div className={"text-center mb-4"}>
              <h1>TO DO</h1>
              <p>Stay organized with Todo</p>
            </div>
            <ul className={"list-disc p-4 rounded-md shadow-sm"}>
              <li className={"flex items-center justify-between"}>
                <p>Check Schedules</p>
                <input
                  type="checkbox"
                  // checked={checked}
                  // onChange={handleCheckboxChange}
                  className={"ml-2"}
                />
              </li>
              <li className={"flex items-center justify-between"}>
                <p>Add</p>
                <input
                  type="checkbox"
                  checked={false}
                  // onChange={handleCheckboxChange}
                  className={"ml-2"}
                />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ElectriciansHomeScreen;
