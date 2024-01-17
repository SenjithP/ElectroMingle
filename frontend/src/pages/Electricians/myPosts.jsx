import React, { useEffect, useState } from "react";
import ElectricianHeader from "../../components/Header/electricianHeader";
import { useSelector } from "react-redux";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar";
import ElectricianPost from "../../components/Post/ElectricianPost";
import { useGetMyPostsMutation } from "../../slices/postApiSlice";
import { useGetElecticianDetailsMutation } from "../../slices/electriciansApiSlice";
import UpcomingWorks from "../../components/Electrician/upcomingWorks";

const MyPosts = () => {
  const { electricianInfo } = useSelector((state) => state.auth);
  const [getMyPosts] = useGetMyPostsMutation();
  const [electricianMyPosts, setElectricianMyPosts] = useState([]);
  const [receivedData, setReceivedData] = useState(null);
  const [getElecticianDetails] = useGetElecticianDetailsMutation();
  const [electicianDetails, setElecticianDetails] = useState([]);

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
  }, [ getElecticianDetails]);
console.log(electicianDetails,"dfvevc")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMyPosts({ id: electricianInfo._id });
       if(result.data.electriciansMyPost){
        setElectricianMyPosts(result.data.electriciansMyPost);
       }else{
        console.log("some thing went wrong")
       }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [getMyPosts,receivedData]);

  const handleDataFromChild = (count) => {
    // Handle the data received from the child component
    console.log("Data received from child:", count);
    setReceivedData(count);
  };

  return (
    <>
      <ElectricianHeader  electicianDetails={electicianDetails}  />
      <section className="max-h-halfscreen bg-gradient-to-l from-blue-200 via-blue-100 to-blue-50 flex flex-col md:flex-row">
        <ElectricianSideBar electicianDetails={electicianDetails} />
        <div className="md:w-1/10 lg:w-1/2 text-center m-5 max-h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-white-300">
          {electricianMyPosts.length > 0 ? (
            <ElectricianPost
              electricianPosts={electricianMyPosts}
              onDataFromChild={handleDataFromChild}
              electicianDetails={electicianDetails}
            />
          ) : (
          <div>No Post found</div>
          )}
        </div>
        {/* 25% */}
        <div className="hidden lg:block lg:w-1/4 rounded-r-lg  bg-blue-50 m-5 md:shadow-md text-center">
          <div className={"flex flex-col items-center justify-center"}>
            <UpcomingWorks />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPosts;
