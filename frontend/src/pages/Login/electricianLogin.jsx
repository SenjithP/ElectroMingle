import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/images/login.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useElectricianLoginMutation } from "../../slices/authApiSlice";
import { setElectricianCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";

const ElectricianLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [electricianLogin] = useElectricianLoginMutation();

  const { electricianInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (electricianInfo) {
      if (electricianInfo) {
        navigate("/electricianHome");
      }
    }
  }, [navigate, electricianInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const res = await electricianLogin({
        email,
        password,
      });
      if (res.data && res.data._id) {
        dispatch(setElectricianCredentials({ ...res.data }));

        toast.success("Login Successful", {
          position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
          style: { marginTop: "50px" }, // Set marginTop to 300px);
        });
        navigate("/electricianHome");
      } else {
        toast.error("Login failed. Please check your credentials.", {
          position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
          style: { marginTop: "50px" }, // Set marginTop to 300px);
        });
      }
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
        style: { marginTop: "50px" }, // Set marginTop to 300px);
      });
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <section className="px-5 bg-gradient-to-l from-blue-200 via-blue-100 to-blue-50 xl:px-0">
        <div className="max-w-[1170px] mx-auto ">
          <div className="rounded-lg m-10 md:p-10 md:shadow-md grid grid-cols-1 lg:grid-cols-2 ">
            <div className="lg:pt-[20px]  lg:block rounded-l-lg">
              <figure className="rounded-l-lg">
                <img
                  src={loginImg}
                  alt="register"
                  className="rounded-lg  w-full"
                />
              </figure>
            </div>

            <div className="rounded-l-lg py-5 text-center lg:pl-16">
              <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
                Login <span className="text-buttonColor">Now</span>
              </h3>
              <h6>
                You can login using{" "}
                <strong>Email:electrician@gmail.com, and password:Electrician@123</strong>
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
              <p className="mt-5 text-black text-center">
                Forgot Your Password?{" "}
                <Link
                  className="text-blue-500 font-medium ml-1"
                  to={"/electricianFP"}
                >
                  ClickHere
                </Link>
              </p>
              <p className="mt-5 text-black text-center">
                Don't have an account?{" "}
                <Link
                  className="text-blue-500 font-medium ml-1"
                  to={"/register"}
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ElectricianLogin;
