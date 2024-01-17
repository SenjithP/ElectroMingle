import jwt from "jsonwebtoken";
import Electrician from "../models/electricianSchema.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

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

    // Sort the scheduledWorks array in descending order based on clientWorkDate
    scheduledWorks.sort(
      (a, b) => new Date(b.clientWorkDate) - new Date(a.clientWorkDate)
    );

    if (scheduledWorks.length > 0) {
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
      electricianMobileNumber,
      electricianPassword,
      electricianState,
      electricianCity,
      electricianDescription,
      electricianWagePerDay,
      electricianWagePerHour,
      electricianLicenseNumber,
      profileImage,
      licenseImage,
    } = req.body;

    let profileImages;
    let licenseImages;
    if (profileImage) {
      profileImages = await cloudinary.uploader.upload(profileImage, {
        folder: "electromingleImages",
      });
    }
    if (licenseImage) {
      licenseImages = await cloudinary.uploader.upload(licenseImage, {
        folder: "electromingleImages",
      });
    }

    const existingElectrician = await Electrician.findById(electricianId);

    if (!existingElectrician) {
      return res.status(404).json({ error: "Electrician not found" });
    }

    if (electricianName && electricianName.trim().length > 0) {
      if (/\d/.test(electricianName)) {
        return res
          .status(500)
          .json({ message: "Name should not contain numbers" });
      }
      existingElectrician.electricianName = electricianName;
    }

    if (electricianEmail && electricianEmail.trim().length > 0) {
      if (!/^[a-zA-Z0-9._]+@gmail\.com$/.test(electricianEmail)) {
        return res
          .status(500)
          .json({ message: "Email should be in proper format" });
      }
      existingElectrician.electricianEmail = electricianEmail;
    }

    if (electricianPassword && electricianPassword.trim().length > 0) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(electricianPassword)) {
        return res.status(400).json({
          message:
            "Password should contain at least 1 capital, 1 small, 1 special character, 1 number, and minimum 8 characters",
        });
      }
      const hashPassword = await bcrypt.hash(electricianPassword, 10);
      existingElectrician.electricianPassword = hashPassword;
    }

    if (
      electricianMobileNumber !== null &&
      electricianMobileNumber !== undefined
    ) {
      if (!/^\d{10}$/.test(electricianMobileNumber)) {
        return res
          .status(500)
          .json({ message: "Mobile number must be 10 digits" });
      }
      existingElectrician.electricianMobileNumber = Number(
        electricianMobileNumber
      );
    }

    if (electricianState && electricianState.trim().length > 0) {
      existingElectrician.electricianLocation.electricianState =
        electricianState;
    }

    if (electricianCity && electricianCity.trim().length > 0) {
      existingElectrician.electricianLocation.electricianLocality =
        electricianCity;
    }

    if (electricianDescription && electricianDescription.trim().length > 0) {
      existingElectrician.electricianDescription = electricianDescription;
    }

    if (electricianWagePerDay !== null && electricianWagePerDay !== undefined) {
      existingElectrician.electricianWage.electricianWagePerDay = Number(
        electricianWagePerDay
      );
    }

    if (
      electricianWagePerHour !== null &&
      electricianWagePerHour !== undefined
    ) {
      existingElectrician.electricianWage.electricianWagePerHour = Number(
        electricianWagePerHour
      );
    }

    if (
      electricianLicenseNumber &&
      electricianLicenseNumber.trim().length > 0
    ) {
      existingElectrician.electricianCertificate.electricianLicenseNumber =
        electricianLicenseNumber;
    }

    if (profileImages) {
      existingElectrician.electricianProfileImage = profileImages.secure_url;
    }

    if (licenseImages) {
      existingElectrician.electricianCertificate.electricianLicenseImage =
        licenseImages.secure_url;
    }

    existingElectrician.electricianIsVerified = true;
    existingElectrician.electricianIsBlocked = false;

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
