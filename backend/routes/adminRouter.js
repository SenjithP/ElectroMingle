import express from "express";
import {
  adminLogin,
  adminGetUserDetails,
  adminClientBlockUnblock,
  adminGetElectricianDetails,
  adminElectricianBlockUnblock,
  adminLogout,
  adminDashboardData,
} from "../controllers/Admin/adminController.js";
import adminVerifyToken from "../Middlewares/adminAuthenticationMiddleware.js";

const adminRouter = express.Router();
adminRouter.post("/adminLogin", adminLogin);
adminRouter.get(
  "/adminGetClientDetails",
  adminVerifyToken,
  adminGetUserDetails
);
adminRouter.get("/adminDashboardData", adminVerifyToken, adminDashboardData);
adminRouter.post(
  "/adminClientBlock_Unblock",
  adminVerifyToken,
  adminClientBlockUnblock
);

adminRouter.get(
  "/adminElectricianDetails",
  adminVerifyToken,
  adminGetElectricianDetails
);
adminRouter.post(
  "/adminElectricianBlock_Unblock",
  adminVerifyToken,
  adminElectricianBlockUnblock
);

adminRouter.post("/adminLogout", adminVerifyToken, adminLogout);

export default adminRouter;
