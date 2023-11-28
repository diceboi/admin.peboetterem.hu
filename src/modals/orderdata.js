import mongoose from "mongoose";

const OrderDataSchema = new mongoose.Schema(
  {
      title: String,
      anything: String,
  },
  {
      timestamps: true,
  }
);

const OrderData = mongoose.models.OrderData || mongoose.model("OrderData", OrderDataSchema);

export default OrderData;
