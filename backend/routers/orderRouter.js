import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import { isAdmin, isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingInformation: req.body.shippingInformation,
        paymentResult: req.body.paymentResult,
        itemsPrice: req.body.itemsPrice,
        priceVAT: req.body.priceVAT.toFixed(2),
        user: req.user._id,
        paidAt: Date.now(),
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "Order was created", order: createdOrder });
    }
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findOne({ "paymentResult.id": req.params.id });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order does not exist" });
    }
  })
);

orderRouter.get(
  "/user/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.find({ user: req.params.id });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "User has no orders" });
    }
  })
);

orderRouter.get(
  "/orders/:status",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.status);
    const orders = await Order.find({
      "paymentResult.status": req.params.status,
    });
    res.send(orders);
  })
);

orderRouter.put(
  "/status/change",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orderChanging = await Order.findOne({
      "paymentResult.id": req.body.orderId,
    });
    if (orderChanging) {
      orderChanging.paymentResult.status = req.body.orderNewStatus;
      await orderChanging.save();
      res.send(req.body.orderId);
    } else {
      res.status(404).send({ message: `There was an error ?` });
    }
  })
);

orderRouter.put(
  "/status/userChange",
  isAuth,
  expressAsyncHandler(async (req, res) => {

    console.log(req.user._id)
    const user = await User.findById(req.user._id);
    if (user) {
      const order = await Order.findOne({ "paymentResult.id": req.body.orderId });
      if (order) {
        console.log(req.user._id)
        console.log(order.user.toString())
        if (req.user._id === order.user.toString()) {
          if (req.body.orderNewStatus === "cancelled") {
            order.paymentResult.status = req.body.orderNewStatus;
            order.cancelMessage = req.body.cancelMessage;
            await order.save();
            res.send(order);
          } else {
            order.paymentResult.status = "finished";
            await order.save();
            res.send(order);
          }
        } else {
          res.status(404).send({ message: `MIAU` });
        }
      }
    } else {
      res.status(404).send({ message: `rawr` });
    }
  })
);

orderRouter.get(
  "/:userId/summary",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const userInfo = await User.findOne({ _id: userId });
    if (userInfo) {
      const orders = await Order.find({ user: userId });
      let spend = 0;
      let vat = 0;
      let active = 0;
      let finished = 0;
      orders.forEach((item) => {
        if (
          item.paymentResult.status === "succeeded" ||
          item.paymentResult.status === "send"
        ) {
          active++;
        } else {
          finished++;
        }
        spend += item.itemsPrice;
        vat += item.priceVAT;
      });
      res.send({
        totalSpend: spend,
        totalVat: vat,
        activeOrders: active,
        finishedOrders: finished,
        userEmail: userInfo.email,
        userName: userInfo.name,
        userCreatedAt: userInfo.createdAt,
        orders,
      });
      console.log(active);
    } else {
      res.status(404).send({ message: `Such user does not exist ` });
    }
  })
);

export default orderRouter;
