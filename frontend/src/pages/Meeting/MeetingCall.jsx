import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

const MeetingCall = () => {
  const { id } = useParams();
  const meetingUIRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (meetingUIRef.current) {
      meetingUI(meetingUIRef.current);
    }
  }, [id]);

  async function meetingUI(element) {
    const appId = 1485297785;
    const serverSecret = "5ef582359cd8a36f04bd63576555913b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      id,
      v4(),
      "Senjith"
    );
    const ui = ZegoUIKitPrebuilt.create(kitToken);
    ui.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
  };

  return (
    <>
      <div className="bg-gradient-to-l from-blue-200 via-blue-100 to-blue-50 flex justify-center items-center min-h-screen">
  <div className="bg-white m-8 p-8 rounded shadow-md max-w-md text-center">
    <p className="text-xl font-semibold mb-4">ID: {id}</p>
    <h1>Sorry for the inconvience! As per zegocloud account expired you are not able to access video call</h1>
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
      onClick={handleCopyClick}
    >
      {copied ? "Copied!" : "Copy ID"}
    </button>
  </div>
  <div className="w-full h-screen" ref={meetingUIRef}></div>
</div>

    </>
  );
};

export default MeetingCall;
