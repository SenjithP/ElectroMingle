import React from "react";
import InputEmoji from "react-input-emoji";
import { FaMessage } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
const Messenger = () => {
  return (
    <div className="absolute top-2 right-0 bg-white h-[calc(100vh-80px)] w-96 flex flex-col border border-gray-300 rounded-lg shadow-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h3 className="font-semibold text-lg">Meeting Details</h3>
      </div>
      <div className="flex items-center border-b border-gray-300">
        <div className="tab flex items-center justify-center w-full text-gray-600 hover:text-gray-800 py-3 cursor-pointer">
          <IoPeople className="mr-2 text-lg" />
          <p className="text-sm">Participants (1)</p>
        </div>
        <div className="tab flex items-center justify-center w-full border-b-2 border-green-600 text-green-600 py-3 cursor-pointer">
          <FaMessage className="mr-2 text-lg" />
          <p className="text-sm">Chat</p>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-scroll">
        <div className="mb-4">
          <div className="flex items-center mb-1">
            <div className="font-semibold text-sm text-blue-500">
              You <small className="font-light ml-1">10 PM</small>
            </div>
          </div>
          <p className="text-gray-700 text-sm">Here comes an actual message.</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 border-t border-gray-300 text-gray-700">
        <InputEmoji
          className="p-2 border border-gray-400 rounded-md outline-none w-3/4"
          type="text"
          placeholder="Send a message to everyone"
        />
        <button className="flex items-center justify-center bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
          <IoIosSend className="text-lg" />
        </button>
      </div>
    </div>
  );   
};

export default Messenger;
