import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { GrLocation } from "react-icons/gr";
import { useGetElectriciansDetailsMutation } from "../../slices/clientsApiSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClientHeader from "../../components/Header/clientHeader";
import { useCreateChatMutation } from "../../slices/chatSlice";
import { useSelector } from "react-redux";

const ListElectricians = () => {
  const [loading, setLoading] = useState(true);
  const [electriciansList, setElectriciansList] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
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
  const [createChat] = useCreateChatMutation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getElectricians();

        if (result.data) {
          setElectriciansList(result.data.electriciansList);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching electricians:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [getElectricians]);

  const handleChatWith = async (electricianId) => {
    try {
      let senderId = userInfo._id
      let receiverId = electricianId
      const result = await createChat({senderId, receiverId}).unwrap();
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
      <section className="userElectrician__section mt-[1px] pt-[40px] 2xl:h-[500px]">
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

      <section className="container rounded-lg bg-gray-100 mt-8 shadow-md py-4">
        <div className="flex flex-wrap justify-around container mx-auto gap-4">
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-md w-full md:w-auto mb-2 md:mb-0"
            placeholder="Search"
          />

          <div className="relative w-full md:w-auto">
            <select
              className="p-3 pr-8 border border-gray-300 rounded-md appearance-none w-full"
              defaultValue=""
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
            className="p-3 border border-gray-300 rounded-md w-full md:w-auto"
            placeholder="Location Search"
          />
        </div>
      </section>

      <section className="pb-8 flex items-center justify-center">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            {loading ? (
              // Loading animation (you can replace this with your preferred loading component)
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : electriciansList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-12 md:gap-8 ">
                {electriciansList.map((electrician) => (
                  <Card
                    key={electrician.id}
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
                        <span>{electrician.electricianName}</span>
                        <span>rating</span>
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="flex justify-between items-center m-3"
                      >
                        <span>
                          ₹ {electrician.electricianWage.electricianWagePerDay}
                        </span>
                        <span className="flex gap-2 items-center first-letter">
                          <GrLocation />
                          {electrician.electricianLocation.electricianLocality},
                          {electrician.electricianLocation.electricianState}
                        </span>
                      </Typography>
                      <Typography className="text-justify">
                        {electrician.electricianDescription}
                      </Typography>
                    </CardBody>
                    <CardFooter className="flex gap-7 justify-center pt-5">
                      <Button className="bg-buttonColor pl-3 pr-3">
                        <Link to={`/electricianDetails/${electrician._id}`}>
                          Schedule
                        </Link>
                      </Button>

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

export default ListElectricians;
