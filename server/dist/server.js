"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const socket = require(`socket.io`);
const cors = require("cors");
const PORT = process.env.PORT;
const httpServer = (0, http_1.createServer)(exports.app);
// const MONGO_URI = process.env.MONGO_URI;
// mongoose.set("strictQuery", true);
exports.app.use(express_1.default.json());
exports.app.use(cors(corsOptions_1.CorsOptions));
exports.app.use((0, cookie_parser_1.default)());
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((error) => {
//     console.log("mongoose Error");
//     console.log(error.message);
//   });
const userRoutes_1 = __importDefault(require("./API/users/userRoutes"));
exports.app.use("/api/v1/users", userRoutes_1.default);
// app.use(`/users`, userRoutes);
const messagesRoutes_1 = __importDefault(require("./API/messages/messagesRoutes"));
const corsOptions_1 = require("./config/corsOptions");
exports.app.use("/api/v1/messages", messagesRoutes_1.default);
// app.use("http://localhost:4000/messages", messagesRoutes);
const server = exports.app.listen(PORT, () => {
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
    socket.on("add-user", (userId) => {
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
//# sourceMappingURL=server.js.map