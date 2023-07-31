"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessagesSchema = new mongoose_1.default.Schema({
    createdDate: Date,
    message: {
        text: {
            type: String,
            required: true,
        },
    },
    users: Array,
    from: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const MessagesModel = mongoose_1.default.model("Messages", MessagesSchema);
exports.default = MessagesModel;
//# sourceMappingURL=messagesModel.js.map