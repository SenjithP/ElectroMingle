import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useGetScheduledWorksMutation } from "../../slices/clientsApiSlice";
import ClientHeader from "../../components/Header/clientHeader";
import moment from "moment";

const CompletedWorks = () => {
  const [loading, setLoading] = useState(true);
  const [completedWorks, setCompletedWorks] = useState([]);
  const [getScheduledWorks] = useGetScheduledWorksMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [completedWorkDetails, setCompletedWorkDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getScheduledWorks();
        if (result.data) {
          setCompletedWorks(result.data.scheduledWorks);
          setCompletedWorkDetails(result.data.scheduledWorks);

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching electricians:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [getScheduledWorks,currentPage]);

  const totalPages = Math.ceil(completedWorkDetails.length / pageSize);
  const visibleCompletedWorks = completedWorkDetails.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <>
      <ClientHeader />
      <section  className="bg-cover bg-[url('https://www.piinacle.com.sg/wp-content/uploads/2017/09/cables-banner-image.jpg')] mt-[1px] pt-[40px] 2xl:h-[500px]">
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
      <section className="bg-gradient-to-l  from-gray-100 to-gray-200 flex justify-center text-center">
        <h1 className="font-[800] text-[30px] text-black mt-10 underline">
          YOUR COMPLETED WORKS
        </h1>
      </section>
      <section className="bg-gradient-to-l   from-gray-100 to-gray-200 pb-8 flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : completedWorks.length > 0 ? (
              <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-12 md:gap-8">
                {visibleCompletedWorks.map(
                  (electrician) =>
                    electrician.workCompletedStatus === "PaymentSuccess" && (
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
                                <td className="font-bold py-2">Work Date</td>
                                <td className="py-2">
                                  {moment(
                                    `${electrician.clientWorkDate}`
                                  ).format("DD-MM-YYYY")}
                                </td>
                              </tr>

                              <tr className="border-b border-gray-300">
                                <td className="font-bold py-2">Amount Paid</td>
                                <td className="py-2">
                                ₹{electrician.workPaymentAmount}/-
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </CardBody>
                        <CardFooter className="flex gap-7 justify-center ">
                          <div>
                            <h1 className="text-justify">
                              Thank you for choosing our services! Your payment
                              has been successfully processed. We appreciate
                              your trust in us. Please take a moment to share
                              your experience and consider rating us.
                            </h1>
                          </div>
                        </CardFooter>
                      </Card>
                    )
                )}
              </div>
            ) : (
              <div>No Completed Works found</div>
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

export default CompletedWorks;
