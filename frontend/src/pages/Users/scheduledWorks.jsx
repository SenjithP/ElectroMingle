import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useGetScheduledWorksMutation } from "../../slices/clientsApiSlice";
import ClientHeader from "../../components/Header/clientHeader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { useChangeWorkStatusMutation } from "../../slices/electriciansApiSlice";
import moment from "moment";
import io from "socket.io-client";
const socket = io("https://www.electromingle.senjith.shop");

const ScheduledWorks = () => {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [scheduledWorks, setScheduledWorks] = useState([]);
  const [getScheduledWorks] = useGetScheduledWorksMutation();
  const [changeWorkStatus] = useChangeWorkStatusMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [workDetails, setWorkDetails] = useState([]);

  const handleSubmitEvent = async (
    bookingId,
    status,
    showModal,
    cancelledBy
  ) => {
    try {
      let reason;

      if (showModal === "cancelling") {
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
        toast.success("Status Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          style: { marginTop: "50px" },
        });
        return;
      }

      if (reason !== undefined) {
        await changeWorkStatus({
          bookingId,
          status,
          reason,
          cancelledBy,
        }).unwrap();
        setCount((prevCount) => prevCount + 1);
        toast.success("Status Updated Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          style: { marginTop: "50px" },
        });
      } else {
        toast.warning("Reason Amount cannot be empty", {
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

  const handlePayment = async (amount, electricianName, id) => {
    try {
    
      const res = await fetch("https://www.electromingle.senjith.shop/api/client/makePayment", {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({
          amount: amount,
          electricianName: electricianName,
          id: id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          console.log("error");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  useEffect(() => {
    const hasSessionId = location.search.includes("session_id=");

    if (location.pathname === "/clientScheduledWorks" && hasSessionId) {
      Swal.fire({
        title: "Payment Successful",
        icon: "success",
        html: "Thank you for your successful payment! I appreciate your consideration and it was a pleasure working with you. Your cooperation has been greatly valued. Thank you once again!", // Add your description here
        showCancelButton: true,
        confirmButtonText: "OK",
        preConfirm: () => {
          fetch("https://www.electromingle.senjith.shop/api/client/updateWorkStatus", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        },
      }).then((result) => {
        socket.emit("new-payment", {});
        if (result.isConfirmed) {
          
          setCount((prevCount) => prevCount + 1);
          Swal.close();
        }
      });

      navigate("/clientScheduledWorks");
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getScheduledWorks();
       
        if (result.data) {
          setScheduledWorks(result.data.scheduledWorks);
          setWorkDetails(result.data.scheduledWorks);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching electricians:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [getScheduledWorks,currentPage, count]);

  const totalPages = Math.ceil(workDetails.length / pageSize);
  const visibleWorks = workDetails.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <ClientHeader />
      {/*========banner========*/}
      <section className="userElectrician__section mt-[1px] pt-[40px] 2xl:h-[500px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[700px]">
                <h1 className="pt-14 text-[30px] leading-[46px] text-white font-[400] font-custom md:text-[40px] md:leading-[70px]">
                  Your Electrical Projects on the Horizon: Stay In Control and
                  On Schedule.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" bg-gradient-to-l from-gray-100 to-gray-200 flex justify-center text-center">
        <h1 className="font-[800] text-[30px] text-black mt-10 underline">
          YOUR SCHEDULED WORKS
        </h1>
      </section>

      <section className="bg-gradient-to-l from-gray-100 to-gray-200 pb-8 flex items-center justify-center">
        <div className=" container mx-auto">
          <div className=" flex flex-col items-center">
            {loading ? (
              // Loading animation (you can replace this with your preferred loading component)
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : scheduledWorks.length > 0 ? (
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-12 md:gap-8 ">
                {visibleWorks.map(
                  (electrician) =>
                    electrician.workCompletedStatus !== "PaymentSuccess" && (
                      <Card
                        key={electrician.id}
                        className="p-3 rounded-lg mt-6 max-w-full md:max-w-[400px] lg:max-w-[300px]"
                      >
                        <CardHeader color="blue-gray" className="relative h-56">
                          <img
                            className="rounded-lg w-full h-full object-cover"
                            src={
                              electrician.electricianId.electricianProfileImage
                            }
                            alt="card-image"
                          />
                        </CardHeader>
                        <CardBody>
                          <table className="w-full">
                            <tbody>
                              <tr className="border-b border-gray-300">
                                <td className="font-bold py-2">Electrician </td>
                                <td className="py-2">
                                  {electrician.electricianId.electricianName}
                                </td>
                              </tr>
                              <tr className="border-b border-gray-300">
                                <td className="font-bold py-2">Your Name</td>
                                <td className="py-2">
                                  {electrician.clientName}
                                </td>
                              </tr>
                              <tr className="border-b border-gray-300">
                                <td className="font-bold py-2">Your Address</td>
                                <td className="py-2">
                                  {" "}
                                  {electrician.clientAddress},<br />
                                  {electrician.clientLocality},<br />
                                  {electrician.clientState}
                                </td>
                              </tr>
                              <tr className="border-b border-gray-300">
                                <td className="font-bold py-2">Your Contact</td>
                                <td className="py-2">
                                  {electrician.clientMobileNumber}
                                </td>
                              </tr>
                              <tr className="border-b border-gray-300">
                                <td className="font-bold py-2">Work Date</td>
                                <td className="py-2">
                                  {moment(
                                    `${electrician.clientWorkDate}`
                                  ).format("DD-MM-YYYY")}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </CardBody>
                        <CardFooter className="flex gap-7 justify-center pt-5">
                          {electrician.workCompletedStatus ===
                            "PaymentSuccess" && (
                            <Button className="bg-green-900 pl-3 pr-3">
                              Payment Successful
                            </Button>
                          )}

                          {electrician.workCompletedStatus === "Cancelled" && (
                            <div style={{ display: "block" }}>
                              <Button className="bg-red-700 pl-3 mt-3 mb-3 pr-3">
                                Work Cancelled By {electrician.workCancelledBy}
                              </Button>
                              <p>
                                <strong> Cancelled Reason:</strong> <br />{" "}
                                {electrician.workCancelingReason}
                              </p>
                            </div>
                          )}

                          {electrician.workCompletedStatus === "Requested" && (
                            <Button className="bg-red-700 pl-3 pr-3">
                              Pending
                            </Button>
                          )}

                          {electrician.workCompletedStatus ===
                            "RequestedPayment" && (
                            <>
                              <Button
                                onClick={() =>
                                  handlePayment(
                                    electrician.workPaymentAmount,
                                    electrician.clientName,
                                    electrician._id
                                  )
                                }
                                className="bg-green-700 pl-3 pr-3"
                              >
                                Pay ₹ {electrician.workPaymentAmount}
                              </Button>
                            </>
                          )}

                          {/* Display "Cancel" button only if the status is not "PaymentSuccess" */}
                          {electrician.workCompletedStatus !==
                            "RequestedPayment" &&
                            electrician.workCompletedStatus !== "Cancelled" &&
                            electrician.workCompletedStatus !==
                              "PaymentSuccess" && (
                              <Button
                                onClick={() =>
                                  handleSubmitEvent(
                                    electrician._id,
                                    "cancel",
                                    "cancelling",
                                    "Client"
                                  )
                                }
                                className="bg-buttonColor pl-3 pr-3"
                              >
                                Cancel
                              </Button>
                            )}
                        </CardFooter>
                      </Card>
                    )
                )}
              </div>
            ) : (
              <div>No Scheduled Works found</div>
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
                        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
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
      </section>
    </>
  );
};

export default ScheduledWorks;
