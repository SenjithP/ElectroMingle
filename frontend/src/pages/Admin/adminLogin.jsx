import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import admin from "../../assets/images/admin.png";
import { useDispatch, useSelector } from "react-redux";
import { setAdminCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { useAdminLoginMutation } from "../../slices/adminApiSlice";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminLogin] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.auth);
  console.log(adminInfo, "adminInfo");
  useEffect(() => {
    if (adminInfo) {
      navigate("/adminHome");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await adminLogin({
        email,
        password,
      });

      if (res.data && res.data._id) {
        dispatch(setAdminCredentials({ ...res.data }));

        navigate("/adminHome");
        toast.success("Login Successful....")
      } else {
        toast.error("Login failed. Please check your credentials")
      }
    } catch (error) {
      toast.error(error.data.message)
      console.log(error);
    }
  };

  return (
    <>
      <section className="px-5 xl:px-0 flex justify-center items-center h-screen">
        <div className="max-w-[1170px] mx-auto">
          <div className="rounded-lg m-10 md:p-10 md:shadow-md grid grid-cols-1 lg:grid-cols-2">
            <div className="lg:pt-[20px] lg:flex lg:items-center lg:justify-center rounded-l-lg">
              <div className="text-center">
                <figure className="rounded-l-lg">
                  <img
                    src={admin}
                    alt="register"
                    className="rounded-lg w-full"
                  />
                </figure>
              </div>
            </div>

            <div className="rounded-l-lg py-5 text-center lg:pl-16">
              <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
                Login <span className="text-buttonColor">Now</span>
              </h3>
              <h6>
                You can login using{" "}
                <strong>Email:admin@gmail.com, and password:Admin@123</strong>
              </h6>
              <form onSubmit={submitHandler}>
                <div className="">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full bg-buttonColor hover:bg-blue-600 text-white text-lg leading-7 rounded-lg px-4 py-3"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
