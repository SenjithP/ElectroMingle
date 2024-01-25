import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: (() => {
    try {
      return JSON.parse(localStorage.getItem("userInfo")) || null;
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      return null;
    }
  })(),
  electricianInfo: (() => {
    try {
      return JSON.parse(localStorage.getItem("electricianInfo")) || null;
    } catch (error) {
      console.error("Error parsing electricianInfo from localStorage:", error);
      return null;
    }
  })(),
  adminInfo: (() => {
    try {
      return JSON.parse(localStorage.getItem("adminInfo")) || null;
    } catch (error) {
      console.error("Error parsing electricianInfo from localStorage:", error);
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    setClientCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    setElectricianCredentials: (state, action) => {
      state.electricianInfo = action.payload;
      localStorage.setItem("electricianInfo", JSON.stringify(action.payload));
    },
    userLogout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    electricianLogout: (state, action) => {
      state.electricianInfo = null;
      localStorage.removeItem("electricianInfo");
    },
    adminLogout: (state, action) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const {
  setAdminCredentials,
  setClientCredentials,
  setElectricianCredentials,
  userLogout,
  electricianLogout,
  adminLogout
} = authSlice.actions;
export default authSlice.reducer;

