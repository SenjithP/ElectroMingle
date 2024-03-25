import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { GrLocation } from "react-icons/gr";
import { FaPhoneVolume } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  useGetSingleElectriciansDataMutation,
  useElectricianBookingMutation,
} from "../../slices/clientsApiSlice";
// import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";
import ClientHeader from "../../components/Header/clientHeader";
import { useCreateChatMutation } from "../../slices/chatApiSlice";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';
const socket = io('https://www.electromingle.senjith.shop');

const ElectriciansBooking = () => {
  const [loading, setLoading] = useState(true);
  const [electricianDetails, setElectricianDetails] = useState([]);
  const id = location.pathname.split("/")[2];
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    clientId: userInfo._id,
    electricianId: id,
    clientName: "",
    clientEmail: "",
    clientMobileNumber: "",
    clientState: "",
    clientLocality: "",
    clientAddress: "",
    clientWorkDate: "",
    workDescription: "",
  });

  const [getSingleElectriciansData] = useGetSingleElectriciansDataMutation();
  const [electricianBooking] = useElectricianBookingMutation();
  const [createChat] = useCreateChatMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSingleElectriciansData({ id: id });

        if (result.data) {
          setElectricianDetails(result.data.electriciansList);
          setLoading(false);
        } else {
          console.error("Data not available");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching electricians:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [getSingleElectriciansData, id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const {
      clientId,
      electricianId,
      clientName,
      clientEmail,
      clientMobileNumber,
      clientState,
      clientLocality,
      clientAddress,
      clientWorkDate,
      workDescription,
    } = formData;
    try {
      await electricianBooking({
        clientId,
        electricianId,
        clientName,
        clientEmail,
        clientMobileNumber,
        clientState,
        clientLocality,
        clientAddress,
        clientWorkDate,
        workDescription,
      }).unwrap();

      socket.emit('new-booking', {
        clientId,
        electricianId,
        clientName,
        clientEmail,
        clientMobileNumber,
        clientState,
        clientLocality,
        clientAddress,
        clientWorkDate,
        workDescription,
      });


      setFormData({
        clientName: "",
        clientEmail: "",
        clientMobileNumber: "",
        clientState: "",
        clientLocality: "",
        clientAddress: "",
        clientWorkDate: "",
        workDescription: "",
      });

      toast.success("Booking Successful", {
        position: toast.POSITION.TOP_RIGHT,
        style: { marginTop: "50px" },
      });
    } catch (error) {
      toast.error(error.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        style: { marginTop: "50px" },
      });
      console.error(error);
    }
  };

  const handleChatWith = async (electricianId) => {
    try {
      let senderId = userInfo._id;
      let receiverId = electricianId;
      const result = await createChat({ senderId, receiverId }).unwrap();
      if (result) {
        navigate("/clientElectricianChat");
      } else {
        console.error("Error creating chat. No data returned:", result);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };


  return (
    <>
      <ClientHeader />
      {/*========banner========*/}
      <section className="userElectrician__section mt-[1px]  pt-[40px] 2xl:h-[500px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[700px]">
                <h1 className="pt-14 text-[30px] leading-[46px] text-white font-[400] font-custom md:text-[40px] md:leading-[70px]">
                  Meet the Expert Behind the Current: Your Trusted Electrical
                  Professional.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:mx-24 grid  grid-cols-1  md:grid-cols-2 gap-4">
        <div className="container col-span-1">
          <div className="rounded-lg py-5 text-center lg:pl-16 max-w-md mx-auto">
            <form onSubmit={submitHandler}>
              <div className="">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleInputChange}
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="">
                <input
                  type="number"
                  placeholder="Enter Your Mobile Number"
                  name="clientMobileNumber"
                  value={formData.clientMobileNumber}
                  onChange={handleInputChange}
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="Enter Your Address"
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="Enter Your Locality"
                  name="clientLocality"
                  value={formData.clientLocality}
                  onChange={handleInputChange}
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="Enter Your State"
                  name="clientState"
                  value={formData.clientState}
                  onChange={handleInputChange}
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="">
                <input
                  type="date"
                  placeholder="Enter Your Needed Date"
                  name="clientWorkDate"
                  value={formData.clientWorkDate}
                  onChange={handleInputChange}
                  className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  required
                />
              </div>
              <div className="">
                <textarea
                  placeholder="Enter Your work description"
                  name="workDescription"
                  value={formData.workDescription}
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
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="pb-8 flex items-center   justify-center flex-col col-span-1">
          <div className="container mx-auto">
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : electricianDetails.length > 0 ? (
              <div>
                {electricianDetails.map((electrician) => (
                  <Card
                    key={electrician.id}
                    className="p-3 mt-6 max-w-full md:max-w-[400px] lg:max-w-[500px] bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                  >
                    <CardHeader
                      color="blue-gray"
                      className="relative h-56 overflow-hidden rounded-t-lg"
                    >
                      <img
                        className="rounded-lg w-full h-full object-cover"
                        src={electrician.electricianProfileImage}
                        alt="card-image"
                      />
                    </CardHeader>
                    <CardBody>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex justify-between items-center m-3"
                      >
                        <span>{electrician.electricianName}</span>
                        <span>Rating: {electrician.rating}/5</span>
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex justify-between items-center m-3"
                      >
                        <span>
                          ₹ {electrician.electricianWage.electricianWagePerDay}{" "}
                          (Day)
                        </span>
                        <span className="flex gap-2 items-center first-letter">
                          <GrLocation />
                          {electrician.electricianLocation.electricianLocality},
                          {electrician.electricianLocation.electricianState}
                        </span>
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex justify-between items-center m-3"
                      >
                        <span>
                          ₹ {electrician.electricianWage.electricianWagePerHour}{" "}
                          (Hour)
                        </span>
                        <span className="flex gap-2 items-center first-letter">
                          <FaPhoneVolume />
                          {electrician.electricianMobileNumber}
                        </span>
                      </Typography>
                      <Typography className="text-justify">
                        {electrician.electricianDescription}
                      </Typography>
                    </CardBody>
                    <CardFooter className="flex gap-7 justify-center pt-5">
                      <Button
                        onClick={() => {
                          handleChatWith(electrician._id); // Pass the event object (e) here
                        }}
                        className="bg-buttonColor pl-3 pr-3"
                      >
                        Chat with
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div>No electricians found</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ElectriciansBooking;
