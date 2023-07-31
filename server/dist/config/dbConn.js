"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI;
// mongoose.set("strictQuery", true);
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log("Connected to DB");
})
    .catch((error) => {
    console.log("mongoose Error");
    console.log(error.message);
});
//# sourceMappingURL=dbConn.js.map