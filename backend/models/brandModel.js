import mongoose from "mongoose";


const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    //products: { type: mongoose.Schema.Types.ObjectId, ref: "product",}
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
