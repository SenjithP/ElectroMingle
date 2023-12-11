import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    electricianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Electrician",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true, 
    },
    clientMobileNumber: {
      type: Number,
      required: true,
    },
    clientAddress: {
      type: String,
      required: true,
    },
    clientLocality: {
      type: String,
      required: true,
    },
    clientState: {
      type: String,
      required: true,
    },
    clientWorkDate: {
      type: String,
      required: true,
    },
    clientWorkDescription: {
      type: String,
      required: true,
    },
    workCompletedStatus: {
      type: String,
      required: true,
      default: "Requested",
    },
    workCancelingReason:{
      type:String,
      default:null
    },
    workPaymentAmount:{
      type:Number,
      default:0
    },
    workCancelledBy:{
      type:String,
      default:null
    }
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
