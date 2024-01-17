import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import imageUpload from "../../assets/images/uploadImage.png";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar.jsx";
import ElectricianPost from "../../components/Post/ElectricianPost.jsx";
import videoUpload from "../../assets/images/uploadVideo.png";
import ElectricianHeader from "../../components/Header/electricianHeader";
import {
  useElectricianPostingMutation,
  useElectricianViewPostsMutation,
} from "../../slices/postApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useGetElecticianDetailsMutation } from "../../slices/electriciansApiSlice.js";
import UpcomingWorks from "../../components/Electrician/upcomingWorks.jsx";

const ElectriciansHomeScreen = () => {
  const [count, setCount] = useState(0);
 
  const [getElecticianDetails] = useGetElecticianDetailsMutation();
  const [electicianDetails, setElecticianDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const electricianDetail = await getElecticianDetails({
          id: electricianInfo._id,
        });
        if (electricianDetail.data) {
          setElecticianDetails(electricianDetail.data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, [count, getElecticianDetails]);

  const [receivedData, setReceivedData] = useState(null);

  const handleDataFromChild = (count) => {
    // Handle the data received from the child component
    console.log("Data received from child:", count);
    setReceivedData(count);
  };

  const { electricianInfo } = useSelector((state) => state.auth);
  const [electricianPosts, setElectricianPosts] = useState([]);

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState();
  const [postVideo, setPostVideo] = useState();

  const [imageError, setImageError] = useState(null);
  const [videoError, setVideoError] = useState(null);

  const imageRef = useRef();
  const videoRef = useRef();

  const [electricianPost] = useElectricianPostingMutation();
  const [viewPosts] = useElectricianViewPostsMutation();

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
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [count, receivedData]);



  return (
    <>
      <ElectricianHeader electicianDetails={electicianDetails} />

      <section className="max-h-halfscreen bg-gradient-to-l from-blue-200 via-blue-100 to-blue-50 flex flex-col md:flex-row">
        <ElectricianSideBar electicianDetails={electicianDetails} />

        <div className="md:w-1/10 lg:w-1/2 text-center m-5 max-h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-white-300">
          <div className="flex items-center bg-white p-3 md:shadow-md rounded-lg">
            <div className="w-full">
              <form onSubmit={submitHandler} encType="multipart/form-data">
                <div className="flex gap-3">
                  <img
                    src={
                  electicianDetails.data?.electricianProfileImage}
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

          {electricianPosts.length > 0 ? (
            <ElectricianPost
              electricianPosts={electricianPosts}
              electicianDetails={electicianDetails}
              onDataFromChild={handleDataFromChild}
            />
          ) : (
            <div>No Post found</div>
          )}
        </div>

        <div className="hidden lg:block lg:w-1/4 rounded-r-lg  bg-blue-50 m-5 md:shadow-md text-center">
          <div className={"flex flex-col items-center justify-center"}>
            <UpcomingWorks />
          </div>
        </div>
      </section>
    </>
  );
};

export default ElectriciansHomeScreen;
