import React, { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import coverPhoto from "../../assets/images/coverPhoto.png";
import { LuCalendarClock } from "react-icons/lu";
import { VscFileMedia } from "react-icons/vsc";
import { GrSchedules } from "react-icons/gr";
import { MdJoinInner } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiSaveDown1 } from "react-icons/ci";
import { useGetSidebarElecticianDetailsMutation } from "../../slices/electriciansApiSlice";
import { useSelector } from "react-redux";
import { RiAlarmWarningFill } from "react-icons/ri";
import { ELECTRICIAN_PROFILE_IMAGE_DIR_PATH } from "../../urls";
import profilePic from "../../assets/images/elecProfile.png";

const ElectricianSideBar = ({ count }) => {
  const { electricianInfo } = useSelector((state) => state.auth);
  console.log(count);
  const location = useLocation();

  const sideBarItems = useMemo(
    () => [
      { text: "FEEDS", letterIcons: LuCalendarClock, path: "/electricianHome" },
      {
        text: "YOUR POSTS",
        letterIcons: VscFileMedia,
        path: "/electricianMyPost",
      },
      {
        text: "SCHEDULES",
        letterIcons: GrSchedules,
        path: "/electricianSideScheduledWorks",
      },
      { text: "MEETING", letterIcons: MdJoinInner, path: "/meeting" },

      {
        text: "SAVED",
        letterIcons: CiSaveDown1,
        path: "/electricianSavedPost",
      },
      { text: "PROFILE", letterIcons: CgProfile, path: "/electricianProfile" },
    ],
    []
  );

  const [selectedLetter, setSelectedLetter] = useState(0);
  const [getSidebarElecticianDetails] =
    useGetSidebarElecticianDetailsMutation();
  const [sidebarElecticianDetails, setSidebarElecticianDetails] = useState([]);
  useEffect(() => { 
    const index = sideBarItems.findIndex(
      (letter) => location.pathname === letter.path
    );
    if (index !== -1) {
      setSelectedLetter(index);
    }
  }, [location.pathname, sideBarItems]);
  console.log(electricianInfo._id, "idddS");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sidebarElectricianDetail = await getSidebarElecticianDetails({
          id: electricianInfo._id,
        });
        if (sidebarElectricianDetail.data) {
          setSidebarElecticianDetails(sidebarElectricianDetail.data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, [count, getSidebarElecticianDetails]);
  console.log(sidebarElecticianDetails, "sidebarElecticianDetails");
  return (
    <>
      <div className="hidden  lg:block md:w-1/2 lg:w-1/4 relative rounded-lg overflow-hidden m-5 md:shadow-md text-center max-h-screen overflow-y-auto scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-gray-300">
        <div className="rounded-t-lg max-h-400px overflow-hidden">
          <img
            src={coverPhoto}
            alt="Cover Photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white rounded-full overflow-hidden w-[200px] h-[200px]">
         {sidebarElecticianDetails.data?.electricianProfileImage !== "default-image.jpg"?(
          <img
            src={
              
                 ELECTRICIAN_PROFILE_IMAGE_DIR_PATH +
                  sidebarElecticianDetails.data?.electricianProfileImage
              
            }
            alt="Profile Photo"
            className="w-full h-full object-cover rounded-full"
          />
         ):(
          <img
            src={profilePic}
            alt="Profile Photo"
            className="w-full h-full object-cover rounded-full"
          />
         )}
         
          
        </div>
        <div className="max-h-400px bg-blue-50 p-4">
          {sidebarElecticianDetails.data?.electricianIsVerified ? (
            <div className="mt-[100px]">
              <h1 className="text-[30px] font-bold mb-2">
                {sidebarElecticianDetails.data.electricianName}
              </h1>
              <div className="flex justify-around">
                <h3 className="text-[20px] text-gray-800 mb-2">
                  {sidebarElecticianDetails.data.electricianMobileNumber}
                </h3>
                <h3 className="text-[20px] text-gray-800 mb-2">
                  {
                    sidebarElecticianDetails.data?.electricianLocation
                      .electricianState
                  }
                  ,{" "}
                  {
                    sidebarElecticianDetails.data.electricianLocation
                      ?.electricianLocality
                  }
                </h3>
              </div>
              <p className="text-[16px] text-gray-700 text-justify">
                {sidebarElecticianDetails.data.electricianDescription}
              </p>
            </div>
          ) : (
            <div className="mt-[100px]">
              <h1 className="text-[30px] font-bold mb-2">
                {sidebarElecticianDetails.data?.electricianName}
              </h1>
              <div className="update-profile-warning">
                <h2 className="text-[20px] inline-block">
                  Please Update Your Profile First
                </h2>
                <RiAlarmWarningFill className="text-red-500 inline-block text-2xl ml-2 animate-bounce" />

                <br />
                <Link
                  className="text-blue-500 font-medium ml-1"
                  to={"/electricianProfile"}
                >
                  click here
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="bg-profileColor flex flex-col items-center pt-5 md:shadow-inner">
          {sideBarItems.map(({ text, letterIcons, path }, index) => (
            <NavLink
              key={index}
              to={path}
              activeClassName="border-blue-700 shadow-md m-5"
              className={`cursor-pointer min-w-[300px] min-h-[30px] border-l-4 ${
                selectedLetter === index
                  ? "border-blue-700"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedLetter(index)}
            >
              <h1 className="flex items-center justify-center m-8 font-bold text-xl">
                {React.createElement(letterIcons, { className: "mr-4" })}
                {text}
              </h1>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default ElectricianSideBar;
