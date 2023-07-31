import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { CorsOptions } from "./config/corsOptions";

dotenv.config();

export const app = express();
const socket = require(`socket.io`);

const cors = require("cors");

app.use(cors(CorsOptions));

const PORT = process.env.PORT;
const httpServer = createServer(app);
const MONGO_URI = process.env.MONGO_URI;

 mongoose.set("strictQuery", true);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("mongoose Error");
    console.log(error.message);
  });

import userRoutes from "./API/users/userRoutes";
app.use("/api/v1/users", userRoutes);
// app.use(`/users`, userRoutes);

import messagesRoutes from "./API/messages/messagesRoutes";

app.use("/api/v1/messages", messagesRoutes);
// app.use("http://localhost:4000/messages", messagesRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is listening in PORT ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    Credential: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId: any) => {
    global.onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log("this is from server socket");
    const sendUserSocket = global.onlineUsers.get(data.to);

    if (sendUserSocket) {
      socket
        .to(sendUserSocket)
        .emit("msg-recieve", data.message, data.createdDate);
    }
  });
});
