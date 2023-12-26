import React from "react";
import ElectricianHeader from "../../components/Header/electricianHeader";
import meetingImg from "../../assets/images/meeting.png";
import { FaVideo } from "react-icons/fa6";

const MeetingHome = () => {
  return (
    <>
      <ElectricianHeader />
      <section className="px-5 xl:px-0">
        <div className="max-w-[1170px] mx-auto ">
          <div className="rounded-lg m-10 md:p-10 md:shadow-md grid grid-cols-1 lg:grid-cols-2 ">
            <div className="lg:pt-[20px]  lg:block rounded-l-lg">
              <figure className="rounded-l-lg">
                <img
                  src={meetingImg}
                  alt="register"
                  className="rounded-lg  w-full"
                />
              </figure>
            </div>

            <div className="rounded-l-lg py-5 text-center lg:pl-16">
              <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
                Explore Your Community with Virtual Meetings:{" "}
                <span className="text-buttonColor">Connect and Thrive</span>
              </h3>
              <h5 className="text-justify my-5">
                {" "}
                Unleash the potential of virtual meetings to connect,
                collaborate, and thrive within your community. Seamlessly
                explore and engage in meaningful discussions, fostering a
                stronger and more connected collective.
              </h5>

              <div className="my-5">
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 gap-5 text-white text-lg font-semibold leading-7 rounded-lg px-4 py-3 flex items-center justify-center focus:outline-none focus:ring focus:border-blue-300"
                >
                  <FaVideo />
                  New Meeting
                </button>
              </div>

              <form>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <input
                    type="text"
                    placeholder="Enter Code or Link"
                    name="meetingLink"
                    className="w-full px-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-base text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full md:w-auto bg-buttonColor hover:bg-blue-600 text-white text-lg leading-7 rounded-lg px-6 py-3"
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MeetingHome;
