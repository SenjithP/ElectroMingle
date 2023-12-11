import { useEffect, useState } from "react";
import { useUpdateElectricianProfileMutation } from "../../slices/electriciansApiSlice";
import { useGetDataToUpdateElectricianProfileMutation } from "../../slices/electriciansApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ElectriciansProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    electricianId: userInfo._id,
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
    electricianLicense: "",
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

    console.log(formData);
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
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Check Weather all fields are filled properly");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const electricianId = userInfo._id;

        if (!electricianId) {
          console.error("User ID is undefined or null.");
          return;
        }

        const response = await getDataToUpdateElectricianProfile({
          electricianId,
        }).unwrap();


        if (response.error) {
          console.error("Error fetching electrician details:", response.error);
        } else {
          const electricianDetails = response;

          if (electricianDetails && electricianDetails.electricianDetails) {
            setFormData({
              ...formData,
              electricianName:
                electricianDetails.electricianDetails.electricianName,
              electricianEmail:
                electricianDetails.electricianDetails.electricianEmail,

              electricianMobileNumber:
                electricianDetails.electricianDetails.electricianMobileNumber,
              electricianState:
                electricianDetails.electricianDetails.electricianLocation
                  .electricianState,
              electricianLocality:
                electricianDetails.electricianDetails.electricianLocation
                  .electricianLocality,
              electricianDescription:
                electricianDetails.electricianDetails.electricianDescription,
              electricianWagePerDay:
                electricianDetails.electricianDetails.electricianWage
                  .electricianWagePerDay,
              electricianWagePerHour:
                electricianDetails.electricianDetails.electricianWage
                  .electricianWagePerHour,
              electricianProfileImage:
                electricianDetails.electricianDetails.electricianProfileImage,
              electricianLicenseImage:
                electricianDetails.electricianDetails.electricianCertificate
                  .electricianLicenseImage,
              electricianLicenseNumber:
                electricianDetails.electricianDetails.electricianCertificate
                  .electricianLicenseNumber,
            });
          } else {
            console.error("Electrician details not found in the response.");
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
      }
    };

    fetchData();
  }, []);

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[770px] mx-auto ">
        <div className="rounded-lg m-10 md:p-10 md:shadow-md grid grid-cols-1 lg:grid-cols-1 ">
          <div className="rounded-l-lg py-5 text-center ">
            <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
              Complete your <span className="text-buttonColor">Profile</span>
            </h3>

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
                  value={formData.electricianPassword}
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
                  value={formData.electricianState}
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
                  value={formData.electricianLocality}
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
                  value={formData.electricianWagePerDay}
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
                  value={formData.electricianWagePerHour}
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
                      document.getElementById("electricianProfileImage").click()
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
                      value={`Your License Image:- ${formData.electricianLicenseImage}`}
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
                      document.getElementById("electricianLicenseImage").click()
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
                  value={formData.electricianLicenseNumber}
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
      </div>
    </section>
  );
};

export default ElectriciansProfileScreen;
