import express from "express";
import {
  register,
  sendOtp,
  electricianLogout,
  userLogout,
  clientLogin,
  electricianLogin,
  authGoogle
} from "../controllers/authController.js";
import userVerifyToken from "../Middlewares/userAuthenticationMiddleware.js";
import electricianVerifyToken from "../Middlewares/electricianAuthenticationMiddleware.js";

const authRouter = express.Router();

authRouter.post("/google",authGoogle)

authRouter.post("/register", register);
authRouter.post("/sendOtp", sendOtp);
sendOtp
authRouter.post("/client_login", clientLogin);
authRouter.post("/electrician_login", electricianLogin);

authRouter.post("/electricianLogout",electricianVerifyToken, electricianLogout);
authRouter.post("/userLogout",userVerifyToken, userLogout);

export default authRouter;
