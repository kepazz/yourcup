import express from "express";
import expressAsyncHandler from "express-async-handler";

import Product from "../models/productModel.js";
import Brand from "../models/brandModel.js";
import { isAdmin, isAuth } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/category/:type",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params.type);
    if (req.params.type === "drinks") {
      const productUnit = await Product.find({
        type: { $in: ["coffee", "tea"] },
      });
      res.send(productUnit);
    }

    //const productUnit = await Product.aggregate([{$match : {type: req.params.type}}, {$sample: {size:3}}])
    //res.send(productUnit);
  })
);

productRouter.get(
  "/threeRandom",
  expressAsyncHandler(async (req, res) => {
    //const productUnit = await Product.aggregate([{$sample: {size:3}}]);
    const productUnit = await Product.aggregate([
      { $sample: { size: 3 } },
      {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brands",
        },
      },
      { $unwind: "$brands" },
      { $project: { brand: "$brands.name", name: 1, image: 1 } },
    ]);
    //console.log(productUnit);
    res.send(productUnit);
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params);
    //const productUnit = await Product.findById(req.params.id);
    const productUnit = await Product.findById(req.params.id).populate(
      "brand",
      "name"
    );
    if (productUnit) {
      res.send(productUnit);
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.post(
  "/:id/comment",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      const comment = {
        comment: req.body.comment,
        name: req.user.name,
        user: req.user._id,
      };
      product.comments.push(comment);
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Comment added",
        comment: updatedProduct.comments,
      });
    } else {
      res.status(404).send({ message: "Failed" });
    }
  })
);

productRouter.delete(
  "/:id/comments",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const commentId = req.body.commentId;
    const product = await Product.findById(productId);
    if (product) {
      let temp = 0;
      let commentIndex = 0;
      product.comments.forEach((comment) => {
        temp++;
        if (comment._id == commentId) {
          commentIndex = temp - 1;
          console.log(`comment index = ${commentIndex}`);
        }
      });
      product.comments.splice(commentIndex, 1);
      const productInfo = await product.save();
      res.status(201).send({
        message: "Comment deleted",
        productInfoAfterChange: productInfo,
      });
    } else {
      res.status(404).send({ message: "Comment does not exist ?" });
    }
  })
);

productRouter.post(
  "/favorites",
  expressAsyncHandler(async (req, res) => {
    const favorites = req.body;
    let temp = [];

    favorites.forEach((item) => temp.push(item.product));
    const productUnit = await Product.find({ _id: { $in: temp } });
    res.send(productUnit);
  })
);

productRouter.post(
  "/addNew",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log("---------hello -------");
    console.log(req.body.price);

    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
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
    const newProduct = await product.save();
    res.send(newProduct);
  })
);

productRouter.put(
  "/update",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productFound = await Product.findOne({ _id: req.body.id });
    if (productFound) {
      productFound.name = req.body.name;
      //productFound.brand = req.body.brand;
      productFound.price = req.body.price;
      productFound.packageSize = req.body.packageSize;
      productFound.image = req.body.image;
      productFound.type = req.body.type;
      productFound.description = req.body.description;
      productFound.species = req.body.species;
      productFound.sale = req.body.sale;
      productFound.saleAmount = req.body.saleAmount;
      await productFound.save();

      res.send(productFound);
    } else {
      res.status(404).send({ message: "Something went wrong " });
    }
  })
);

productRouter.delete(
  "/deleteProduct",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    //const deletedProduct = await Product.findByIdAndDelete(req.params.productId)

    Brand.findOneAndUpdate({_id: req.body.brandId}, {
      $pull:{
        'products': req.body.productId
      }
    }, function (err){
      if(!err){
        Product.findByIdAndRemove({_id: req.body.productId}, (err) => {
          if (err) res.status(404).send(err)
          else res.send({message: `Deleted ${req.body.productId}`})
        })
      }
      
    })
    
  })
  
);

export default productRouter;
