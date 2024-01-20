import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import forgotPassword from "../../assets/images/forgotPassword.png";
import {
  useElectricianFPMutation,
  useSendOtpToServerMutation,
} from "../../slices/authApiSlice";
import { toast } from "react-toastify";
import Header from "../../components/Header/Header";

const ElectricianFP = () => {
  const [verified, setVerified] = useState(false);
  const [typedOtp, setTypedOtp] = useState(0);
  const [countdown, setCountdown] = useState(15);
  const [disabled, setDisabled] = useState(false);
  const [sendOtpToServer] = useSendOtpToServerMutation();
  const [otpToEmail, sendOtpToEmail] = useState(null);
  const [otpSendToEmail, setOtpSendToEmail] = useState(false);

  const verifyOtp = async () => {
    if (otpToEmail == typedOtp) {
      setDisabled(true);
      setVerified(true);
    } else {
      toast.error("Please enter correct Otp");
    }
  };

  const sendOtp = async (e, email) => {
    e.preventDefault();
    if (formData.email) {
      setOtpSendToEmail(true);
      setDisabled(true);
    } else {
      toast.error("Please Provide Email");
    }
    const res = await sendOtpToServer({
      email: email,
    });
    if (res.data.message) {
      // Start the countdown

      setCountdown(15);
      const interval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);

      // Stop the countdown after 15 seconds
      setTimeout(() => {
        clearInterval(interval);
        setOtpSendToEmail(false);
        setDisabled(false); // Enable the button after the countdown
      }, 15000);
      toast.success(res.data.message, {
        position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
        style: { marginTop: "50px" }, // Set marginTop to 300px);
      });
      sendOtpToEmail(res.data.otp);
    } else if (res.data.error) {
      toast.error(res.data.error, {
        position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
        style: { marginTop: "50px" }, // Set marginTop to 300px);
      });
    }
  };

  useEffect(() => {
    // Reset countdown and enable button when it reaches 0
    if (countdown === 0) {
      setCountdown(15);
      setDisabled(false);
    }
  }, [countdown]);

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const [electricianFP] = useElectricianFPMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, newPassword } = formData;
    if (verified) {
      try {
        const res = await electricianFP({
          email,
          newPassword,
        });
        if (res.data) {
          toast.success("Password Changed Successfully", {
            position: toast.POSITION.TOP_RIGHT,
            style: { marginTop: "50px" },
          });
          navigate("/electrician_login");
        }
      } catch (error) {
        toast.error(error.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          style: { marginTop: "50px" },
        });
        console.log(error);
      }
    } else {
      toast.error("Do All procedures");
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
                  src={forgotPassword}
                  alt="register"
                  className="rounded-lg  w-full"
                />
              </figure>
            </div>

            <div className="rounded-l-lg py-5 text-center lg:pl-16">
              <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
                Forgot <span className="text-buttonColor">Password</span> ?
              </h3>

              <form onSubmit={submitHandler}>
                <div className="flex">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your Email"
                    name="email"
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                  {!verified && (
                    <div>
                      {otpSendToEmail ? (
                        <button
                          className="py-3 mt-2 px-5 w-[170px] bg-red-700 text-white text-lg leading-7 rounded-md flex items-center"
                          disabled={disabled}
                        >
                          Resend ({countdown})
                        </button>
                      ) : (
                        <button
                          onClick={(e) => sendOtp(e, formData.email)}
                          className="py-3 mt-2 px-2 w-[100px] bg-green-700 hover:bg-blue-600 text-white text-lg leading-7 rounded-md flex items-center"
                          disabled={disabled}
                        >
                          Send OTP
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* OTP */}
                <div className="flex">
                  <input
                    type="text"
                    value={formData.otp}
                    onChange={(e) => setTypedOtp(e.target.value)}
                    placeholder="Enter Otp provided to your email"
                    name="otp"
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                  {verified ? (
                    <button
                      className="py-3 mt-2 px-4 w-[110px] bg-green-700 text-white text-lg leading-7 rounded-md flex items-center"
                      disabled={disabled}
                    >
                      Verified
                    </button>
                  ) : (
                    <button
                      onClick={(e) => verifyOtp(e)}
                      className="py-3 mt-2 px-6 w-[110px]  bg-red-700 hover:bg-blue-600 text-white text-lg leading-7 rounded-md flex items-center"
                      disabled={disabled}
                    >
                      Verify
                    </button>
                  )}
                </div>
                {/* OTP */}
                <div className="">
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    name="newPassword"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                </div>
                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full bg-buttonColor hover:bg-blue-600 text-white text-lg leading-7 rounded-lg px-4 py-3"
                  >
                    Change Password
                  </button>
                </div>
              </form>
              <p className="mt-5 text-black text-center">
                Go back to login page?{" "}
                <Link
                  className="text-blue-500 font-medium ml-1"
                  to={"/electrician_login"}
                >
                  ClickHere
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ElectricianFP;
