import React, { useEffect, useState } from "react";
import ElectricianHeader from "../../components/Header/electricianHeader";
import { useSelector } from "react-redux";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar";
import ElectricianPost from "../../components/Post/ElectricianPost";
import { useGetSavedPostsMutation } from "../../slices/postApiSlice";
import { useGetElecticianDetailsMutation } from "../../slices/electriciansApiSlice";
import UpcomingWorks from "../../components/Electrician/upcomingWorks";

const SavedPosts = () => {
  const { electricianInfo } = useSelector((state) => state.auth);
  const [getSavedPosts] = useGetSavedPostsMutation();
  const [electricianSavedPosts, setElectricianSavedPosts] = useState([]);
  const [receivedData, setReceivedData] = useState(null);
  const [electicianDetails, setElecticianDetails] = useState([]);
  const [getElecticianDetails] = useGetElecticianDetailsMutation();

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
        const result = await getSavedPosts({ id: electricianInfo._id });
        let postId = [];
        result.data.allElectriciansSavedPosts.map((item) => {
          postId.push(item.postId);
        });
        setElectricianSavedPosts(postId);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [getSavedPosts, receivedData]);

  const handleDataFromChild = (count) => {
    // Handle the data received from the child component
    console.log("Data received from child:", count);
    setReceivedData(count);
  };

  console.log(electricianSavedPosts, "crfvebrvjn");
  return (
    <>
      <ElectricianHeader  electicianDetails={electicianDetails}  />
      <section className="max-h-halfscreen bg-gradient-to-l from-blue-200 via-blue-100 to-blue-50 flex flex-col md:flex-row">
        <ElectricianSideBar electicianDetails={electicianDetails} />
        <div className="md:w-1/10 lg:w-1/2 text-center m-5 max-h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-white-300">
          {electricianSavedPosts.length > 0 ? (
            <ElectricianPost
              electricianPosts={electricianSavedPosts}
              electicianDetails={electicianDetails}
              onDataFromChild={handleDataFromChild}
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

export default SavedPosts;
