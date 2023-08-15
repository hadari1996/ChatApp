"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import Joi from 'Joi';
// import {joiPasswordExtendCore } from "joi-password";
// const JoiPassword= Joi.extend(joiPasswordExtendCore);
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // confirmPassword:{type:String, required:true},
    isAvatarImageSet: { type: Boolean, default: false },
    avatarImage: { type: String, default: "" },
});
const UserModel = mongoose_1.default.model("users", UserSchema);
// export const UserValidation= Joi.object ({
//     email: Joi.string().email().required(),
//     password:JoiPassword
//             .string()
//             .min(2)
//             .max(16)
//             .minOfNumeric(1)
//             .minOfLowercase(1)
//             .minOfUppercase(1)
//             .required(),
//             confirmPassword: Joi.ref('password'),
// })
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map