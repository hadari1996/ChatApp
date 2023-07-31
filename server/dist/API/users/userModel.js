"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Joi_1 = __importDefault(require("Joi"));
const joi_password_1 = require("joi-password");
const JoiPassword = Joi_1.default.extend(joi_password_1.joiPasswordExtendCore);
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // confirmPassword:{type:String, required:true},
    isAvatarImageSet: { type: Boolean, default: false },
    avatarImage: { type: String, default: "" },
});
const UserModel = mongoose_1.default.model("users", UserSchema);
exports.UserValidation = Joi_1.default.object({
    email: Joi_1.default.string().email().required(),
    password: JoiPassword
        .string()
        .min(2)
        .max(16)
        .minOfNumeric(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .required(),
    confirmPassword: Joi_1.default.ref('password'),
});
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map