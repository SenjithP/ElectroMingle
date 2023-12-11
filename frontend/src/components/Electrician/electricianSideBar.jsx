import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import coverPhoto from "../../assets/images/coverPhoto.png";
import profilePhoto from "../../assets/images/elecProfile.jpg";
import { LuCalendarClock } from "react-icons/lu";
import { VscFileMedia } from "react-icons/vsc";
import { TiMessages } from "react-icons/ti";
import { GrSchedules } from "react-icons/gr";
import { MdJoinInner } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const ElectricianSideBar = () => {
  const location = useLocation();

  const sideBarItems = useMemo(
    () => [
      { text: "FEEDS", letterIcons: LuCalendarClock, path: "/electricianHome" },
      { text: "YOUR POSTS", letterIcons: VscFileMedia, path: "/yourPosts" },
      {
        text: "SCHEDULES",
        letterIcons: GrSchedules,
        path: "/electricianSideScheduledWorks",
      },
      { text: "MEETING", letterIcons: MdJoinInner, path: "/meeting" },
      { text: "MESSAGES", letterIcons: TiMessages, path: "/messages" },
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
          <img
            src={profilePhoto}
            alt="Profile Photo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="max-h-400px bg-blue-50 p-4">
          <div className="mt-[100px]">
            <h1 className="text-[30px] font-bold mb-2">Robert</h1>
            <div className="flex justify-around">
              <h3 className="text-[20px] text-gray-800 mb-2">9074005258</h3>
              <h3 className="text-[20px] text-gray-800 mb-2">
                Thrissur, Kerala
              </h3>
            </div>
            <p className="text-[16px] text-gray-700 text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
              assumenda facere culpa quaerat! Velit sunt excepturi, quibusdam
              dolores blanditiis ad esse eius reprehenderit a harum, maxime id
              cupiditate cum sed?
            </p>
          </div>
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
