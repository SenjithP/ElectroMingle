import  { useEffect, useState } from "react";
import AdminSideBar from "../../components/Admin/adminSideBar";
import AdminHeader from "../../components/Header/adminHeader";

import moment from "moment";
import { Button } from "@material-tailwind/react";
import {
  useGetClientDetailsMutation,
  useClientBlockUnblockMutation,
} from "../../slices/adminApiSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLogout } from "../../slices/authSlice";

const AdminListClient = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize] = useState(6);
  const [clientDetails, setClientDetails] = useState([]);
  const [getClientDetails] = useGetClientDetailsMutation();
  const [clientBlock] = useClientBlockUnblockMutation();
  const dispatch = useDispatch();

  const blockUnblockHandler = async (clientId) => {
    const response = await clientBlock({ clientId }).unwrap();
    if (response.message) {
      setCount((prevCount) => prevCount + 1);
      setClientDetails([]);
      setCurrentPage(1);
      dispatch(userLogout());
      toast.success(response.message);
    } else {
      toast.error("Something went wrong! Try again after some time");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientDetail = await getClientDetails().unwrap();
        if (clientDetail.clientDetails) {
          setClientDetails(clientDetail.clientDetails);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [count, currentPage, getClientDetails]);

  const totalPages = Math.ceil(clientDetails.length / pageSize);
  const visibleClients = clientDetails.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <section className="flex bg-gradient-to-l from-blue-200 via-blue-100 to-blue-50 h-screen flex-col md:flex-row p-0">
        <AdminSideBar />

        <div className="lg:w-3/4 text-center">
          <div className="flex items-center justify-end bg-gray-100 p-6 md:shadow-md">
            <AdminHeader />
          </div>

          <div className="flex  flex-wrap ">
            {visibleClients.map((client) => (
              <div key={client._id} className="w-full md:w-1/3 p-2 mt-3">
                <div className="rounded-lg max-w-full bg-white border border-gray-300 overflow-hidden">
                  <div className="p-4">
                    <table className="w-full">
                      <tbody>
                        <tr className="border-b border-gray-300">
                          <td className="font-bold py-2">Client Name</td>
                          <td className="py-2">{client.userName}</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                          <td className="font-bold py-2">Client Email</td>
                          <td className="py-2">{client.userEmail}</td>
                        </tr>
                        <tr>
                          <td className="font-bold py-2">Joined Date</td>
                          <td className="py-2">
                            {moment(`${client.createdAt}`).format("DD-MM-YYYY")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-center p-5">
                    <Button
                      onClick={() => blockUnblockHandler(client._id)}
                      className={`px-4 py-2 ${
                        client.userIsBlocked ? "bg-green-700" : "bg-red-700"
                      } text-white rounded-md`}
                    >
                      {client.userIsBlocked ? "Unblock" : "Block"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
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

export default AdminListClient;
