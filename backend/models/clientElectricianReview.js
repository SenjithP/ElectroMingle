import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    electricianId: {
      type: Schema.Types.ObjectId,
      ref: "Electrician",
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;


