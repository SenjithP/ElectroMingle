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
    const electricianId = decodedToken.electricianId;

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
    const {
      electricianId,
      electricianName,
      electricianEmail,
      electricianState,
      electricianLocality,
      electricianDescription,
      electricianWagePerDay,
      electricianWagePerHour,
      electricianLicenseNumber,
    } = req.body;

    const images = req.files.map((file) => file.filename);

    const existingElectrician = await Electrician.findById(electricianId);

    if (!existingElectrician) {
      return res.status(404).json({ error: "Electrician not found" });
    }

    if (electricianName  && electricianName !== "undefined") {
      existingElectrician.electricianName = electricianName;
    } else {
      existingElectrician.electricianName = existingElectrician.electricianName;
    }

    if (electricianEmail && electricianEmail !== "undefined") {
      existingElectrician.electricianEmail = electricianEmail;
    } else {
      existingElectrician.electricianEmail =
        existingElectrician.electricianEmail;
    }

    if (electricianState && electricianState!== "undefined") {
      existingElectrician.electricianLocation.electricianState =
        electricianState;
    } else {
      existingElectrician.electricianLocation.electricianState =
        existingElectrician.electricianLocation.electricianState;
    }

    if (electricianLocality && electricianLocality !== "undefined") {
      existingElectrician.electricianLocation.electricianLocality =
        electricianLocality;
    } else {
      existingElectrician.electricianLocation.electricianLocality =
        existingElectrician.electricianLocation.electricianLocality;
    }

    if (electricianDescription && electricianDescription !== "undefined") {
      existingElectrician.electricianDescription = electricianDescription;
    } else {
      existingElectrician.electricianDescription =
        existingElectrician.electricianDescription;
    }

    if (electricianWagePerDay && !isNaN(Number(electricianWagePerDay))) {
      existingElectrician.electricianWage.electricianWagePerDay =
        electricianWagePerDay;
    } else {
      existingElectrician.electricianWage.electricianWagePerDay =
        existingElectrician.electricianWage.electricianWagePerDay;
    }

    if (electricianWagePerHour&& !isNaN(Number(electricianWagePerHour))) {
      existingElectrician.electricianWage.electricianWagePerHour =
        electricianWagePerHour;
    } else {
      existingElectrician.electricianWage.electricianWagePerHour =
        existingElectrician.electricianWage.electricianWagePerHour;
    }

    if (electricianLicenseNumber && electricianLicenseNumber !== "undefined") {
      existingElectrician.electricianCertificate.electricianLicenseNumber =
        electricianLicenseNumber;
    } else {
      existingElectrician.electricianCertificate.electricianLicenseNumber =
        existingElectrician.electricianCertificate.electricianLicenseNumber;
    }

    if (images&& images.length > 0) {
      existingElectrician.electricianProfileImage = images[0];
    } else {
      existingElectrician.electricianProfileImage =
        existingElectrician.electricianProfileImage;
    }

    existingElectrician.electricianIsVerified = true

    const updatedElectrician = await existingElectrician.save();

    res.status(200).json({
      message: "Profile updated successfully",
      updatedData: updatedElectrician,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during updation." });
  }
};


export const getElectricianDetails = async (req, res) => {
  try {
    const data = await Electrician.findById(req.query.id);
    if (!data) {
      res
        .status(500)
        .json({ message: "An error occurred during fetcing data." });
    } else {
      res.status(200).json({ data });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during fetcing data." });
  }
};
