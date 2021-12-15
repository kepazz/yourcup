import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
      },
    ],
    shippingInformation: {
      name: { type: String, required: true },
      surname: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentResult: {
      id: String,
      status: String,
    },
    itemsPrice: { type: Number, required: true },
    priceVAT: {type:Number, required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    paidAt: { type: Date },
  },
  
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
