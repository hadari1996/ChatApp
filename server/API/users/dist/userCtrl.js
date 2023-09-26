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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.allFriends = exports.MyAvatar = exports.login = exports.register = void 0;
var userModel_1 = require("./userModel");
var bcrypt_1 = require("bcrypt");
var saltRounds = 10;
function register(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, password, confirmPassword, name, email, userNameCheck, emailCheck, error, salt, hash, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, password = _a.password, confirmPassword = _a.confirmPassword, name = _a.name, email = _a.email;
                    console.log(password, confirmPassword, name, email);
                    return [4 /*yield*/, userModel_1["default"].findOne({ name: name })];
                case 1:
                    userNameCheck = _b.sent();
                    if (userNameCheck)
                        throw new Error("Username already used");
                    return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
                case 2:
                    emailCheck = _b.sent();
                    if (emailCheck) {
                        throw new Error("Email already used");
                    }
                    error = userModel_1.UserValidation.validate({
                        email: email,
                        password: password,
                        confirmPassword: confirmPassword
                    }).error;
                    if (error)
                        throw error;
                    salt = bcrypt_1["default"].genSaltSync(saltRounds);
                    hash = bcrypt_1["default"].hashSync(password, salt);
                    return [4 /*yield*/, userModel_1["default"].create({
                            name: name, email: email,
                            password: hash
                        })];
                case 3:
                    user = _b.sent();
                    console.log(user);
                    delete user.password;
                    res.send({ status: true, user: user });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    res.status(500).send({ error: error_1.message, status: false });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, password, name, userLogin, isMatchedPassword, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, password = _a.password, name = _a.name;
                    console.log(password, name);
                    return [4 /*yield*/, userModel_1["default"].findOne({ name: name })];
                case 1:
                    userLogin = _b.sent();
                    if (!userLogin)
                        throw new Error("Username does not exist or password not matched ");
                    return [4 /*yield*/, bcrypt_1["default"].compare(password, userLogin.password)];
                case 2:
                    isMatchedPassword = _b.sent();
                    if (!isMatchedPassword)
                        throw new Error("Username does not exist or password not matched ");
                    delete userLogin.password;
                    res.send({ status: true, userLogin: userLogin });
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    res.status(500).send({ error: error_2.message, status: false });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function MyAvatar(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, avatarImg, userInfo, editedImageDB, avatarIsSet, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    userId = req.body.userId;
                    avatarImg = req.body.img;
                    return [4 /*yield*/, userModel_1["default"].findOne({ _id: userId })];
                case 1:
                    userInfo = _a.sent();
                    if (!userInfo)
                        throw new Error("no user found");
                    userInfo.avatarImage = avatarImg;
                    userInfo.isAvatarImageSet = true;
                    return [4 /*yield*/, userInfo.save()];
                case 2:
                    editedImageDB = _a.sent();
                    avatarIsSet = userInfo.isAvatarImageSet;
                    console.log(userInfo.isAvatarImageSet);
                    res.send({ avatarIsSet: avatarIsSet, avatarImage: userInfo.avatarImage });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.status(500).send({ error: error_3.message, status: false });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.MyAvatar = MyAvatar;
function allFriends(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var friends, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userModel_1["default"].find({ _id: { $ne: req.params.id } }).select(["email", "name", "avatarImage", "_id"])];
                case 1:
                    friends = _a.sent();
                    res.send(friends);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    res.status(500).send({ error: error_4.message, status: false });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.allFriends = allFriends;
