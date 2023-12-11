// OAuth.js
import React from "react";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { setClientCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import googleLogo from "../assets/images/google_logo.png"

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const resu = await fetch("api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });

      const data = await resu.json();
      if (data) {
        dispatch(setClientCredentials(data));
        toast.success("Google Authentication Success");
        navigate("/userHome");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sorry! Could Not Login With Google Now!");
    }
  };

  return (
    <button
  type="button"
  onClick={handleGoogleClick}
  className="bg-blue-700 text-white  rounded-md p-3 mt-7 uppercase hover:opacity-95 w-full flex justify-center items-center"
>
  <div className="flex gap-3">
    <img className="w-6" src={googleLogo} alt="google_logo" />
    Continue with Google
  </div>
</button>

  );
};

export default OAuth;
