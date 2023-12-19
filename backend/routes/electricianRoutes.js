import express from 'express';
import { updateElectricianProfile,getDataToUpdateElectricianProfile, electricianSideScheduledWorks, changeWorkStatus,getElectricianDetails } from "../controllers/electricianController.js";
import {  profilePhotosUpload } from '../utils/multer.js';
const electricianRouter = express.Router();
// import { multerUploadElectricianProfile } from '../mongodb/multerConfig.js';


electricianRouter.put(
  "/updateElectricianProfile",
  profilePhotosUpload,
  
  updateElectricianProfile
);
electricianRouter.get("/getDataToUpdateElectricianProfile",getDataToUpdateElectricianProfile)
electricianRouter.get("/getClientScheduledWorksData",electricianSideScheduledWorks)
electricianRouter.post("/changeWorkStatus",changeWorkStatus)
electricianRouter.get("/getElectricianDetails",getElectricianDetails)




export default electricianRouter
