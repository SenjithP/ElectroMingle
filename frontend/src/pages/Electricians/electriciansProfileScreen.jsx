import { useEffect, useRef, useState } from "react";
import { useGetElecticianDetailsMutation, useUpdateElectricianProfileMutation } from "../../slices/electriciansApiSlice";
import { useGetDataToUpdateElectricianProfileMutation } from "../../slices/electriciansApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ElectricianHeader from "../../components/Header/electricianHeader";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar.jsx";
import { IoMdClose } from "react-icons/io";
const ElectriciansProfileScreen = () => {
  const { electricianInfo } = useSelector((state) => state.auth);                   
  const [electricianName, setElectricianName] = useState();                        
  const [electricianEmail, setElectricianEmail] = useState();                      
  const [electricianPassword, setElectricianPassword] = useState();
  const [electricianMobileNumber, setElectricianMobileNumber] = useState();        
  const [electricianState, setElectricianState] = useState();                      
  const [electricianLocality, setElectricianLocality] = useState();                
  const [electricianDescription, setElectricianDescription] = useState();              
  const [electricianWagePerDay, setElectricianWagePerDay] = useState();
  const [electricianWagePerHour, setElectricianWagePerHour] = useState();
  const [electricianLicenseNumber, setElectricianLicenseNumber] = useState();

  const [profileImage, setProfileImage] = useState(null);
  const [profileImages, setProfileImages] = useState();

  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState([]);
  const imageRef = useRef();

  const [updateElectricianProfile] = useUpdateElectricianProfileMutation();
  const [getDataToUpdateElectricianProfile] =
    useGetDataToUpdateElectricianProfileMutation();

  const [getElecticianDetails] = useGetElecticianDetailsMutation();
  const [electicianDetails, setElecticianDetails] = useState([]);


  const isProfileImageValid = (fileName) => {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const ext = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(ext);
  };

  const onProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImages(file);
    if (file) {
      const fileName = file.name;
      if (isProfileImageValid(fileName)) {
        setProfileImage({
          image: URL.createObjectURL(file),
        });
      } else {
        setProfileImage(null);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("electricianId", electricianInfo._id);
      formData.append("electricianName", electricianName);
      formData.append("electricianEmail", electricianEmail);
      formData.append("electricianPassword", electricianPassword);
      formData.append("electricianMobileNumber", electricianMobileNumber);
      formData.append("electricianState", electricianState);
      formData.append("electricianLocality", electricianLocality);
      formData.append("electricianDescription", electricianDescription);
      formData.append("electricianWagePerDay", electricianWagePerDay);
      formData.append("electricianWagePerHour", electricianWagePerHour);
      formData.append("electricianLicenseNumber", electricianLicenseNumber);

    

      if (profileImage) {
        formData.append("electricianProfileImage", profileImages);
      }

      await updateElectricianProfile(formData).unwrap();

      setCount(prevCount => prevCount + 1);
      
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataToUpdateElectricianProfile({
          id: electricianInfo._id,
        }).unwrap();
        if (result.electricianDetails) {
          setFormData({
            ...formData,
            ...result.electricianDetails,
          });
        } else {
          console.log("failed to fetch users");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [count, getDataToUpdateElectricianProfile]);

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
  }, [count, getElecticianDetails]);
  return (
    <>
      <ElectricianHeader />
      <div className="flex">
        <ElectricianSideBar electicianDetails={electicianDetails}   />
        <section className=" flex-1  xl:px-0">
          <div className="max-w-[750px]  mx-auto">
            <div className="rounded-lg m-3 md:p-10 md:shadow-md bg-white">
              <h1 className="text-center  text-3xl">UPDATE YOUR PROFILE</h1>
              <form onSubmit={submitHandler} encType="multipart/form-data">
                <div className="">
                  <input
                    type="text"
                    placeholder="Enter Your Name if needed"
                    name="electricianName"
                    value={electricianName}
                    onChange={(e) => setElectricianName(e.target.value)}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                </div>
                <div className="">
                  <input
                    type="email"
                    placeholder="Enter Your Email if needed"
                    name="electricianEmail"
                    value={electricianEmail}
                    onChange={(e) => setElectricianEmail(e.target.value)}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    placeholder="change Password if needed"
                    name="electricianPassword"
                    value={electricianPassword}
                    onChange={(e) => setElectricianPassword(e.target.value)}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    placeholder="Enter Your mobile number if needed"
                    name="electricianMobileNumber"
                    value={electricianMobileNumber}
                    onChange={(e) => setElectricianMobileNumber(e.target.value)}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    placeholder={
                      formData.electricianLocation?.electricianState ===
                      "Unknown State"
                        ? "Enter Your State (Required *)"
                        : "Change Your State?"
                    }
                    name="electricianState"
                    value={electricianState}
                    onChange={(e) => setElectricianState(e.target.value)}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required={
                      formData.electricianLocation?.electricianState ===
                      "Unknown State"
                    }
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    placeholder={
                      formData.electricianLocation?.electricianLocality ===
                      "Unknown Locality"
                        ? "Enter Your Locality (Required *)"
                        : "Change Your Locality?"
                    }
                    name="electricianLocality"
                    value={electricianLocality}
                    onChange={(e) => setElectricianLocality(e.target.value)}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required={
                      formData.electricianLocation?.electricianLocality ===
                      "Unknown Locality"
                    }
                  />
                </div>
                <div className="">
                  <textarea
                    placeholder={
                      formData.electricianDescription ===
                      "No description provided"
                        ? "Enter Your Description (Required *)"
                        : "Change Your Description?"
                    }
                    name="electricianDescription"
                    value={electricianDescription}
                    onChange={(e) => setElectricianDescription(e.target.value)}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required={
                      formData.electricianDescription ===
                      "No description provided"
                    }
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    placeholder={
                      formData.electricianWage?.electricianWagePerDay === 0
                        ? "Enter Your Wage Per Day (Required *)"
                        : "Change Your Wage Per Day?"
                    }
                    name="electricianWagePerDay"
                    value={electricianWagePerDay}
                    onChange={(e) => setElectricianWagePerDay(e.target.value)}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required={
                      formData.electricianWage?.electricianWagePerDay === 0
                    }
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    placeholder={
                      formData.electricianWage?.electricianWagePerHour === 0
                        ? "Enter Your Wage Per Hour (Required *)"
                        : "Change Your Wage Per Hour?"
                    }
                    name="electricianWagePerHour"
                    value={electricianWagePerHour}
                    onChange={(e) => setElectricianWagePerHour(e.target.value)}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required={
                      formData.electricianWage?.electricianWagePerHour === 0
                    }
                  />
                </div>

                <div className="">
                  <input
                    type="text"
                    placeholder={
                      formData.electricianCertificate
                        ?.electricianLicenseNumber === "No license number"
                        ? "Enter Your License Number (Required *)"
                        : "Change Your license Number?"
                    }
                    name="electricianLicenseNumber"
                    value={electricianLicenseNumber}
                    onChange={(e) =>
                      setElectricianLicenseNumber(e.target.value)
                    }
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required={
                      formData.electricianCertificate
                        ?.electricianLicenseNumber === "No license number"
                    }
                  />
                </div>

                <div className="relative my-2 w-full">
                  <div className="flex items-center justify-between">
                    <input
                      type="file"
                      name="electricianProfileImage"
                      ref={imageRef}
                      onChange={onProfileImageChange}
                      id="electricianProfileImage"
                      className="hidden"
                      accept=".jpg, .jpeg, .png"
                    />
                    <div className="flex-grow">
                      <input
                        type="text"
                        placeholder="Upload Your Profile Image"
                        className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer"
                        readOnly
                        onClick={() =>
                          document
                            .getElementById("electricianProfileImage")
                            .click()
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="ml-2 bg-buttonColor hover:bg-blue-600 text-white text-lg leading-7 rounded-lg px-5 py-3"
                      onClick={() =>
                        document
                          .getElementById("electricianProfileImage")
                          .click()
                      }
                    >
                      Browse
                    </button>
                  </div>
                </div>

                {profileImage && (
                  <div className="previewVideo">
                    <IoMdClose
                      onClick={() => setProfileImage(null)}
                      className="closeIcon"
                    />
                    <img
                      src={profileImage.image}
                      className="w-[80px] h-[80px] rounded-md"
                    />
                  </div>
                )}

                <div className="relative my-2 w-full">
                  <div className="flex items-center justify-between">
                    <input
                      type="file"
                      id="electricianLicenseImage"
                      name="electricianLicenseImage"
                      // onChange={onImageChange}
                      ref={imageRef}
                      accept=".jpg, .jpeg, .png"
                      className="hidden"
                    />
                    <div className="flex-grow">
                      <input
                        type="text"
                        placeholder="Upload Your License Image"
                        className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer"
                        readOnly
                        onClick={() =>
                          document
                            .getElementById("electricianLicenseImage")
                            .click()
                        }
                        required
                      />
                    </div>
                    <button
                      type="button"
                      className="ml-2 bg-buttonColor hover:bg-blue-600 text-white text-lg leading-7 rounded-lg px-5 py-3"
                      readOnly
                      onClick={() =>
                        document
                          .getElementById("electricianLicenseImage")
                          .click()
                      }
                    >
                      Browse
                    </button>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full bg-buttonColor hover:bg-blue-600 text-white text-lg leading-7 rounded-lg px-4 py-3"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ElectriciansProfileScreen;
