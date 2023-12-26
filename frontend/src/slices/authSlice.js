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
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
  },
});

export const {
  setClientCredentials,
  setElectricianCredentials,
  userLogout,
  electricianLogout,
} = authSlice.actions;
export default authSlice.reducer;

