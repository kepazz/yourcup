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
    //const brandInfo = await Brand.findOne({ name: req.params.brand });
    const brandInfo = await Brand.findOne({ name: req.params.brand }).populate(
      "products"
    );
    if (brandInfo) {
      //const productsInfo = await Product.find({ brand: req.params.brand });
      //res.send({ brandData: brandInfo, productsData: productsInfo });
      //console.log(brandInfo)
      res.send(brandInfo);
    } else {
      res.status(404).send({ message: "Brand does not exist " });
    }
  })
);

brandRouter.post(
  "/test",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    //console.log(req.body)
    const brand = await Brand.findOne({ name: req.body.brand });

    brand.save(function (err) {
      if (err) return err;
      const newProduct = new Product({
        name: req.body.name,
        brand: brand._id,
        price: req.body.price,
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
    //console.log(brand);
    res.send(brand);
  })
);

export default brandRouter;
