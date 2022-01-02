import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand :{type: mongoose.Schema.Types.ObjectId, ref:'Brand'},
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    packageSize: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    species: { type: String, required: true },
    sale: { type: Boolean, required: true },
    saleAmount: { type: Number,required:true },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
