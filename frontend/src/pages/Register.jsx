import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/register.jpg";
import { useState } from "react";
import { useRegisterMutation } from "../slices/authApiSlice";
import { toast } from "react-toastify";
import Header from "../components/Header/Header";
import OAuth from "../components/OAuth.jsx"

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    mobileNumber: "",
  });
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, role, password, mobileNumber } = formData;
    try {
      await register({
        name,
        email,
        role,
        password,
        mobileNumber,
      }).unwrap();
      toast.success("Successfully Registered",{
        position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
        style: { marginTop: "50px" }, // Set marginTop to 300px);
      })
      navigate("/");
    } catch (error) {
      toast.error(error.data.message,{
        position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
        style: { marginTop: "50px" }, // Set marginTop to 300px);
      })
      console.log(error);
    }
  };

  return (
    <>
    <Header />
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto ">
        <div className="rounded-lg m-10 md:p-10 md:shadow-md grid grid-cols-1 lg:grid-cols-2 ">
          <div className="lg:pt-[80px]  lg:block rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={registerImg}
                alt="register"
                className="rounded-lg w-full"
              />
            </figure>
          </div>

          <div className="rounded-l-lg py-5 text-center lg:pl-16">
            <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
              Create your <span className="text-buttonColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="client">Client</option>
                  <option value="electrician">Electrician</option>
                </select>
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="">
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email"
                  name="email"
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="">
                <input
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Your Password"
                  name="password"
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="">
                <input
                  type="number"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Your Mobile Number"
                  name="mobileNumber"
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full bg-buttonColor hover:bg-blue-600 text-white text-lg leading-7 rounded-lg px-4 py-3"
                >
                  Register
                </button>
              </div>
              <OAuth />
            </form>
            <p className="mt-5 text-black text-center">
              Already have an account?{" "}
              <Link className="text-blue-500 font-medium ml-1" to={"/login"}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Register;
