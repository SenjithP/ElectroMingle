import express from "express";
import { adminLogin, adminGetUserDetails,adminClientBlockUnblock,adminGetElectricianDetails,adminElectricianBlockUnblock, adminLogout } from "../controllers/Admin/adminController.js";

const adminRouter = express.Router();
adminRouter.post("/adminLogin", adminLogin);
adminRouter.get("/adminGetClientDetails",adminGetUserDetails)
adminRouter.post("/adminClientBlock_Unblock",adminClientBlockUnblock)

adminRouter.get("/adminElectricianDetails",adminGetElectricianDetails)
adminRouter.post("/adminElectricianBlock_Unblock",adminElectricianBlockUnblock)

adminRouter.post("/adminLogout", adminLogout);


export default adminRouter;
