import mongoose from "mongoose";

const electricianSchema = new mongoose.Schema(
  {
    electricianName: {
      type: String,
      required: true,
    },
    electricianEmail: {
      type: String,
      required: true,
      unique: true,
    },
    electricianPassword: {
      type: String,
      required: true,
    },
    electricianMobileNumber: {
      type: Number,
    },
    electricianIsVerified: {
      type: Boolean,
      default: false,
    },
    electricianIsBlocked: {
      type: Boolean,
      default: false,
    },
    electricianEmailToken: {
      type: String,
      createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600,
      },
    },
    electricianLocation: {
      electricianState: {
        type: String,
        required: true,
        default: "Unknown State", // Provide a default state here
      },
      electricianLocality: {
        type: String,
        required: true,
        default: "Unknown Locality", // Provide a default locality here
      },
    },
    electricianDescription: {
      type: String,
      required: true,
      default: "No description provided", // Provide a default description here
    },
    rating: {
      type: Number,
      default: 0,
    },
    electricianWage: {
      electricianWagePerDay: {
        type: Number,
        required: true,
        default: 0, // Provide a default value here
      },
      electricianWagePerHour: {
        type: Number,
        required: true,
        default: 0, // Provide a default value here
      },
    },
    electricianProfileImage: {
      type: String,
      default: "default-image.jpg", // Provide a default image path here
    },
    electricianCertificate: {
      electricianLicenseImage: {
        type: String,
        default: "No license type", // Provide a default license type here
      },
      electricianLicenseNumber: {
        type: String,
        required: true,
        default: "No license number", // Provide a default license number here
      },
    },
  },
  {
    timestamps: true,
  }
);

const Electrician = mongoose.model("Electrician", electricianSchema);

export default Electrician;
