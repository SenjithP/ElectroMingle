import { useEffect, useState } from "react";
import {
  useGetElecticianDetailsMutation,
  useUpdateElectricianProfileMutation,
} from "../../slices/electriciansApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ElectricianHeader from "../../components/Header/electricianHeader";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar.jsx";
import { IoMdClose } from "react-icons/io";
import { RotatingLines } from "react-loader-spinner";

const ElectriciansProfileScreen = () => {
  const { electricianInfo } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedLicenseImage, setSelectedLicenseImage] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [electicianDetails, setElecticianDetails] = useState([]);
  const [getElecticianDetails] = useGetElecticianDetailsMutation();
  const [updateElectricianProfile] = useUpdateElectricianProfileMutation();

  const closeProfileButtonHandler = () => {
    setSelectedProfileImage(null);
  };

  const closeLicenseButtonHandler = () => {
    setSelectedLicenseImage(null);
  };

  const allowedExtensions = ["jpg", "jpeg", "png"];

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        toast.error(
          "Invalid file format. Please choose a .jpg, .jpeg, or .png file."
        );
        return;
      }
    }
    setSelectedProfileImage(file);
    const setFileToBase = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
    };
    setFileToBase(file);
  };

  const handleLicenseImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const extension = file.name.split(".").pop().toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        toast.error(
          "Invalid file format. Please choose a .jpg, .jpeg, or .png file."
        );
        return;
      }
    }
    setSelectedLicenseImage(file);

    const setFileToBase2 = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLicenseImage(reader.result);
      };
    };

    setFileToBase2(file);
  };
const [count,setCount] = useState(0)
  const [formData, setFormData] = useState({
    electricianName: "",
    electricianEmail: "",
    electricianPassword: "",
    electricianMobileNumber: null,
    electricianDescription: "",
    electricianState: "",
    electricianCity: "",
    electricianWagePerDay: null,
    electricianWagePerHour: null,
    electricianLicenseNumber: "",
  });

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const electricianDetail = await getElecticianDetails({
          id: electricianInfo._id,
        });
        if (electricianDetail.data) {
          setElecticianDetails(electricianDetail.data);
          setFormData({
            ...formData,
            electricianName: electricianDetail.data.data.electricianName,
            electricianEmail: electricianDetail.data.data.electricianEmail,
            electricianMobileNumber:
              electricianDetail.data.data.electricianMobileNumber,
            electricianDescription:
              electricianDetail.data.data.electricianDescription,
            electricianState:
              electricianDetail.data.data.electricianLocation.electricianState,
            electricianCity:
              electricianDetail.data.data.electricianLocation.electricianLocality,
            electricianWagePerDay:
              electricianDetail.data.data.electricianWage.electricianWagePerDay,
            electricianWagePerHour:
              electricianDetail.data.data.electricianWage
                .electricianWagePerHour,
            electricianLicenseNumber:
              electricianDetail.data.data.electricianCertificate
                .electricianLicenseNumber,
          });
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [count]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const {
      electricianName,
      electricianEmail,
      electricianPassword,
      electricianMobileNumber,
      electricianDescription,
      electricianState,
      electricianCity,
      electricianWagePerDay,
      electricianWagePerHour,
      electricianLicenseNumber,
    } = formData;
    try {
      await updateElectricianProfile({
        electricianId: electricianInfo._id,
        electricianName,
        electricianEmail,
        electricianPassword,
        electricianMobileNumber,
        electricianDescription,
        electricianState,
        electricianCity,
        electricianWagePerDay,
        electricianWagePerHour,
        electricianLicenseNumber,
        profileImage,
        licenseImage,
      }).unwrap();
      setCount((prevCount=>prevCount+1))
      toast.success("Successfully Updated Profile");
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <ElectricianHeader electicianDetails={electicianDetails}/>
      <div className=" bg-gradient-to-r from-gray-200 to-gray-700 flex">
        <ElectricianSideBar electicianDetails={electicianDetails} />
        <div className="mx-5  md:w-[1040px]  flex justify-center  h-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 shadow-lg rounded-lg overflow-hidden my-8 w-full flex flex-col">
            {/* Common Heading */}
            <h1 className="text-center mb-2 font-bold text-2xl">
              Update <span className="text-buttonColor"> Profile</span>
            </h1>
            <p className=" text-sm text-center">
              (*If You Are A New User Update Non Existing Fields)
            </p>

          


            <div className="flex flex-row">
              {/* Left Half */}
              <div className="w-1/2 px-8 py-6">
                {/* Three Input Fields in Left Half */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    name="electricianName"
                    value={formData.electricianName}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    value={formData.electricianEmail}
                    name="electricianEmail"
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="Enter Your Password if Required"
                    name="electricianPassword"
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Your Mobile Number"
                    value={formData.electricianMobileNumber}
                    name="electricianMobileNumber"
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Your Description"
                    name="electricianDescription"
                    value={formData.electricianDescription}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>

                <div className=" text-center mt-8 ">
                  <label
                    className=" cursor-pointer"
                    id="custom-label"
                    htmlFor="licenseInput"
                  >
                    Click to Upload License Image
                  </label>
                  <input
                    hidden
                    type="file"
                    id="licenseInput"
                    onChange={handleLicenseImageChange}
                  />
                </div>

                {selectedLicenseImage && (
                  <div className=" flex gap-5 justify-center items-center">
                    <IoMdClose onClick={closeLicenseButtonHandler} />
                    <div className=" flex gap-2 justify-center items-center">
                      <p>Selected Image:</p>
                      <img
                        src={URL.createObjectURL(selectedLicenseImage)}
                        alt="License Preview"
                        className=" w-[100px] "
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right Half */}
              <div className="w-1/2 px-8 py-6">
                {/* Three Input Fields in Right Half */}

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Your State"
                    name="electricianState"
                    value={formData.electricianState}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Your City"
                    name="electricianCity"
                    value={formData.electricianCity}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Your Wage/Day"
                    name="electricianWagePerDay"
                    value={formData.electricianWagePerDay}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Your Wage/Hour"
                    name="electricianWagePerHour"
                    value={formData.electricianWagePerHour}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter Your License Number"
                    name="electricianLicenseNumber"
                    value={formData.electricianLicenseNumber}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>

                <div className=" text-center mt-8">
                  <label
                    className=" cursor-pointer"
                    id="custom-label"
                    htmlFor="profileInput"
                  >
                    Click to Upload Profile Image
                  </label>
                  <input
                    hidden
                    type="file"
                    id="profileInput"
                    onChange={handleProfileImageChange}
                  />
                </div>

                {selectedProfileImage && (
                  <div className=" flex gap-5 justify-center items-center">
                    <IoMdClose onClick={closeProfileButtonHandler} />
                    <div className=" flex gap-2 justify-center items-center">
                      <p>Selected Image:</p>
                      <img
                        src={URL.createObjectURL(selectedProfileImage)}
                        alt="Profile Preview"
                        className=" w-[100px] "
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Common Button */}
            {isLoading ? (
              <div className="flex justify-center items-center">
                <RotatingLines
                  visible={true}
                  height="96"
                  width="96"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <button
                  onClick={submitHandler}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  type="button"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectriciansProfileScreen;
