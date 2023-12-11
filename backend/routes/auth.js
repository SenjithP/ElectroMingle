import express from "express";
import {
  register,
  electricianLogout,
  userLogout,
  shopLogout,
  clientLogin,
  electricianLogin,
  authGoogle
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/google",authGoogle)

authRouter.post("/register", register);
authRouter.post("/client_login", clientLogin);
authRouter.post("/electrician_login", electricianLogin);

authRouter.post("/electricianLogout", electricianLogout);
authRouter.post("/userLogout", userLogout);
authRouter.post("/shopLogout", shopLogout);

export default authRouter;
