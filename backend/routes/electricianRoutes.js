import express from 'express';
import { updateElectricianProfile,getDataToUpdateElectricianProfile, electricianSideScheduledWorks, changeWorkStatus } from "../controllers/electricianController.js";
const electricianRouter = express.Router();
// import { multerUploadElectricianProfile } from '../mongodb/multerConfig.js';


electricianRouter.put("/updateElectricianProfile",updateElectricianProfile);
electricianRouter.get("/getDataToUpdateElectricianProfile",getDataToUpdateElectricianProfile)
electricianRouter.get("/getClientScheduledWorksData",electricianSideScheduledWorks)
electricianRouter.post("/changeWorkStatus",changeWorkStatus)




export default electricianRouter
