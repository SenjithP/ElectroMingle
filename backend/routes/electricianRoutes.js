import express from "express";
import {
  updateElectricianProfile,
  getDataToUpdateElectricianProfile,
  electricianSideScheduledWorks,
  changeWorkStatus,
  getElectricianDetails,
} from "../controllers/electricianController.js";
import electricianVerifyToken from "../Middlewares/electricianAuthenticationMiddleware.js";
const electricianRouter = express.Router();

electricianRouter.put(
  "/updateElectricianProfile",
  electricianVerifyToken,
  updateElectricianProfile
);

electricianRouter.get(
  "/getDataToUpdateElectricianProfile",
  electricianVerifyToken,
  getDataToUpdateElectricianProfile
);
electricianRouter.get(
  "/getClientScheduledWorksData",
  electricianVerifyToken,
  electricianSideScheduledWorks
);
electricianRouter.post(
  "/changeWorkStatus",
  electricianVerifyToken,
  changeWorkStatus
);
electricianRouter.get(
  "/getElectricianDetails",
  electricianVerifyToken,
  getElectricianDetails
);

export default electricianRouter;
