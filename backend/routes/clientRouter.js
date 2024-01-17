import express from "express";
import {
  getElectriciansList,
  getSingleElectriciansData,
  getScheduledWorksData,
  makePayment,
  updateWorkStatus,
  clientElectricianReview,
  getElectriciansReviews,
} from "../controllers/clientController.js";
import { electricianBooking } from "../controllers/electricianBookingController.js";
import userVerifyToken from "../Middlewares/userAuthenticationMiddleware.js";
const clientRouter = express.Router();

clientRouter.post("/makePayment", userVerifyToken, makePayment);
clientRouter.post("/updateWorkStatus", userVerifyToken, updateWorkStatus);

clientRouter.get("/getElectricians", userVerifyToken, getElectriciansList);
clientRouter.get(
  "/getSingleElectriciansData",
  userVerifyToken,
  getSingleElectriciansData
);
clientRouter.get(
  "/getScheduledWorksData",
  userVerifyToken,
  getScheduledWorksData
);

clientRouter.post("/electricianBooking", userVerifyToken, electricianBooking);

clientRouter.post(
  "/clientElectricianReview",
  userVerifyToken,
  clientElectricianReview
);
clientRouter.get(
  "/getElectriciansReviews",
  userVerifyToken,
  getElectriciansReviews
);

export default clientRouter;
