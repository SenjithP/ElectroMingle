import Home from "../pages/Home";
import Register from "../pages/Register";
import UserHome from "../pages/Users/userHome";
import UserElectricianList from "../pages/Users/listElectricians";
import ElectriciansProfileScreen from "../pages/Electricians/electriciansProfileScreen";
import ScheduledWorks from "../pages/Users/scheduledWorks";
import { Routes, Route } from "react-router-dom";
import ElectriciansHomeScreen from "../pages/Electricians/electriciansHomeScreen";
import UserLogin from "../pages/Login/userLogin";
import ElectricianLogin from "../pages/Login/electricianLogin";
import ElectricianSideScheduledWorksScreen from "../pages/Electricians/electricianSideScheduledWorksScreen";
import Chat from "../pages/Chat/Chat";
import SavedPosts from "../pages/Electricians/savedPosts";
import MyPosts from "../pages/Electricians/myPosts";
import MeetingHome from "../pages/Meeting/MeetingHome";
import MeetingCall from "../pages/Meeting/MeetingCall";
import NoMatch from "../components/NoMatch";
import AdminLogin from "../pages/Admin/adminLogin";
import AdminHome from "../pages/Admin/adminHome";
import AdminListClient from "../pages/Admin/adminListClient";
import AdminListElectrician from "../pages/Admin/adminListElectrician";
import UserPrivateRoute from "../components/ProtectedRoutes/userPrivateRoute";
import ElectricianPrivateRoute from "../components/ProtectedRoutes/electricianPrivateRoute";
import AdminPrivateRoute from "../components/ProtectedRoutes/adminPrivateRoute";
import CompletedWorks from "../pages/Users/completedWorks";
import ElectriciansBooking from "../pages/Users/electricianBooking";
import CompletedWorksElectricianSide from "../pages/Electricians/completedWorksElectricianSide";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin_login" element={<AdminLogin />} />
      <Route path="/client_login" element={<UserLogin />} />
      <Route path="/electrician_login" element={<ElectricianLogin />} />

      <Route
        path="/userHome"
        element={
          <UserPrivateRoute>
            <UserHome />
          </UserPrivateRoute>
        }
      />

      <Route
        path="/completedWorks"
        element={
          <UserPrivateRoute>
            <CompletedWorks />
          </UserPrivateRoute>
        }
      />

      <Route
        path="/electricianProfile"
        element={
          <ElectricianPrivateRoute>
            <ElectriciansProfileScreen />
          </ElectricianPrivateRoute>
        }
      />
      <Route
        path="/electricianBooking/:id"
        element={
          <UserPrivateRoute>
            <ElectriciansBooking />
          </UserPrivateRoute>
        }
      />
      <Route
        path="/electricianHome"
        element={
          <ElectricianPrivateRoute>
            <ElectriciansHomeScreen />
          </ElectricianPrivateRoute>
        }
      />

      <Route
        path="/electricianSideCompletedWorks"
        element={
          <ElectricianPrivateRoute>
            <CompletedWorksElectricianSide />
          </ElectricianPrivateRoute>
        }
      />

      <Route
        path="/clientScheduledWorks"
        element={
          <UserPrivateRoute>
            <ScheduledWorks />
          </UserPrivateRoute>
        }
      />
      <Route
        path="/userElectricianList"
        element={
          <UserPrivateRoute>
            <UserElectricianList />
          </UserPrivateRoute>
        }
      />

      <Route
        path="/electricianSideScheduledWorks"
        element={
          <ElectricianPrivateRoute>
            <ElectricianSideScheduledWorksScreen />
          </ElectricianPrivateRoute>
        }
      />

      <Route path="/clientElectricianChat" element={<Chat />} />

      <Route
        path="/electricianSavedPost"
        element={
          <ElectricianPrivateRoute>
            <SavedPosts />
          </ElectricianPrivateRoute>
        }
      />
      <Route
        path="/electricianMyPost"
        element={
          <ElectricianPrivateRoute>
            <MyPosts />
          </ElectricianPrivateRoute>
        }
      />

      <Route
        path="/MeetingHome"
        element={
          <ElectricianPrivateRoute>
            <MeetingHome />
          </ElectricianPrivateRoute>
        }
      />

      <Route
        path="/Meeting/:id"
        element={
          <ElectricianPrivateRoute>
            <MeetingCall />
          </ElectricianPrivateRoute>    
        }
      />

      <Route
        path="/adminHome"
        element={
          <AdminPrivateRoute>
            <AdminHome />
          </AdminPrivateRoute>
        }
      />
      <Route
        path="/adminListClient"
        element={
          <AdminPrivateRoute>
            <AdminListClient />
          </AdminPrivateRoute>
        }
      />
      <Route
        path="/adminListElectrician"
        element={
          <AdminPrivateRoute>
            <AdminListElectrician />
          </AdminPrivateRoute>
        }
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default Routers;
