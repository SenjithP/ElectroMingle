import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    shopEmail: {
      type: String,
      required: true,
      unique: true,
    },
    shopPassword: {
      type: String,
      required: true,
    },
    shopMobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    shopIsVerified: {
      type: Boolean,
      default: false,
    },
    shopEmailToken: {
      type: String,
      createdAt: { 
        type: Date, 
        default: Date.now(), 
        expires: 3600 },
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
