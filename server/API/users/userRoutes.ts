import express from "express";
import {
  login,
  register,
  MyAvatar,
  allFriends,
  getUserByCookie,
  logout,
} from "./userCtrl";

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/MyAvatar", MyAvatar)
  .get("/allFriends/:id", allFriends)
  .get("/get-user-by-cookie/:sesStor", getUserByCookie)
  .get("/logout", logout);

export default router;
