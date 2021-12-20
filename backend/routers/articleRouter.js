import express from "express";
import expressAsyncHandler from "express-async-handler";
import Article from "../models/articleModel.js";

import { isAdmin, isAuth } from "../utils.js";

const articleRouter = express.Router();

articleRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    
    const articles = await Article.find({}, "title image1");
    res.send(articles);
  })
);

articleRouter.post(
  "/addArticle",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    console.log(req.body.content);
    const articleNew = new Article({
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      image1: req.body.image1,
      image2: req.body.image2,
    });
    await articleNew.save();
    res.send("New article was added");
  })
);

articleRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    console.log(req.params);
    const articleUnit = await Article.findById(req.params.id);

    if (articleUnit) {
      res.send(articleUnit);
    } else {
      res.status(404).send({ message: "Article Not Found" });
    }
  })
);

articleRouter.put(
  '/update',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req,res) =>{
    const articleFound = await Article.findOne({_id: req.body.id})
    if (articleFound){
      articleFound.title = req.body.title;
      articleFound.subtitle= req.body.subtitle;
      articleFound.content = req.body.content;
      articleFound.image1=req.body.image1;
      articleFound.image2=req.body.image2;
      await articleFound.save();
      res.send(articleFound);
    } else {
      res.status(404).send({ message: "Something went wrong " });
    }
  })
)





export default articleRouter;
