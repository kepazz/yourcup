import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
          favorites: user.favorites,
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const newUser = await user.save();
    res.send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser),
      favorites: user.favorites,
    });
  })
);

userRouter.put(
  "/update",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        user.password = bcrypt.hashSync(req.body.newPassword, 8);
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser),
          favorites: user.favorites,
        });
      } else {
        res.status(401).send({ message: "Invalid password" });
      }
    }
  })
);

userRouter.post(
  "/favoriteAdd",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.favorites.push({ product: req.body.productId });
      await user.save();
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
        favorites: user.favorites,
      });
    } else {
      res.status(401).send({ message: "Something went wrong" });
    }
  })
);

userRouter.delete(
  "/favoriteDelete",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      let temp = 0;
      let favoriteIndex = 0;
      user.favorites.forEach((favorite) => {
        temp++;
        if (favorite.product == req.body.productId) {
          favoriteIndex = temp - 1;
        }
      });
      user.favorites.splice(favoriteIndex, 1);
      await user.save();
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
        favorites: user.favorites,
      });
    } else {
      res.status(401).send({ message: "Something went wrong" });
    }
  })
);

export default userRouter;
