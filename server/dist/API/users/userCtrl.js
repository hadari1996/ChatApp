"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.logout = exports.getUserByCookie = exports.allFriends = exports.MyAvatar = exports.login = exports.register = void 0;
const userModel_1 = __importStar(require("./userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const saltRounds = 10;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { password, confirmPassword, name, email } = req.body;
            const userNameCheck = yield userModel_1.default.findOne({ name });
            if (userNameCheck)
                throw new Error("Username already used");
            const emailCheck = yield userModel_1.default.findOne({ email });
            if (emailCheck) {
                throw new Error("Email already used");
            }
            const { error } = userModel_1.UserValidation.validate({
                email,
                password,
                confirmPassword,
            });
            if (error)
                throw error;
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hash = bcrypt_1.default.hashSync(password, salt);
            const user = yield userModel_1.default.create({
                name,
                email,
                password: hash,
            });
            const cookie = { userId: user._id };
            const secret = process.env.SECRET;
            user.password = undefined;
            if (!secret)
                throw new Error("couldn't find secret from .env");
            const JWTCookie = jwt_simple_1.default.encode(cookie, secret);
            if (user) {
                // res.cookie("userID", JWTCookie);
                res.send({ status: true, user: user, JWTCookie: JWTCookie });
            }
            else {
                res.send({ status: false });
            }
        }
        catch (error) {
            res.status(500).send({ error: error.message, status: false });
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { password, name } = req.body;
            const userLogin = yield userModel_1.default.findOne({ name });
            if (!userLogin)
                throw new Error("Username does not exist or password not matched ");
            const isMatchedPassword = yield bcrypt_1.default.compare(password, userLogin.password);
            if (!isMatchedPassword)
                throw new Error("Username does not exist or password not matched ");
            const cookie = { userId: userLogin._id }; // {userId: 5654sdvsv}
            const secret = process.env.SECRET;
            userLogin.password = undefined;
            if (!secret)
                throw new Error("couldn't find secret from .env");
            const JWTCookie = jwt_simple_1.default.encode(cookie, secret);
            if (userLogin) {
                // res.cookie("userID", JWTCookie);
                res.send({ status: true, userLogin: userLogin, JWTCookie: JWTCookie });
            }
            else {
                res.send({ status: false });
            }
        }
        catch (error) {
            res.status(500).send({ error: error.message, status: false });
        }
    });
}
exports.login = login;
function MyAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.body.userId;
            const avatarImg = req.body.img;
            const userInfo = yield userModel_1.default.findOne({ _id: userId });
            if (!userInfo)
                throw new Error("no user found");
            userInfo.avatarImage = avatarImg;
            userInfo.isAvatarImageSet = true;
            const editedImageDB = yield userInfo.save();
            const avatarIsSet = userInfo.isAvatarImageSet;
            res.send({
                avatarIsSet: userInfo.isAvatarImageSet,
                avatarImage: userInfo.avatarImage,
            });
        }
        catch (error) {
            res.status(500).send({ error: error.message, status: false });
        }
    });
}
exports.MyAvatar = MyAvatar;
function allFriends(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const friends = yield userModel_1.default.find({
                _id: { $ne: req.params.id },
            }).select(["email", "name", "avatarImage", "_id"]);
            res.send({ friends: friends });
        }
        catch (error) {
            res.status(500).send({ error: error.message, status: false });
        }
    });
}
exports.allFriends = allFriends;
function getUserByCookie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userID = req.params.sesStor;
            // const { userID } = req.cookies;
            // if (!userID) throw new Error("no cookie found");
            if (!userID)
                throw new Error("no cookie found");
            const secret = process.env.SECRET;
            if (!secret)
                throw new Error("couldn't find secret from .env");
            const decodedUserID = jwt_simple_1.default.decode(userID, secret);
            const { userId } = decodedUserID;
            if (!userId)
                throw new Error("couldn`t find user from cookies");
            const userDB = yield userModel_1.default.findById(userId);
            if (!userDB)
                throw new Error(`Couldn't find user id with the id: ${userId}`);
            res.send({ login: true, userDB, userId });
        }
        catch (error) {
            res.send({ error: error.message });
        }
    });
}
exports.getUserByCookie = getUserByCookie;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // res.clearCookie("userID");
            res.send({ logout: true });
        }
        catch (error) {
            res.status(500).send({ error: error.message });
        }
    });
}
exports.logout = logout;
//# sourceMappingURL=userCtrl.js.map