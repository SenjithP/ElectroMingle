import React from "react";
import { IoIosArrowUp, IoMdCall } from "react-icons/io";
import {
  FaMicrophoneAlt,
  FaVideo,
  FaClosedCaptioning,
  FaDesktop,
} from "react-icons/fa";
const CallPageFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-4">
          <div className="hover:bg-gray-200 cursor-pointer p-2 flex items-center">
            <span className="mr-2">Meeting details</span>
            <IoIosArrowUp className="text-base" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 flex-1 justify-center">
          <div className="icon-block bg-white border border-gray-300 rounded-full p-2 hover:shadow-md cursor-pointer">
            <FaMicrophoneAlt className="text-base text-gray-500" />
          </div>
          <div className="icon-block bg-white border border-gray-300 rounded-full p-2 hover:shadow-md cursor-pointer">
            <FaVideo className="text-base text-gray-500" />
          </div>
          <div className="icon-block bg-white border border-gray-300 rounded-full p-2 hover:shadow-md cursor-pointer">
            <IoMdCall className="text-base text-gray-500" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="icon-block flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer">
            <FaClosedCaptioning className="text-base text-red-500" />
            <p className="text-xs">Turn on captions</p>
          </div>
          <div className="icon-block flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer">
            <FaDesktop className="text-base text-red-500" />
            <p className="text-xs">Present Now</p>
          </div>
        </div>
      </div>
    </div>
  );
};





export default CallPageFooter;
