import express from "express";
import dotenv from "dotenv";
import { connect } from "./Config/mongodbConfig.js";
import authRoute from "./routes/auth.js";
import electricianRoute from "./routes/electricianRoutes.js";
import clientRouter from "./routes/clientRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRouter from "./routes/postRouter.js";
import chatRouter from "./routes/chatRouter.js";
import messageRouter from "./routes/messageRouter.js";
import meetingRouter from "./routes/meetingRouter.js";
import adminRouter from "./routes/adminRouter.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: true,
};
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static("public"));

app.use("/api/auth", authRoute);
app.use("/api/electricians", electricianRoute);
app.use("/api/client", clientRouter);
app.use("/api/electriciansPosts", postRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message/", messageRouter);
app.use("/api/meeting", meetingRouter);
app.use("/api/admin",adminRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connect();
  console.log(`backend server started sucessfully, http://localhost:${port}`);
});
 