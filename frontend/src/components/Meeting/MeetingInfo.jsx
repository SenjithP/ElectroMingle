import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaUser, FaCopy, FaShieldAlt } from "react-icons/fa";
const MeetingInfo = ({setMeetingInfoPopup,url}) => {

  return (
    <div className="meeting-info-block absolute top-4 left-4 bg-white rounded-lg shadow-md p-6 w-72">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Your Meeting is Ready
        </h3>
        <IoCloseSharp onClick={()=>{
          setMeetingInfoPopup(false)
        }} className="icon cursor-pointer text-gray-500" />
      </div>
      <button className="add-people-btn flex items-center justify-center bg-teal-500 text-white text-sm py-2 px-4 rounded focus:outline-none hover:bg-teal-600 transition duration-300">
        <FaUser className="icon text-xs mr-2" />
        Add Others
      </button>
      <p className="info-text text-gray-600 text-sm mt-4">
        Share this meeting link with others you want in the meeting
      </p>
      <div className="meet-link bg-gray-100 p-3 rounded mt-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 flex-1 truncate">
          {url}
        </span>
        <FaCopy onClick={()=>navigator.clipboard.writeText(url)} className="icon cursor-pointer text-gray-500" />
      </div>
      <div className="permission-text flex items-center justify-center mt-4">
        <FaShieldAlt className="icon text-blue-500 text-lg mr-2" />
        <p className="small-text text-gray-600 text-xs">
          People who use this meeting link must get your permission before they
          can join.
        </p>
      </div>
      <p className="small-text text-gray-600 text-xs mt-2 text-center mb-4">
        Joined as sen@gmail.com
      </p>
    </div>
  );
};

export default MeetingInfo;
