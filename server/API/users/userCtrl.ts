import UserModel, { UserValidation } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";
const saltRounds = 10;
export async function register(req, res) {
  try {
    const { password, confirmPassword, name, email } = req.body;
    const userNameCheck = await UserModel.findOne({ name });
    if (userNameCheck) throw new Error("Username already used");
    const emailCheck = await UserModel.findOne({ email });
    if (emailCheck) {
      throw new Error("Email already used");
    }
    const { error } = UserValidation.validate({
      email,
      password,
      confirmPassword,
    });
    if (error) throw error;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      name,
      email,
      password: hash,
    });
    const cookie = { userId: user._id };
    const secret = process.env.SECRET;
    user.password = undefined;
    if (!secret) throw new Error("couldn't find secret from .env");
    const JWTCookie = jwt.encode(cookie, secret);
    if (user) {
      res.cookie("userID", JWTCookie);
      res.send({ status: true, user: user });
    } else {
      res.send({ status: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function login(req, res) {
  try {
    const { password, name } = req.body;
    const userLogin = await UserModel.findOne({ name });
    if (!userLogin)
      throw new Error("Username does not exist or password not matched ");
    const isMatchedPassword = await bcrypt.compare(
      password,
      userLogin.password
    );
    if (!isMatchedPassword)
      throw new Error("Username does not exist or password not matched ");
    const cookie = { userId: userLogin._id }; // {userId: 5654sdvsv}
    const secret = process.env.SECRET;
    userLogin.password = undefined;
    if (!secret) throw new Error("couldn't find secret from .env");
    const JWTCookie = jwt.encode(cookie, secret);
    if (userLogin) {
      res.cookie("userID", JWTCookie);
      res.send({ status: true, userLogin: userLogin });
    } else {
      res.send({ status: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function MyAvatar(req, res) {
  try {
    const userId = req.body.userId;
    const avatarImg = req.body.img;
    const userInfo = await UserModel.findOne({ _id: userId });
    if (!userInfo) throw new Error("no user found");
    userInfo.avatarImage = avatarImg;
    userInfo.isAvatarImageSet = true;
    const editedImageDB = await userInfo.save();
    const avatarIsSet = userInfo.isAvatarImageSet;
    res.send({
      avatarIsSet: userInfo.isAvatarImageSet,
      avatarImage: userInfo.avatarImage,
    });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function allFriends(req, res) {
  try {
    const friends = await UserModel.find({
      _id: { $ne: req.params.id },
    }).select(["email", "name", "avatarImage", "_id"]);
    // console.log(typeof(friends));
    // console.log(friends);
    res.send({ friends: friends });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function getUserByCookie(req, res) {
  try {
    const { userID } = req.cookies;
    if (!userID) throw new Error("no cookie found");
    const secret = process.env.SECRET;
    if (!secret) throw new Error("couldn't find secret from .env");
    const decodedUserID = jwt.decode(userID, secret);
    const { userId } = decodedUserID;
    if (!userId) throw new Error("couldn`t find user from cookies");
    const userDB = await UserModel.findById(userId);
    if (!userDB)
      throw new Error(`Couldn't find user id with the id: ${userId}`);
    res.send({ login: true, userDB, userId });
  } catch (error) {
    res.send({ error: error.message });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("userID");
    res.send({ logout: true });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
