import Home from "../pages/Home";
import Register from "../pages/Register";
import UserHome from "../pages/Users/userHome"
import UserElectricianList from "../pages/Users/listElectricians"
import ElectriciansProfileScreen from "../pages/Electricians/electriciansProfileScreen"
import ElectriciansDetails from "../pages/Users/electricianBooking";
import ScheduledWorks from "../pages/Users/scheduledWorks";
import { Routes, Route } from "react-router-dom";
import ElectriciansHomeScreen from "../pages/Electricians/electriciansHomeScreen";
import UserLogin from "../pages/Login/userLogin";
import ElectricianLogin from "../pages/Login/electricianLogin";
import ShopLogin from "../pages/Login/shopLogin";
import ElectricianSideScheduledWorksScreen from "../pages/Electricians/electricianSideScheduledWorksScreen";
import Chat from "../pages/Chat/Chat";
import SavedPosts from "../pages/Electricians/savedPosts";
import MyPosts from "../pages/Electricians/myPosts";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/client_login" element={<UserLogin />} />
      <Route path="/electrician_login" element={<ElectricianLogin />} />
      <Route path="/shop_login" element={<ShopLogin />} />
      <Route path="/userHome" element={<UserHome />} />

      <Route path="/electricianProfile" element={<ElectriciansProfileScreen />} />
      <Route path="/electricianDetails/:id" element={<ElectriciansDetails />} />
      <Route path="/electricianHome" element={<ElectriciansHomeScreen />} />


      <Route path="/clientScheduledWorks" element={<ScheduledWorks />} />
      <Route path="/userElectricianList" element={<UserElectricianList />} />
      <Route path="/electricianHome" element={<UserElectricianList />} />

      <Route path="/electricianSideScheduledWorks" element={<ElectricianSideScheduledWorksScreen />} />

      <Route path="/clientElectricianChat" element={<Chat/>}/>
      <Route path="/electricianSavedPost" element={<SavedPosts/>}/>
      <Route path="/electricianMyPost" element={<MyPosts/>}/>
    </Routes>
  );
};

export default Routers;
