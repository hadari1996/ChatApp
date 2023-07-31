"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messagesCtrl_1 = require("./messagesCtrl");
const router = express_1.default.Router();
router
    .post('/addMessage', messagesCtrl_1.addMessage)
    .post('/getAllMessage', messagesCtrl_1.getAllMessage);
exports.default = router;
//# sourceMappingURL=messagesRoutes.js.map