import express from "express";
import expressAsyncHandler from "express-async-handler";

import Brand from "../models/brandModel.js";
import Product from "../models/productModel.js";

import { isAdmin, isAuth } from "../utils.js";

const brandRouter = express.Router();

brandRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.type);

    const brands = await Brand.find({});
    res.send(brands);
  })
);

brandRouter.post(
  "/addBrand",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body.content);
    const brandNew = new Brand({
      name: req.body.name,
      description: req.body.description,
    });
    await brandNew.save();
    res.send("New article was added");
  })
);

brandRouter.get(
  "/:brand",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.brand);
    const brandInfo = await Brand.findOne({ name: req.params.brand });
    if (brandInfo) {
      const productsInfo = await Product.find({ brand: req.params.brand });
      res.send({ brandData: brandInfo, productsData: productsInfo });
    } else {
      res.status(404).send({ message: "Brand does not exist " });
    }
  })
);

export default brandRouter;
