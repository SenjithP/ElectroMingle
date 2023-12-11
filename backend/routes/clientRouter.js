import express from 'express';
import { getElectriciansList, getSingleElectriciansData,getScheduledWorksData, makePayment,updateWorkStatus } from '../controllers/clientController.js';
import { electricianBooking } from '../controllers/electricianBookingController.js';
const clientRouter = express.Router();

clientRouter.post("/makePayment",makePayment)
clientRouter.post("/updateWorkStatus",updateWorkStatus)

clientRouter.get("/getElectricians",getElectriciansList);
clientRouter.get("/getSingleElectriciansData",getSingleElectriciansData);
clientRouter.get("/getScheduledWorksData",getScheduledWorksData)

clientRouter.post("/electricianBooking",electricianBooking)


export default clientRouter
