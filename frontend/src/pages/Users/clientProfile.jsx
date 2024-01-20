import moment from "moment";
import ClientHeader from "../../components/Header/clientHeader";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetClientDetailMutation,
  useUpdateClientProfileMutation,
} from "../../slices/clientsApiSlice";
import { toast } from "react-toastify";

const ClientProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [count, setCount] = useState(0);

  const [getClientDetail] = useGetClientDetailMutation();
  const [updateClientProfile] = useUpdateClientProfileMutation();

  const [clientDetail, setClientDetail] = useState([]);
  const [bookingCount, setBookingCount] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: null,
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, email, mobileNumber, password } = formData;
    console.log(formData);
    try {
      const res = await updateClientProfile({
        userId: userInfo._id,
        name,
        email,
        mobileNumber,
        password,
      });
      console.log(res.error, "ccdscv");

      if (res.data) {
        setFormData({
          name: "",
          email: "",
          password: "",
          mobileNumber: "",
        });
        setCount((prevCount) => prevCount + 1);
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT, 
          style: { marginTop: "50px" }, 
        });
      } else {
        toast.error(res.error.data.message, {
          position: toast.POSITION.TOP_RIGHT, 
          style: { marginTop: "50px" }, 
        });
      }
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_RIGHT, 
        style: { marginTop: "50px" }, 
      });
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getClientDetail({ id: userInfo._id });
        if (result.data.clientDetail) {
          setClientDetail(result.data.clientDetail);
        }
        if (result.data.bookingCount) {
          setBookingCount(result.data.bookingCount);
        }
      } catch (error) {
        console.error("Error fetching electricians:", error);
      }
    };

    fetchData();
  }, [count, getClientDetail]);

  return (
    <>
      <ClientHeader />

      <section className="px-5 bg-gradient-to-l from-blue-200 via-blue-100 to-blue-50 xl:px-0">
        <div className="max-w-[1170px] mx-auto ">
          <div className="rounded-lg m-10 md:p-10 md:shadow-md grid grid-cols-1 lg:grid-cols-2 ">
            <div className="flex mt-12 flex-wrap ">
              <div key={clientDetail._id} className="w-full  p-2 mt-3">
                <div className="rounded-lg max-w-full bg-white border border-gray-300 overflow-hidden">
                  <div className="p-4">
                    <table className="w-full">
                      <h1 className="text-center underline mb-8  ml-36 font-bold text-2xl">
                        Your <span className="text-buttonColor">Details</span>
                      </h1>
                      <tbody>
                        <tr className="border-b border-gray-300">
                          <td className="font-bold py-2"> Name</td>
                          <td className="py-2">{clientDetail.userName}</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="font-bold py-2"> Email</td>
                          <td className="py-2">{clientDetail.userEmail}</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="font-bold py-2"> Mobile Number</td>
                          <td className="py-2">
                            {clientDetail.userMobileNumber}
                          </td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="font-bold py-2"> Bookings Count</td>
                          <td className="py-2">{bookingCount}</td>
                        </tr>

                        <tr>
                          <td className="font-bold py-2">Joined Date</td>
                          <td className="py-2">
                            {moment(`${clientDetail.createdAt}`).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-l-lg py-5 text-center lg:pl-16">
              <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
                Update Your <span className="text-buttonColor">Profile</span>
              </h3>
              <form onSubmit={submitHandler}>
                <div className="">
                  <input
                    type="text"
                    placeholder="Change Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    placeholder="Change Your Mobile Number"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                </div>
                <div className="">
                  <input
                    type="email"
                    placeholder="Change Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    placeholder="Change Your Password if required"
                    name="password"
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
                    Update Profile
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

export default ClientProfile;
