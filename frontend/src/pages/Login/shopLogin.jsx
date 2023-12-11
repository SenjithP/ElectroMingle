// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import loginImg from "../../assets/images/login.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../../slices/authApiSlice";
// import {
//   setUserCredentials,
//   setElectricianCredentials,
// } from "../../slices/authSlice";
// import { toast } from "react-toastify";
// import Header from "../../components/Header/Header";


const ShopLogin = () => {

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [login] = useLoginMutation();

//   const { userInfo } = useSelector((state) => state.auth);
//   const { electricianInfo } = useSelector((state) => state.auth);
//   useEffect(() => {
//     if (userInfo || electricianInfo) {
//       if (userInfo && userInfo.role === "client") {
//         navigate("/userHome");
//       } else if (electricianInfo && electricianInfo.role === "electrician") {
//         navigate("/electricianHome");
//       }
//     }
//   }, [navigate, userInfo, electricianInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const { email, role, password } = formData;

//     try {
//       const res = await login({
//         email,
//         role,
//         password,
//       });
//       if (res.data && res.data._id) {
//         if (res.data.role === "client") {
//           dispatch(setUserCredentials({ ...res.data }));
//           toast.success("Login Successful", {
//             position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
//             style: { marginTop: "50px" }, // Set marginTop to 300px);
//           });
//           navigate("/userHome");
//         } else if (res.data.role === "electrician") {
//           dispatch(setElectricianCredentials({ ...res.data }));

//           toast.success("Login Successful", {
//             position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
//             style: { marginTop: "50px" }, // Set marginTop to 300px);
//           });
//           navigate("/electricianHome");
//         }
//       } else {
//         toast.error("Login failed. Please check your credentials.", {
//           position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
//           style: { marginTop: "50px" }, // Set marginTop to 300px);
//         });
//       }
//     } catch (error) {
//       toast.error(error.data.message, {
//         position: toast.POSITION.TOP_RIGHT, // You can adjust the position here
//         style: { marginTop: "50px" }, // Set marginTop to 300px);
//       });
//       console.log(error);
//     }
//   };

//   return (
//     <>
//     <Header />
//     <section className="px-5 xl:px-0">
//       <div className="max-w-[1170px] mx-auto ">
//         <div className="rounded-lg m-10 md:p-10 md:shadow-md grid grid-cols-1 lg:grid-cols-2 ">
//           <div className="lg:pt-[20px]  lg:block rounded-l-lg">
//             <figure className="rounded-l-lg">
//               <img
//                 src={loginImg}
//                 alt="register"
//                 className="rounded-lg  w-full"
//               />
//             </figure>
//           </div>

//           <div className="rounded-l-lg py-5 text-center lg:pl-16">
//             <h3 className="text-black text-[24px] leading-9 font-bold mb-1">
//               Login <span className="text-buttonColor">Now</span>
//             </h3>

//             <form onSubmit={submitHandler}>
//               <div className="">
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleInputChange}
//                   required
//                   className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
//                 >
//                   -
//                   <option value="" disabled>
//                     Select your role
//                   </option>
//                   <option value="client">Client</option>
//                   <option value="electrician">Electrician</option>
//                   <option value="shop">Shop</option>
//                 </select>
//               </div>

//               <div className="">
//                 <input
//                   type="email"
//                   placeholder="Enter Your Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
//                   required
//                 />
//               </div>
//               <div className="">
//                 <input
//                   type="password"
//                   placeholder="Enter Your Password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="my-2 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-buttonColor text-[16px] leading-7 text-black placeholder:text-gray rounded-md cursor-pointer mb-3 md:mb-0"
//                   required
//                 />
//               </div>
//               <div className="mt-5">
//                 <button
//                   type="submit"
//                   className="w-full bg-buttonColor hover:bg-blue-600 text-white text-lg leading-7 rounded-lg px-4 py-3"
//                 >
//                   Login
//                 </button>
//               </div>
//             </form>
//             <p className="mt-5 text-black text-center">
//               Don't have an account?{" "}
//               <Link className="text-blue-500 font-medium ml-1" to={"/register"}>
//                 Register
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//     </>
//   );
};

export default ShopLogin;
