import express from 'express';
import { getElectriciansList, getSingleElectriciansData,getScheduledWorksData, makePayment,updateWorkStatus,clientElectricianReview,getElectriciansReviews } from '../controllers/clientController.js';
import { electricianBooking } from '../controllers/electricianBookingController.js';
const clientRouter = express.Router();

clientRouter.post("/makePayment",makePayment)
clientRouter.post("/updateWorkStatus",updateWorkStatus)

clientRouter.get("/getElectricians",getElectriciansList);
clientRouter.get("/getSingleElectriciansData",getSingleElectriciansData);
clientRouter.get("/getScheduledWorksData",getScheduledWorksData)

clientRouter.post("/electricianBooking",electricianBooking)

clientRouter.post("/clientElectricianReview",clientElectricianReview)
clientRouter.get("/getElectriciansReviews",getElectriciansReviews)



export default clientRouter
