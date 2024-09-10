import express from "express";
import { signIn, signUp } from "../../services/user/userServices";

const userController = express.Router();

userController.post("/signup", (req, res) => {
  return signUp(req, res);
});

userController.post("/signin", (req, res) => {
  return signIn(req, res);
});
export default userController;
