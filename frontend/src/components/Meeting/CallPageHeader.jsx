import { IoPeopleSharp } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";

const CallPageHeader = () => {
  return (
    <div className="flex items-center gap-8 justify-between w-400 absolute top-4 right-4 bg-white rounded-lg border border-gray-300 shadow-md p-4">
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-blue-500 text-white">
          <IoPeopleSharp />
        </div>
      </div>

      <div className="flex items-center space-x-4 relative">
        <div className="p-3 rounded-full bg-indigo-500 text-white">
          <FaMessage />
        </div>
        <span className="absolute bg-green-500 w-3 h-3 border-2 border-white rounded-full top-2 right-2"></span>
      </div>

      <div className="flex items-center text-gray-600 text-sm">
        <div className="p-3 border-r border-solid border-gray-300">1 PM</div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-gray-700 text-white">
          <FaUserAlt />
        </div>
      </div>
    </div>
  );
};

export default CallPageHeader;
