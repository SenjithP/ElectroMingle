import jwt from "jsonwebtoken";
import Electrician from "../models/electricianSchema.js";
import bcrypt from "bcrypt";
import Booking from "../models/electricianBookingSchema.js";

export const electricianSideScheduledWorks = async (req, res) => {
  try {
    const token = req.cookies.electricianjwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing JWT" });
    }
    const decodedToken = jwt.verify(token, process.env.ELECTRICIAN_JWT_SECRET);
    const electricianId = decodedToken.userId;
    const scheduledWorks = await Booking.find({
      electricianId: electricianId,
    }).populate("electricianId");
    if (scheduledWorks) {
      res.status(200).json({ scheduledWorks: scheduledWorks });
    } else {
      return res.status(404).json({ message: "No bookings found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export const changeWorkStatus = async (req, res) => {
  try {
    const { bookingId, status, reason, payAmount, cancelledBy } = req.body;

    const data = await Booking.findOne({ _id: bookingId });

    if (status === "accept") {
      data.workCompletedStatus = "Accepted";
    } else if (status === "cancel") {
      data.workCompletedStatus = "Cancelled";
    } else if (status === "paid") {
      data.workCompletedStatus = "RequestedPayment";
    } else {
      return res.status(400).json({ message: "Invalid status provided." });
    }
    if (reason) {
      data.workCancelingReason = reason;
    }
    if (payAmount) {
      data.workPaymentAmount = payAmount;
    }
    if (cancelledBy === "Electrician") {
      data.workCancelledBy = "Electrician";
    } else {
      data.workCancelledBy = "Client";
    }
    await data.save();

    return res
      .status(200)
      .json({ status: "success", message: "Status Updated Successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "An error occurred" });
  }
};

export const getDataToUpdateElectricianProfile = async (req, res) => {
  try {
    const electricianDetails = await Electrician.findOne({
      _id: req.query.id,
    });
    if (electricianDetails) {
      res.status(200).json({ electricianDetails: electricianDetails });
    } else {
      console.log("Failed to find user");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateElectricianProfile = async (req, res) => {
  try {
    const electricianData = await Electrician.findOne({
      _id: req.body.electricianId,
    });
    if (!electricianData) {
      console.log("Electrician not found");
      return res.status(400).json({ error: "Electrician not found" });
    }
    const updateFields = [
      "electricianName",
      "electricianEmail",
      "electricianLocation.electricianState",
      "electricianLocation.electricianLocality",
      "electricianDescription",
      "electricianWage.electricianWagePerDay",
      "electricianWage.electricianWagePerHour",
      "electricianCertificate.electricianLicenseImage",
      "electricianCertificate.electricianLicenseNumber",
      "electricianProfileImage",
    ];
    updateFields.forEach((field) => {
      const value = req.body[field];
      if (value !== undefined) {
        const nestedFields = field.split(".");
        let target = electricianData;
        for (let i = 0; i < nestedFields.length - 1; i++) {
          target = target[nestedFields[i]];
        }
        target[nestedFields.pop()] = value;
      }
    });
    // Update the password if it exists in the request body
    if (req.body.electricianPassword !== undefined) {
      const salt = await bcrypt.genSalt(10);
      electricianData.electricianPassword = await bcrypt.hash(
        req.body.electricianPassword,
        salt
      );
    }
    const updatedElectricianData = await electricianData.save();
    const responseData = updateFields.reduce((data, field) => {
      const nestedFields = field.split(".");
      data[nestedFields[nestedFields.length - 1]] =
        nestedFields.reduce(
          (obj, key) => obj && obj[key],
          updatedElectricianData
        ) || updatedElectricianData[field];
      return data;
    }, {});
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during updation." });
  }
};
