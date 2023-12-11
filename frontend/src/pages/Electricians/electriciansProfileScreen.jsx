import { useEffect, useState } from "react";
import { useUpdateElectricianProfileMutation } from "../../slices/electriciansApiSlice";
import { useGetDataToUpdateElectricianProfileMutation } from "../../slices/electriciansApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ElectricianHeader from "../../components/Header/electricianHeader";
import ElectricianSideBar from "../../components/Electrician/electricianSideBar.jsx";

const ElectriciansProfileScreen = () => {
  const { electricianInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    electricianId: electricianInfo?._id,
    electricianName: "",
    electricianEmail: "",
    electricianPassword: "",
    electricianMobileNumber: "",
    electricianState: "",
    electricianLocality: "",
    electricianDescription: "",
    electricianWagePerDay: "",
    electricianWagePerHour: "",
    electricianProfileImage: "",
    electricianLicenseImage: "",
    electricianLicenseNumber: "",
  });

  const [updateElectricianProfile] = useUpdateElectricianProfileMutation();
  const [getDataToUpdateElectricianProfile] =
    useGetDataToUpdateElectricianProfileMutation();

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      const fileName = e.target.files[0]?.name || "";
      const fieldName = e.target.name;
      setFormData({ ...formData, [fieldName]: fileName });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const {
      electricianId,
      electricianName,
      electricianEmail,
      electricianPassword,
      electricianMobileNumber,
      electricianState,
      electricianLocality,
      electricianDescription,
      electricianWagePerDay,
      electricianWagePerHour,
      electricianProfileImage,
      electricianLicenseImage,
      electricianLicenseNumber,
    } = formData;

    try {
      await updateElectricianProfile({
        electricianId,
        electricianName,
        electricianEmail,
        electricianPassword,
        electricianMobileNumber,
        electricianState,
        electricianLocality,
        electricianDescription,
        electricianWagePerDay,
        electricianWagePerHour,
        electricianProfileImage,
        electricianLicenseImage,
        electricianLicenseNumber,
      }).unwrap();

      toast.success("Profile Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
        style: { marginTop: "50px" }, // Set marginTop to 300px);
      });
    } catch (error) {
      toast.error("Check Weather all fields are filled properly", {
        position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
        style: { marginTop: "50px" }, // Set marginTop to 300px);
      });
      console.log(error);
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
  }, [getDataToUpdateElectricianProfile]);

  return (
    <>
      <ElectricianHeader />
      <div className="flex">
        <ElectricianSideBar />
        <section className=" flex-1  xl:px-0">
          <div className="max-w-[750px]  mx-auto">
            <div className="rounded-lg m-3 md:p-10 md:shadow-md bg-white">
              <h1 className="text-center  text-3xl">UPDATE YOUR PROFILE</h1>
              <form onSubmit={submitHandler}>
                <div className="">
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
                <div className="">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    name="electricianEmail"
                    value={formData.electricianEmail}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="password"
                    placeholder="change Password if needed"
                    name="electricianPassword"
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    placeholder="Enter Your mobile number"
                    name="electricianMobileNumber"
                    value={formData.electricianMobileNumber}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    placeholder="Enter Your State"
                    name="electricianState"
                    value={formData.electricianLocation?.electricianState}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="text"
                    placeholder="Enter Your Locality"
                    name="electricianLocality"
                    value={formData.electricianLocation?.electricianLocality}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>
                <div className="">
                  <textarea
                    placeholder="Enter Your Description"
                    name="electricianDescription"
                    value={formData.electricianDescription}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    placeholder="Enter Your Wage Per Day"
                    name="electricianWagePerDay"
                    value={formData.electricianWage?.electricianWagePerDay}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    placeholder="Enter Your Wage Per Hour"
                    name="electricianWagePerHour"
                    value={formData.electricianWage?.electricianWagePerHour}
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
                </div>
                <div className="relative my-2 w-full">
                  <div className="flex items-center justify-between">
                    <input
                      type="file"
                      id="electricianProfileImage"
                      name="electricianProfileImage"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <div className="flex-grow">
                      <input
                        type="text"
                        placeholder="Upload Your Profile Image"
                        className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer"
                        readOnly
                        value={`Your Profile Image:- ${formData.electricianProfileImage}`}
                        onClick={() =>
                          document
                            .getElementById("electricianProfileImage")
                            .click()
                        }
                        required
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

                <div className="relative my-2 w-full">
                  <div className="flex items-center justify-between">
                    <input
                      type="file"
                      id="electricianLicenseImage"
                      name="electricianLicenseImage"
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    <div className="flex-grow">
                      <input
                        type="text"
                        placeholder="Upload Your License"
                        className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer"
                        readOnly
                        value={`Your Profile Image:- ${formData.electricianCertificate?.electricianLicenseImage}`}
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

                <div className="">
                  <input
                    type="text"
                    placeholder="Enter Your License Number"
                    name="electricianLicenseNumber"
                    value={
                      formData.electricianCertificate?.electricianLicenseNumber
                    }
                    onChange={handleInputChange}
                    className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
                    required
                  />
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
