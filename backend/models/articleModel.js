import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: {type:String, required:true},
    content: { type: String, required: true },
    image1: { type: String, required: true },
    image2: { type: String, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);
export default Article;
