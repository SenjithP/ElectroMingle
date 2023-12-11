import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar.jsx";
import ElectricianHeader from "../../components/Header/electricianHeader.jsx";
import {
  useChangeWorkStatusMutation,
  useGetClientScheduledWorksMutation,
} from "../../slices/electriciansApiSlice.js";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ElectricianSideScheduledWorksScreen = () => {
  const [loading, setLoading] = useState(true);
  const [scheduledWorks, setScheduledWorks] = useState([]);
  const [getClientScheduledWorks] = useGetClientScheduledWorksMutation();
  const [changeWorkStatus] = useChangeWorkStatusMutation();
  const [count, setCount] = useState(0);

  console.log(scheduledWorks.length);

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
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching electricians:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [getClientScheduledWorks, count]);

  return (
    <>
      <ElectricianHeader />
      <section className="max-h-halfscreen  flex flex-col md:flex-row">
        {/* First part - 25% on small screens, 50% on medium screens and above */}
        <ElectricianSideBar />
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
                  {scheduledWorks.map((client) => (
                    <Card
                      key={client.id}
                      className="p-3 mt-6 max-w-full md:max-w-[400px] lg:max-w-[300px]"
                    >
                      <CardHeader color="blue-gray" className="relative h-56">
                        <img
                          className="rounded-lg w-full h-full object-cover"
                          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                          alt="card-image"
                        />
                      </CardHeader>
                      <CardBody>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="flex justify-between items-center m-3"
                        >
                          <span>Client Name</span>
                          <span>{client.clientName}</span>
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="flex justify-between items-center m-3"
                        >
                          <span>Your Name</span>
                          <span>{client.electricianId.electricianName}</span>
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="flex justify-between items-center m-3"
                        >
                          <span>Client Address</span>
                          <span className="text-right">
                            {client.clientAddress},<br />
                            {client.clientLocality},<br />
                            {client.clientState}
                          </span>
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="flex justify-between items-center m-3"
                        >
                          <span>Client Contact</span>
                          <span>{client.clientMobileNumber}</span>
                        </Typography>
                        <Typography
                          variant="h5"
                          color="blue-gray"
                          className="flex justify-between items-center m-3"
                        >
                          <span>Work Date</span>
                          <span>{client.clientWorkDate}</span>
                        </Typography>
                      </CardBody>
                      <CardFooter className="flex gap-7 justify-center pt-5">
                        {client.workCompletedStatus === "PaymentSuccess" && (
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

                        {client.workCompletedStatus === "RequestedPayment" && (
                          <Button className="bg-yellow-700 pl-3 pr-3">
                            ₹{client.workPaymentAmount} Payment Requested
                          </Button>
                        )}
                        {client.workCompletedStatus !== "RequestedPayment" && (
                          <>
                            {client.workCompletedStatus !== "Cancelled" && (
                              <>
                                {client.workCompletedStatus === "Requested" && (
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

                                {client.workCompletedStatus === "Accepted" && (
                                  <>
                                    <Button className="bg-green-800 pl-3 pr-3">
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
                              </>
                            )}
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full m-16 text-3xl">
                  No Scheduled Works found
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Third part - 25% on small screens, 25% on medium screens and above */}
        <div className="hidden lg:block lg:w-1/4 rounded-r-lg py-5 m-5 md:shadow-md text-center">
          <div className={"flex flex-col items-center justify-center"}>
            <div className={"text-center mb-4"}>
              <h1>TO DO</h1>
              <p>Stay organized with Todo</p>
            </div>
            <ul className={"list-disc p-4 rounded-md shadow-sm"}>
              <li className={"flex items-center justify-between"}>
                <p>Check Schedules</p>
                <input
                  type="checkbox"
                  // checked={checked}
                  // onChange={handleCheckboxChange}
                  className={"ml-2"}
                />
              </li>
              <li className={"flex items-center justify-between"}>
                <p>Add</p>
                <input
                  type="checkbox"
                  checked={false}
                  // onChange={handleCheckboxChange}
                  className={"ml-2"}
                />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ElectricianSideScheduledWorksScreen;
