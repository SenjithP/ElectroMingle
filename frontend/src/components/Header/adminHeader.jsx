import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdminLogoutMutation } from "../../slices/adminApiSlice";
import { adminLogout } from "../../slices/authSlice";

const AdminHeader = () => {
  const { adminInfo } = useSelector((state) => state.auth);
  const [adminLogoutApiCall] = useAdminLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      if (adminInfo) {
        await adminLogoutApiCall().unwrap();
        dispatch(adminLogout());
        toast.success("Logout Successful");
        navigate("/admin_login");
      }
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };
  return (
    <div className="flex gap-60 ">
      <h1 className="text-lg font-medium ">
        Empowering connections, sparking excellence in the electrician community
        journey.
      </h1>

      <button
        onClick={()=>logoutHandler()}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700"
      >
        LOGOUT
        <FaLocationArrow className="ml-2" />
      </button>
    </div>
  );
};

export default AdminHeader;
