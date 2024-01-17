import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar.jsx";
import ElectricianHeader from "../../components/Header/electricianHeader.jsx";
import {
  useGetClientScheduledWorksMutation,
  useGetElecticianDetailsMutation,
} from "../../slices/electriciansApiSlice.js";
import { useSelector } from "react-redux";
import moment from "moment";
import UpcomingWorks from "../../components/Electrician/upcomingWorks.jsx";

const CompletedWorksElectricianSide = () => {
  const { electricianInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [scheduledWorks, setScheduledWorks] = useState([]);
  const [getClientScheduledWorks] = useGetClientScheduledWorksMutation();
  const [getElecticianDetails] = useGetElecticianDetailsMutation();
  const [electicianDetails, setElecticianDetails] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchName, setSearchName] = useState("");

  // Function to handle start date change
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  // Function to handle end date change
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  // Function to handle name search input change
  const handleNameSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  // Filter works based on the date range and name
  const   filteredWorks = scheduledWorks.filter((client) => {
    const workDate = moment(client.clientWorkDate);
    const isAfterStartDate =
      startDate === "" || workDate.isSameOrAfter(startDate, "day");
    const isBeforeEndDate =
      endDate === "" || workDate.isSameOrBefore(endDate, "day");
    const matchesName =
      !searchName ||
      client.clientName.toLowerCase().includes(searchName.toLowerCase());

    return isAfterStartDate && isBeforeEndDate && matchesName;
  });

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
  }, [getElecticianDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getClientScheduledWorks();
        if (result.data) {
          setScheduledWorks(result.data.scheduledWorks);
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
  }, [getClientScheduledWorks]);

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
              COMPLETED WORKS
            </div>

            <div className="my-4 flex gap-5 items-center border rounded-md p-4 shadow-md">
              <div className="mb-4">
                <label
                  htmlFor="startDate"
                  className="text-gray-600 font-semibold"
                >
                  Start Date:
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="w-full p-2 border mt-1 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="text-gray-600 font-semibold"
                >
                  End Date:
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="w-full p-2 border mt-1 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="searchName"
                  className="text-gray-600 font-semibold"
                >
                  Search by Name:
                </label>
                <input
                  id="searchName"
                  type="text"
                  value={searchName}
                  onChange={handleNameSearchChange}
                  placeholder="Enter name"
                  className="w-full p-2 border mt-1 rounded-md"
                />
              </div>
            </div>

            <div className="flex justify-center">
              {loading ? (
                // Loading animation (you can replace this with your preferred loading component)
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : filteredWorks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5 lg:gap-12 md:gap-8">
                  {filteredWorks.map((client) => (
                    <>
                      {(client.workCompletedStatus === "PaymentSuccess" ||
                        client.workCompletedStatus === "RequestedPayment") && (
                        <Card
                          key={client.id}
                          className="p-3 mt-6 bg-red-50 ring ring-gray-300 ring-opacity-50 max-w-full md:max-w-[400px] lg:max-w-[300px]"
                        >
                          <CardBody>
                            <table className="w-full">
                              <tbody>
                                <tr className="border-b border-gray-300">
                                  <td className="font-bold py-2">
                                    Client Name
                                  </td>
                                  <td className="py-2">{client.clientName}</td>
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
                                  <td className="font-bold py-2">
                                    Client Address
                                  </td>
                                  <td className="py-2">
                                    {client.clientAddress},
                                    <br />
                                    {client.clientLocality}
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
                              </tbody>
                            </table>
                          </CardBody>
                          <CardFooter className="flex gap-7 justify-center pt-5">
                            {client.workCompletedStatus ===
                              "PaymentSuccess" && (
                              <>
                                Payment of ₹ {client.workPaymentAmount}{" "}
                                Completed
                              </>
                            )}
                            {client.workCompletedStatus ===
                              "RequestedPayment" && (
                              <>
                                Payment Requested: ₹ {client.workPaymentAmount}
                              </>
                            )}
                          </CardFooter>
                        </Card>
                      )}
                    </>
                  ))}
                </div>
              ) : (
                <div className="w-full h-full m-16 text-3xl">
                  No Completed Works found
                </div>
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

export default CompletedWorksElectricianSide;
