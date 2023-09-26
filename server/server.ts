import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { corsOptions } from "./config/corsOptions";
dotenv.config();

const app = express();
const socket = require(`socket.io`);

const cors = require("cors");
app.use(cors(corsOptions));

const PORT = process.env.PORT;
const httpServer = createServer(app);
const MONGO_URI = process.env.MONGO_URI;
mongoose.set("strictQuery", true);
app.use(express.json());

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

import messagesRoutes from "./API/messages/messagesRoutes";

app.use("/api/v1/messages", messagesRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is listening in PORT ${PORT}`);
});

const io = socket(server, {
  cors: {
    // origin: corsOptions,
    origin: "*",

    // Credential: true,

    Credential: false,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId: number) => {
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
