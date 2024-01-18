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
import cloudinary from "cloudinary";
import http from "http";
import { Server } from "socket.io";
import path from "path";
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir)

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDAPISECERET,
});

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://www.electromingle.senjith.shop",
  },
});

// Socket.IO logic
let activeUsers = [];

io.on("connection", (socket) => {
  // add new User
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }
    io.emit("get-users", activeUsers);
  });

  socket.on('new-booking', (bookingData) => {
    console.log('New Booking Received', bookingData);
    io.emit('notify-worker', { message: 'New booking received!', bookingData });
  });

  socket.on('booking-status', (bookingStatus) => {
    console.log('Booking Status Changed', bookingStatus);
    io.emit('notify-user', { message: 'Booking Status Changed!', bookingStatus });
  });

  socket.on('new-payment', (paymentData) => {
    console.log('New payment Received', paymentData);
    io.emit('notify-worker-payment', { message: 'New Payment received!', paymentData });
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId)
    console.log("Data: ", data)
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
});

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
}));
app.use(express.static("public"));

app.use("/api/auth", authRoute);
app.use("/api/electricians", electricianRoute);
app.use("/api/client", clientRouter);
app.use("/api/electriciansPosts", postRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message/", messageRouter);
app.use("/api/meeting", meetingRouter);
app.use("/api/admin", adminRouter);

const enviornment = "production"

if (enviornment === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(parentDir, '/frontend/dist')));

    app.get('*', (req, res) =>
      res.sendFile(path.resolve(parentDir, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }         

 
const port = process.env.PORT || 5000;

server.listen(port, () => {
  connect();
  console.log(`Backend server started successfully, http://localhost:${port}`);
});
