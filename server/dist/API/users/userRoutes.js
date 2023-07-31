"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userCtrl_1 = require("./userCtrl");
const router = express_1.default.Router();
router
    .post("/register", userCtrl_1.register)
    .post("/login", userCtrl_1.login)
    .post("/MyAvatar", userCtrl_1.MyAvatar)
    .get("/allFriends/:id", userCtrl_1.allFriends)
    .get("/get-user-by-cookie/:sesStor", userCtrl_1.getUserByCookie)
    .get("/logout", userCtrl_1.logout);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map