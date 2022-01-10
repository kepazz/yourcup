import express from "express";
import expressAsyncHandler from "express-async-handler";

import Brand from "../models/brandModel.js";
import Product from "../models/productModel.js";

import { isAdmin, isAuth } from "../utils.js";

const brandRouter = express.Router();

brandRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const brands = await Brand.find({}).populate("products");
    res.send(brands);
  })
);

brandRouter.post(
  "/addBrand",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
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

    const brandInfo = await Brand.findOne({ name: req.params.brand }).populate(
      "products"
    );
    if (brandInfo) {
      res.send(brandInfo);
    } else {
      res.status(404).send({ message: "Brand does not exist " });
    }
  })
);

brandRouter.post(
  "/productAdd",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const brand = await Brand.findOne({ name: req.body.brand });

    brand.save(function (err) {
      if (err) return err;
      const newProduct = new Product({
        name: req.body.name,
        brand: brand._id,
        price: req.body.price,
        sellingPrice: req.body.price,
        packageSize: req.body.packageSize,
        image: req.body.image,
        description: req.body.description,
        type: req.body.type,
        species: req.body.species,
        sale: false,
        saleAmount: 30,
        comments: [],
      });
      newProduct.save(function (err) {
        if (err) return err;
      });
      brand.products.push(newProduct._id);
      brand.save();
    });

    res.send(brand);
  })
);

brandRouter.delete(
  "/brandDelete",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const brandDelete = Brand.findOne({ _id: req.body.brandId });

    if (brandDelete) {
      Brand.findByIdAndRemove({ _id: req.body.brandId }, (err) => {
        if (err) res.status(404).send(err);
        else res.send({ message: `Deleted ${req.body.brandId}` });
      });
    } else {
      res.status(404).send({ message: "Something went wrong " });
    }
  })
);

export default brandRouter;
