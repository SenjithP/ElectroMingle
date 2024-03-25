import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar.jsx";
import ElectricianHeader from "../../components/Header/electricianHeader.jsx";
import {
  useChangeWorkStatusMutation,
  useGetClientScheduledWorksMutation,
  useGetElecticianDetailsMutation,
} from "../../slices/electriciansApiSlice.js";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import moment from "moment";
import UpcomingWorks from "../../components/Electrician/upcomingWorks.jsx";
import io from "socket.io-client";
const socket = io("https://www.electromingle.senjith.shop");

const ElectricianSideScheduledWorksScreen = () => {
  const { electricianInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [scheduledWorks, setScheduledWorks] = useState([]);
  const [getClientScheduledWorks] = useGetClientScheduledWorksMutation();
  const [getElecticianDetails] = useGetElecticianDetailsMutation();
  const [changeWorkStatus] = useChangeWorkStatusMutation();
  const [count, setCount] = useState(0);
  const [electicianDetails, setElecticianDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [electricianWorkDetails, setElectricianWorkDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const electricianDetail = await getElecticianDetails({
          id: electricianInfo._id,
        });
        if (electricianDetail.data) {
          setElecticianDetails(electricianDetail.data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, [count, getElecticianDetails]);

  const handleSubmitEvent = async (
    bookingId,
    status,
    showModal,
    cancelledBy
  ) => {
    try {
      let payAmount;
      let reason;

      if (showModal === "payment") {
        const { value, dismiss } = await Swal.fire({
          title: "Enter Payment Amount",
          input: "text",
          showCancelButton: true,
          confirmButtonText: "Submit",
          cancelButtonText: "Close",
          preConfirm: (enteredAmount) => {
            if (!enteredAmount.trim()) {
              Swal.showValidationMessage("Payment Amount cannot be empty");
            }
          },
        });

        if (dismiss) {
          toast.warning("Payment Amount Update Cancelled", {
            position: toast.POSITION.TOP_RIGHT,
            style: { marginTop: "50px" },
          });
          return;
        }

        payAmount = value;
      } else if (showModal === "cancelling") {
        const { value: enteredReason, dismiss } = await Swal.fire({
          title: "Enter Reason",
          input: "text",
          showCancelButton: true,
          confirmButtonText: "Submit",
          cancelButtonText: "Close",
          preConfirm: (enteredReason) => {
            if (!enteredReason.trim()) {
              Swal.showValidationMessage("Reason cannot be empty");
            }
          },
        });

        if (dismiss) {
          toast.warning("Status Update Cancelled", {
            position: toast.POSITION.TOP_RIGHT,
            style: { marginTop: "50px" },
          });
          return;
        }

        reason = enteredReason;
      } else {
        // Handle the case where modal is not needed (e.g., for another button)
        await changeWorkStatus({
          bookingId,
          status,
        }).unwrap();
        setCount((prevCount) => prevCount + 1);
        socket.emit("booking-status", {});
        toast.success("Status Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          style: { marginTop: "50px" },
        });
        return;
      }

      if (reason !== undefined || payAmount !== undefined) {
        await changeWorkStatus({
          bookingId,
          status,
          reason,
          payAmount,
          cancelledBy,
        }).unwrap();
        setCount((prevCount) => prevCount + 1);
        socket.emit("booking-status", {});
        toast.success("Status Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          style: { marginTop: "50px" },
        });
      } else {
        toast.warning("Reason or Payment Amount cannot be empty", {
          position: toast.POSITION.TOP_RIGHT,
          style: { marginTop: "50px" },
        });
      }
    } catch (error) {
      toast.error(error.data.message, {
        position: toast.POSITION.TOP_RIGHT,
        style: { marginTop: "50px" },
      });
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getClientScheduledWorks();
        if (result.data) {
          setScheduledWorks(result.data.scheduledWorks);
          setElectricianWorkDetails(result.data.scheduledWorks);
          setLoading(false);
        } else if (result.error) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching electricians:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [getClientScheduledWorks, currentPage, count]);

  const totalPages = Math.ceil(electricianWorkDetails.length / pageSize);
  const visibleElectricianWorks = electricianWorkDetails.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <ElectricianHeader electicianDetails={electicianDetails} />
      <section className="max-h-halfscreen bg-gradient-to-l from-blue-200 via-blue-100 to-blue-50 flex flex-col md:flex-row">
        {/* First part - 25% on small screens, 50% on medium screens and above */}
        <ElectricianSideBar electicianDetails={electicianDetails} />
        {/* Second part - 50% on small screens, 50% on medium screens and above */}

        <div className="md:w-1/10 lg:w-1/2 text-center m-5 max-h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-white-300 ">
          <div className="bg-white p-3 md:shadow-md rounded-lg">
            <div className="text-4xl font-extrabold mt-10 underline">
              MY WORKS
            </div>

            <div className="flex">
              {loading ? (
                // Loading animation (you can replace this with your preferred loading component)
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : scheduledWorks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 lg:gap-12 md:gap-8">
                  {visibleElectricianWorks.map(
                    (client) =>
                      client.workCompletedStatus !== "PaymentSuccess" &&
                      client.workCompletedStatus !== "RequestedPayment" && (
                        <Card
                          key={client.id}
                          className="p-3 mt-6 max-w-full md:max-w-[400px] lg:max-w-[300px]"
                        >
                          <CardHeader
                            color="blue-gray"
                            className="relative h-56"
                          >
                            <img
                              className="rounded-lg w-full h-full object-cover"
                              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                              alt="card-image"
                            />
                          </CardHeader>
                          <CardBody>
                            <table className="w-full">
                              <tbody>
                                <tr className="border-b border-gray-300">
                                  <td className="font-bold py-2">
                                    Client Name{" "}
                                  </td>
                                  <td className="py-2">{client.clientName}</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                  <td className="font-bold py-2">Your Name</td>
                                  <td className="py-2">
                                    {client.electricianId.electricianName}
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                  <td className="font-bold py-2">
                                    Client Address
                                  </td>
                                  <td className="py-2">
                                    {client.clientAddress},<br />
                                    {client.clientLocality},<br />
                                    {client.clientState}
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                  <td className="font-bold py-2">
                                    Client Contact
                                  </td>
                                  <td className="py-2">
                                    {client.clientMobileNumber}
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                  <td className="font-bold py-2">Work Date</td>
                                  <td className="py-2">
                                    {moment(`${client.clientWorkDate}`).format(
                                      "DD-MM-YYYY"
                                    )}
                                  </td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                  <td className="font-bold py-2">
                                    Client Contact
                                  </td>
                                  <td className="py-2">
                                    {client.clientMobileNumber}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </CardBody>
                          <CardFooter className="flex gap-7 justify-center pt-5">
                            {client.workCompletedStatus ===
                              "PaymentSuccess" && (
                              <Button className="bg-green-700 pl-3 pr-3">
                                Payment Successfull
                              </Button>
                            )}

                            {client.workCompletedStatus === "Cancelled" && (
                              <div style={{ display: "block" }}>
                                <Button className="bg-red-700 pl-3 mt-3 mb-3 pr-3">
                                  Work Cancelled By {client.workCancelledBy}
                                </Button>
                                <p>
                                  <strong> Cancelled Reason:</strong> <br />{" "}
                                  {client.workCancelingReason}
                                </p>
                              </div>
                            )}

                            {client.workCompletedStatus ===
                              "RequestedPayment" && (
                              <Button className="bg-yellow-700 pl-3 pr-3">
                                ₹{client.workPaymentAmount} Payment Requested
                              </Button>
                            )}
                            {client.workCompletedStatus !==
                              "RequestedPayment" && (
                              <>
                                {client.workCompletedStatus !== "Cancelled" && (
                                  <>
                                    {client.workCompletedStatus ===
                                      "Requested" && (
                                      <Button
                                        onClick={() =>
                                          handleSubmitEvent(
                                            client._id,
                                            "accept",
                                            false
                                          )
                                        }
                                        className="bg-green-800 pl-3 pr-3"
                                      >
                                        Accept
                                      </Button>
                                    )}
                                    <div className="flex gap-3">
                                      {client.workCompletedStatus ===
                                        "Accepted" && (
                                        <>
                                          <Button className="bg-green-800 pl-3 pr-3" disabled>
                                            Accepted
                                          </Button>
                                          <Button
                                            onClick={() =>
                                              handleSubmitEvent(
                                                client._id,
                                                "paid",
                                                "payment"
                                              )
                                            }
                                            className="bg-blue-800 pl-3 pr-3"
                                          >
                                            Payment
                                          </Button>
                                        </>
                                      )}

                                      {client.workCompletedStatus !==
                                        "PaymentSuccess" && (
                                        <Button
                                          onClick={() =>
                                            handleSubmitEvent(
                                              client._id,
                                              "cancel",
                                              "cancelling",
                                              "Electrician"
                                            )
                                          }
                                          className="bg-buttonColor pl-3 pr-3"
                                        >
                                          Cancel
                                        </Button>
                                      )}
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          </CardFooter>
                        </Card>
                      )
                  )}
                </div>
              ) : (
                <div className="w-full h-full m-16 text-3xl">
                  No Scheduled Works found
                </div>
              )}
            </div>
            <div>
              {totalPages > 1 && (
                <nav
                  className="flex justify-center my-3"
                  aria-label="Page navigation example"
                >
                  <ul className="inline-flex -space-x-px text-base h-10">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentPage((prevPage) =>
                            Math.max(prevPage - 1, 1)
                          )
                        }
                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-l-md hover:bg-blue-50 hover:text-blue-500"
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <li key={page}>
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-50 hover:text-blue-500 ${
                              page === currentPage
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:text-white"
                                : ""
                            }`}
                          >
                            {page}
                          </button>
                        </li>
                      )
                    )}
                    <li>
                      <button
                        onClick={() =>
                          setCurrentPage((prevPage) =>
                            Math.min(prevPage + 1, totalPages)
                          )
                        }
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-blue-50 hover:text-blue-500"
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
        {/* Third part - 25% on small screens, 25% on medium screens and above */}
        <div className="hidden lg:block lg:w-1/4 rounded-r-lg  bg-blue-50 m-5 md:shadow-md text-center">
          <div className={"flex flex-col items-center justify-center"}>
            <UpcomingWorks />
          </div>
        </div>
      </section>
    </>
  );
};

export default ElectricianSideScheduledWorksScreen;
