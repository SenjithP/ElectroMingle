import { Link } from "react-router-dom";
import PendingImage from "../../assets/images/pendingWorks.png";
import { FcAlarmClock } from "react-icons/fc";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { MdNotifications } from "react-icons/md";
import io from "socket.io-client";
const socket = io("https://www.electromingle.senjith.shop");

const UpcomingWorks = () => {
  const [count, setCount] = useState(0);

  const [bookingState, setBookingState] = useState(
    !!localStorage.getItem("bookingInfo")
  );

  const [paymentState, setPaymentState] = useState(
    !!localStorage.getItem("paymentInfo")
  );

  const [paymentDetails, setPaymentDetails] = useState();

  useEffect(() => {
    socket.on("notify-worker", (notificationData) => {
      localStorage.setItem(
        "bookingInfo",
        JSON.stringify(notificationData.bookingData)
      );
      setBookingState(true);
    });

    return () => {
      socket.off("notify-worker");
    };
  }, [count]);

  useEffect(() => {
    socket.on("notify-worker-payment", (notificationData) => {
      setPaymentDetails(notificationData.paymentData);

      localStorage.setItem(
        "paymentInfo",
        JSON.stringify(notificationData.paymentData)
      );
      setPaymentState(true);
    });
    return () => {
      socket.off("notify-worker-payment");
    };
  }, [count]);

  const handleClose = () => {
    localStorage.removeItem("bookingInfo");
    setBookingState(false);
    setCount((prevCount) => prevCount + 1);
  };

  const handleClosePayment = () => {
    localStorage.removeItem("paymentInfo");
    setPaymentState(false);
    setCount((prevCount) => prevCount + 1);
  };

  const [works, SetWorks] = useState(true);

  return (
    <div className="max-h-[610px] rounded-lg  scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-gray-300  overflow-y-auto p-3">
      <img
        className="h-[150px] mx-auto"
        src={PendingImage}
        alt="PendingImage"
      />

      <div className="flex  justify-center border-b-2 border-t-2 mt-5 border-gray-400 p-4 ">
        <div className="flex items-center space-x-5">
          <FcAlarmClock className="text-4xl text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800">ReminderRise</h1>
        </div>
      </div>

      {bookingState && (
        <div className="mt-5">
          <IoIosClose className="cursor-pointer" onClick={handleClose} />
          <div className="flex items-center animate-bounce justify-center gap-3">
            <h2 className="text-l font-semibold ">You Got A new Booking </h2>
            <MdNotifications className="text-red-600 animate-shake text-2xl" />
          </div>
          <Link to="/electricianSideScheduledWorks">
            <h4 onClick={handleClose} className="text-sm text-blue-500">
              {" "}
              Click To View..
            </h4>
          </Link>
        </div>
      )}

      {works && (
        <div className="mt-5">
          <IoIosClose
            className="cursor-pointer"
            onClick={() => SetWorks(false)}
          />
          <h2 className="text-l font-semibold">Your Upcoming Works</h2>
          <Link to="/electricianSideScheduledWorks">
            <h6 className="text-sm text-blue-500"> Click To View..</h6>
          </Link>
        </div>
      )}

      {paymentState && (
        <div className="mt-5">
          <IoIosClose className="cursor-pointer" onClick={handleClosePayment} />
          <h2 className="text-l font-semibold">
            Hurrayy!! Got One New Payment
          </h2>
          <Link to="/electricianSideCompletedWorks">
            <h4 onClick={handleClosePayment} className="text-sm text-blue-500">
              {" "}
              Click To View..
            </h4>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingWorks;
