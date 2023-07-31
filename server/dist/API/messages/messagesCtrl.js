"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMessage = exports.addMessage = void 0;
const messagesModel_1 = __importDefault(require("./messagesModel"));
function addMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { from, to, message, createdDate } = req.body;
            const data = yield messagesModel_1.default.create({
                message: { text: message },
                users: [from, to],
                from: from,
                createdDate: createdDate
            });
            if (data)
                return res.send({ msg: "Message addedd successfully" });
            throw new Error("Failed to add message to DB ");
        }
        catch (error) {
            res.status(500).send({ error: error.message, status: false });
        }
    });
}
exports.addMessage = addMessage;
function getAllMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { from, to } = req.body;
            const messages = yield messagesModel_1.default.find({
                users: {
                    $all: [from, to],
                }
            }).sort({ updateAt: 1 });
            const allMessages = messages.map((msg) => {
                return {
                    fromSelf: msg.from.toString() === from,
                    message: msg.message.text,
                    createdDate: msg.createdDate
                };
            });
            res.send(allMessages);
        }
        catch (error) {
            res.status(500).send({ error: error.message, status: false });
        }
    });
}
exports.getAllMessage = getAllMessage;
//# sourceMappingURL=messagesCtrl.js.map