import express from "express";
import { getCallId, saveCallId } from "../controllers/meetingController.js";
import electricianVerifyToken from "../Middlewares/electricianAuthenticationMiddleware.js";

const meetingRouter = express.Router();

meetingRouter.post("/save_call_id", electricianVerifyToken, saveCallId);
meetingRouter.get("/get_call_id/:id", electricianVerifyToken, getCallId);

export default meetingRouter;
