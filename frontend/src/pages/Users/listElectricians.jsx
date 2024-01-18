import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  useGetElectriciansDetailsMutation,
  useElectricianReviewMutation,
  useGetElectriciansReviewsMutation,
} from "../../slices/clientsApiSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClientHeader from "../../components/Header/clientHeader";
import { useCreateChatMutation } from "../../slices/chatApiSlice";
import { useSelector } from "react-redux";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { toast } from "react-toastify";

const ListElectricians = () => {
  const [electriciansReviews, setElectriciansReviews] = useState([]);
  const [count, setCount] = useState(0);
  const [electriciansList, setElectriciansList] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [sortByRating, setSortByRating] = useState("");

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSortOrderRatingChange = (event) => {
    const sortOrders = event.target.value;
    setSortByRating(sortOrders);

    if (sortOrders === "positive-to-negative") {
      const sortedDatas = [...electriciansList].sort(
        (a, b) => b.rating - a.rating
      );
      setElectriciansList(sortedDatas);
    } else if (sortOrders === "negative-to-positive") {
      const sortedDatas = [...electriciansList].sort(
        (a, b) => a.rating - b.rating
      );
      setElectriciansList(sortedDatas);
    }
  };

  const handleSortOrderChange = (event) => {
    const sortOrder = event.target.value;
    setSortByPrice(sortOrder);

    if (sortOrder === "high-to-low") {
      const sortedData = [...electriciansList].sort(
        (a, b) =>
          b.electricianWage.electricianWagePerDay -
          a.electricianWage.electricianWagePerDay
      );
      setElectriciansList(sortedData);
    } else if (sortOrder === "low-to-high") {
      const sortedData = [...electriciansList].sort(
        (a, b) =>
          a.electricianWage.electricianWagePerDay -
          b.electricianWage.electricianWagePerDay
      );
      setElectriciansList(sortedData);
    }
  };

  const [getElectricians] = useGetElectriciansDetailsMutation();
  const [getElectriciansReviews] = useGetElectriciansReviewsMutation();
  const [createChat] = useCreateChatMutation();

  // Function to handle name search input change
  const handleNameSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleLocationSearchChange = (e) => {
    setSearchLocation(e.target.value);
  };

  // Filter works based on the date range and name
  const filteredWorker = electriciansList.filter((electrician) => {
    const matchesLocation =
      !searchLocation ||
      electrician.electricianLocation.electricianLocality
        .toLowerCase()
        .includes(searchLocation.toLowerCase());
    const matchesName =
      !searchName ||
      electrician.electricianName
        .toLowerCase()
        .includes(searchName.toLowerCase());

    return matchesName && matchesLocation;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getElectricians();
        if (result.data) {
          setElectriciansList(result.data.electriciansList);
        }
      } catch (error) {
        console.error("Error fetching electricians:", error);
      }
    };

    fetchData();
  }, [count, getElectricians]);

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

  const [isModalOpen, setModalOpen] = useState(false);
  const [electricianId, setElectricianId] = useState("");

  const openModal = (electricianId) => {
    setModalOpen(true);
    setElectricianId(electricianId);
  };
  const closeModal = (electricianId) => {
    setModalOpen(false);
    setElectricianId(electricianId);
  };

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const [electricianReview] = useElectricianReviewMutation();
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };
  const handleRatingSubmit = async () => {
    try {
      const response = await electricianReview({
        electricianId,
        rating,
        review,
        userId: userInfo._id,
      }).unwrap();
      if (response.message) {
        setRating(0);
        setReview("");
        toast.success(response.message, {
          position: toast.POSITION.TOP_RIGHT,
          style: { marginTop: "50px" },
        });
        setCount((prevCount) => prevCount + 1);
        closeModal();
      }
    } catch (error) {
      setRating(0);
      setReview("");

      toast.error(error.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        style: { marginTop: "50px" },
      });
      setCount((prevCount) => prevCount + 1);

      closeModal();
    }
  };

  const [isReadModalOpen, setReadModalOpen] = useState(false);

  const openReadModal = (electricianId) => {
    fetchData(electricianId);
    setReadModalOpen(true);
  };
  const closeReadModal = () => {
    setReadModalOpen(false);
  };

  const fetchData = async (electricianId) => {
    try {
      const result = await getElectriciansReviews({ id: electricianId });
      if (result.data) {
        setElectriciansReviews(result.data.electriciansReviews);
      } else {
        console.error("Data not available");
      }
    } catch (error) {
      console.error("Error fetching Reviews:", error);
    }
  };

  return (
    <>
      <ClientHeader />
      {/*========banner========*/}
      <section className=" userElectrician__section mt-[1px] pt-[40px] 2xl:h-[500px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[700px]">
                <h1 className="text-[30px] leading-[46px] text-white font-[400] font-custom md:text-[40px] md:leading-[70px]">
                  Discover our elite team of highly skilled and seasoned
                  electricians, and find the perfect fit for your electrical
                  needs.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container bg-gradient-to-l from-blue-200 via-blue-100 to-blue-50 rounded-lg bg-gray-100 mt-8 shadow-md py-4">
        <div className="flex flex-wrap justify-around container mx-auto gap-4">
          <input
            type="text"
            value={searchName}
            onChange={handleNameSearchChange}
            className="p-3 border border-gray-300 rounded-md w-full md:w-auto mb-2 md:mb-0"
            placeholder="Search Worker"
          />

          <div className="relative w-full md:w-auto">
            <select
              className="p-3 pr-8 border border-gray-300 rounded-md appearance-none w-full"
              value={sortByRating}
              onChange={handleSortOrderRatingChange}
            >
              <option value="" disabled hidden>
                Rating
              </option>
              <option value="positive-to-negative">Positive to Negative</option>
              <option value="negative-to-positive">Negative to Positive</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              ˅
            </div>
          </div>

          <div className="relative w-full md:w-auto">
            <select
              className="p-3 pr-8 border border-gray-300 rounded-md appearance-none w-full"
              value={sortByPrice}
              onChange={handleSortOrderChange}
            >
              <option value="" disabled hidden>
                Filter with Price
              </option>
              <option value="high-to-low">High to Low</option>
              <option value="low-to-high">Low to High</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              ˅
            </div>
          </div>

          <input
            type="text"
            value={searchLocation}
            onChange={handleLocationSearchChange}
            className="p-3 border border-gray-300 rounded-md w-full md:w-auto"
            placeholder="Location Search"
          />
        </div>
      </section>

      <section className="pb-8  flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            {filteredWorker.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-12 md:gap-8 ">
                {filteredWorker.map((electrician, index) =>
                  electrician.electricianIsVerified ? (
                    <Card
                      key={index}
                      className="p-3 mt-6 max-w-full md:max-w-[400px] lg:max-w-[300px]"
                    >
                      <CardHeader color="blue-gray" className="relative h-56">
                        <img
                          className="rounded-lg w-full h-full object-cover"
                          src={electrician.electricianProfileImage}
                          alt="card-image"
                        />
                      </CardHeader>
                      <CardBody>
                        <table className="w-full">
                          <tbody>
                            <tr className="border-b border-gray-300">
                              <td className="font-bold py-2">Electrician</td>
                              <td className="py-2">
                                {electrician.electricianName}
                              </td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="font-bold py-2">Rating</td>
                              <td className="py-2 flex items-center gap-4">
                                <h4>{electrician.rating}/5</h4>

                                <div className="relative">
                                  <div className="group">
                                    <MdOutlineRateReview
                                      className="cursor-pointer"
                                      onClick={() => openModal(electrician._id)}
                                    />
                                    <div className="hidden group-hover:block absolute bg-gray-800 text-white p-2 rounded-md">
                                      Write
                                    </div>
                                    {isModalOpen && (
                                      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                                        {/* Modal Content */}
                                        <div className="bg-white p-6 rounded-md shadow-lg flex flex-col items-center w-[400px]">
                                          <div className="self-end mb-2">
                                            <span
                                              className="text-gray-500 cursor-pointer"
                                              onClick={() =>
                                                closeModal(electrician._id)
                                              }
                                            >
                                              <IoIosCloseCircleOutline className="text-2xl" />
                                            </span>
                                          </div>
                                          <h2 className="text-2xl mb-4">
                                            Rate and Review
                                          </h2>
                                          <div className="flex items-center mb-4">
                                            {[1, 2, 3, 4, 5].map((index) => (
                                              <span
                                                key={index}
                                                className={`text-2xl cursor-pointer ${
                                                  index <= rating
                                                    ? "text-yellow-500"
                                                    : ""
                                                }`}
                                                onClick={() =>
                                                  handleStarClick(index)
                                                }
                                              >
                                                {index <= rating ? (
                                                  <IoMdStar />
                                                ) : (
                                                  <MdOutlineStarBorder />
                                                )}
                                              </span>
                                            ))}
                                          </div>
                                          {/* Input field for review */}
                                          <textarea
                                            className="w-full border p-2 mb-4"
                                            placeholder="Write your review"
                                            value={review}
                                            onChange={(e) =>
                                              setReview(e.target.value)
                                            }
                                          ></textarea>
                                          {/* Submit button */}
                                          <button
                                            className="bg-blue-500 text-white p-2 rounded-md mr-2"
                                            onClick={() => handleRatingSubmit()}
                                          >
                                            Submit
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Read Button */}
                                <div className="group relative">
                                  <MdOutlinePreview
                                    className="cursor-pointer"
                                    onClick={() =>
                                      openReadModal(electrician._id)
                                    }
                                  />
                                  <div className="hidden group-hover:block absolute bg-gray-800 text-white p-2 rounded-md">
                                    Read
                                  </div>
                                </div>

                                {/* Read Modal */}
                                <div
                                  className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 ${
                                    isReadModalOpen ? "" : "hidden"
                                  }`}
                                >
                                  <div className="bg-white p-6 rounded-md shadow-lg flex flex-col items-center w-[700px] max-h-[80vh] overflow-hidden">
                                    <div className="self-end mb-2">
                                      <span
                                        className="text-gray-500 cursor-pointer"
                                        onClick={closeReadModal}
                                      >
                                        <IoIosCloseCircleOutline className="text-2xl" />
                                      </span>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4 text-gray-800">
                                      Reviews
                                    </h2>
                                    <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-gray-300 w-full">
                                      <table className="min-w-full bg-white border border-gray-300">
                                        <thead>
                                          <tr className="bg-gray-100">
                                            <th className="py-2 px-4 border-b text-center">
                                              User
                                            </th>
                                            <th className="py-2 px-4 border-b text-center">
                                              Rating
                                            </th>
                                            <th className="py-2 px-4 border-b text-center">
                                              Review
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {electriciansReviews.map(
                                            (reviews) => (
                                              <tr
                                                key={reviews._id}
                                                className="hover:bg-gray-50"
                                              >
                                                <td className="py-2 px-4 border-b text-center">
                                                  {reviews.userId.userName}
                                                </td>
                                                <td className="py-2 px-4 border-b text-center">
                                                  {reviews.rating}
                                                </td>
                                                <td className="py-2 px-4 border-b  text-justify">
                                                  {reviews.review}
                                                </td>
                                              </tr>
                                            )
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                    <button
                                      onClick={closeReadModal}
                                      className="bg-blue-500 text-white px-4 my-5 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            <tr className="border-b border-gray-300">
                              <td className="font-bold py-2">Wage/Day</td>
                              <td className="py-2">
                                ₹{" "}
                                {
                                  electrician.electricianWage
                                    .electricianWagePerDay
                                }
                              </td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="font-bold py-2">Location</td>
                              <td className="py-2">
                                {
                                  electrician.electricianLocation
                                    .electricianLocality
                                }
                                ,
                                {
                                  electrician.electricianLocation
                                    .electricianState
                                }
                              </td>
                            </tr>
                            <tr className="border-b border-gray-300">
                              <td className="font-bold py-2">Wage/Day</td>
                              <td className="py-2">
                                ₹{" "}
                                {
                                  electrician.electricianWage
                                    .electricianWagePerDay
                                }
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <Typography className="py-2 text-justify">
                          <h3 className="text-descColor font-bold">
                            Description
                          </h3>
                          {electrician.electricianDescription}
                        </Typography>
                      </CardBody>
                      <CardFooter className="flex gap-7 justify-center pt-5">
                        <Button className="bg-buttonColor pl-3 pr-3">
                          <Link to={`/electricianBooking/${electrician._id}`}>
                            Schedule
                          </Link>
                        </Button>
                        <Button
                          onClick={() => {
                            handleChatWith(electrician._id);
                          }}
                          className="bg-buttonColor pl-3 pr-3"
                        >
                          Chat with
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : null
                )}
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

export default ListElectricians;
