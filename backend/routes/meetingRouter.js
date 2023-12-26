import express from "express";
import { getCallId, saveCallId } from "../controllers/meetingController.js";

const meetingRouter = express.Router();

meetingRouter.post("/save_call_id", saveCallId);
meetingRouter.get("/get_call_id/:id", getCallId);

export default meetingRouter;