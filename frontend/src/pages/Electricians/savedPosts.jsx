import React, { useEffect, useState } from "react";
import ElectricianHeader from "../../components/Header/electricianHeader";
import { useSelector } from "react-redux";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar";
import ElectricianPost from "../../components/Post/ElectricianPost";
import { useGetSavedPostsMutation } from "../../slices/postApiSlice";

const SavedPosts = () => {
  const { electricianInfo } = useSelector((state) => state.auth);
  const [getSavedPosts] = useGetSavedPostsMutation();
  const [electricianSavedPosts, setElectricianSavedPosts] = useState([]);
  const [receivedData, setReceivedData] = useState(null);


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
  }, [getSavedPosts,receivedData]);

  const handleDataFromChild = (count) => {
    // Handle the data received from the child component
    console.log("Data received from child:", count);
    setReceivedData(count);
  };

  console.log(electricianSavedPosts,"crfvebrvjn")
  return (
    <>
      <ElectricianHeader electricianName={electricianInfo?.electricianName} />
      <section className="max-h-halfscreen  flex flex-col md:flex-row">
        <ElectricianSideBar />
        <div className="md:w-1/10 lg:w-1/2 text-center m-5 max-h-screen overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-white-300">
          {electricianSavedPosts.length > 0 ? (
            <ElectricianPost
              electricianPosts={electricianSavedPosts}
              onDataFromChild={handleDataFromChild}
            />
          ) : (
          <div>No Post found</div>
          )}
        </div>
        {/* 25% */}
        <div className="hidden lg:block lg:w-1/4 rounded-r-lg py-5 m-5 md:shadow-md text-center">
          <div className={"flex flex-col items-center justify-center"}>
            <div className={"text-center mb-4"}>
              <h1>TO DO</h1>
              <p>Stay organized with Todo</p>
            </div>
            <ul className={"list-disc p-4 rounded-md shadow-sm"}>
              <li className={"flex items-center justify-between"}>
                <p>Check Schedules</p>
                <input type="checkbox" className={"ml-2"} />
              </li>
              <li className={"flex items-center justify-between"}>
                <p>Add</p>
                <input type="checkbox" checked={false} className={"ml-2"} />
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default SavedPosts;
