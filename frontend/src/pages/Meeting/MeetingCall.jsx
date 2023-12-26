import React from "react";
import CallPageHeader from "../../components/Meeting/CallPageHeader";
import CallPageFooter from "../../components/Meeting/CallPageFooter";
import MeetingInfo from "../../components/Meeting/MeetingInfo";
import Messenger from "../../components/Meeting/Messenger";


const MeetingCall = () => {
  return (
    <div className="relative h-screen">
    <video className="absolute top-0 left-0 w-full h-full object-cover z-[-1]" src="" controls></video>
    <CallPageHeader />
    <CallPageFooter />
    <MeetingInfo />
    <Messenger />
  </div>
  
  );
};

export default MeetingCall;
