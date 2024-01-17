import React, { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import coverPhoto from "../../assets/images/coverPhoto.png";
import { LuCalendarClock } from "react-icons/lu";
import { VscFileMedia } from "react-icons/vsc";
import { GrSchedules } from "react-icons/gr";
import { MdJoinInner } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CiSaveDown1 } from "react-icons/ci";
import { RiAlarmWarningFill } from "react-icons/ri";
import profilePic from "../../assets/images/elecProfile.png";
import PropTypes from "prop-types";

const ElectricianSideBar = ({ electicianDetails }) => {
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
      { text: "MEETING", letterIcons: MdJoinInner, path: "/meetingHome" },

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

  useEffect(() => {
    const index = sideBarItems.findIndex(
      (letter) => location.pathname === letter.path
    );
    if (index !== -1) {
      setSelectedLetter(index);
    }
  }, [location.pathname, sideBarItems]);

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
          {electicianDetails.data?.electricianProfileImage !==
          "default-image.jpg" ? (
            <img
              src={electicianDetails.data?.electricianProfileImage}
              alt="Profile Photo"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <img
              src={profilePic}
              alt="Profile Photo"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
        <div className="max-h-400px bg-blue-50 p-4">
          {electicianDetails.data?.electricianIsVerified ? (
            <div className="mt-[100px]">
              <h1 className="text-[30px] font-bold mb-2">
                {electicianDetails.data.electricianName}
              </h1>

              <table className="table">
                <tbody>
                  <tr>
                    <td className="text-sm text-gray-600 py-2 border-b px-4">
                      Email:
                    </td>
                    <td className="text-sm text-gray-800 py-2 px-4 border-b">
                      {electicianDetails.data.electricianEmail}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm text-gray-600 border-b py-2 px-4">
                      Mobile Number:
                    </td>
                    <td className="text-sm text-gray-800 py-2 px-4 border-b">
                      {electicianDetails.data.electricianMobileNumber}
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm text-gray-600 border-b py-2 px-4">
                      Location:
                    </td>
                    <td className="text-sm text-gray-800 py-2 px-4 border-b">
                      {
                        electicianDetails.data?.electricianLocation
                          .electricianState
                      }
                      ,{" "}
                      {
                        electicianDetails.data.electricianLocation
                          ?.electricianLocality
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className="text-sm text-gray-600 border-b py-2 px-4">
                      Rating:
                    </td>
                    <td className="text-sm text-gray-800 py-2 px-4 border-b">
                      {electicianDetails.data.rating}/5
                    </td>
                  </tr>
                </tbody>
              </table>

              <p className="text-[16px] text-gray-700 mt-5 text-justify">
                {electicianDetails.data.electricianDescription}
              </p>
            </div>
          ) : (
            <div className="mt-[100px]">
              <h1 className="text-[30px] font-bold mb-2">
                {electicianDetails.data?.electricianName}
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
ElectricianSideBar.propTypes = {
  electicianDetails: PropTypes.shape({
    data: PropTypes.shape({
      electricianProfileImage: PropTypes.string,
      electricianIsVerified: PropTypes.bool,
      electricianName: PropTypes.string,
      electricianMobileNumber: PropTypes.string,
      electricianLocation: PropTypes.shape({
        electricianState: PropTypes.string,
        electricianLocality: PropTypes.string,
      }),
      electricianDescription: PropTypes.string,
    }),
  }),
};
export default ElectricianSideBar;
