import { generateAdminToken } from "../../utils/generateToken.js";
import Admin from "../../models/adminSchema.js";
import User from "../../models/userSchema.js";
import Electrician from "../../models/electricianSchema.js";
import Booking from "../../models/electricianBookingSchema.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      !email ||
      email.trim().length === 0 ||
      !password ||
      password.trim().length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ adminEmail: email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    if (admin.adminPassword === password) {
      generateAdminToken(res, admin._id);

      return res.status(201).json({
        _id: admin._id,
        email: admin.adminEmail,
      });
    } else {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during login." });
  }
};

export const adminGetUserDetails = async (req, res) => {
  try {
    const clientDetails = await User.find();
    if (clientDetails.length === 0) {
      return res.status(400).json({ message: "No users found" });
    }
    const reversedClientDetails = clientDetails.reverse();
    return res.status(200).json({ clientDetails: reversedClientDetails });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error: Unable to fetch user details" });
  }
};

export const adminClientBlockUnblock = async (req, res) => {
  try {
    const { clientId } = req.body;
    const clientDetail = await User.findById(clientId);

    if (!clientDetail) {
      return res.status(404).json({ message: "Client not found" });
    }

    clientDetail.userIsBlocked = !clientDetail.userIsBlocked;
    await clientDetail.save();

    const blockStatus = clientDetail.userIsBlocked ? "blocked" : "unblocked";
    res.cookie("userjwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(200).json({
      message: `${clientDetail.userName} ${blockStatus} successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error: Unable to fetch or update user details",
    });
  }
};

export const adminGetElectricianDetails = async (req, res) => {
  try {
    const electricianDetails = await Electrician.find();
    if (electricianDetails.length === 0) {
      return res.status(400).json({ message: "No electrician found" });
    }
    const reversedElectricianDetails = electricianDetails.reverse();

    return res
      .status(200)
      .json({ electricianDetails: reversedElectricianDetails });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Internal server error: Unable to fetch electrician details",
      });
  }
};

export const adminDashboardData = async (req, res) => {
  try {
    const electricianData = await Electrician.find();
    const clientData = await User.find();
    const BookingData = await Booking.find();

    if (electricianData.length === 0) {
      return res.status(400).json({ message: "No electrician found" });
    }
    if (clientData.length === 0) {
      return res.status(400).json({ message: "No electrician found" });
    }
    if (BookingData.length === 0) {
      return res.status(400).json({ message: "No electrician found" });
    }

    const electricianCount = electricianData.length;
    const clientCount = clientData.length;

    return res
      .status(200)
      .json({
        electricianCount: electricianCount,
        clientCount: clientCount,
        BookingData: BookingData,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Internal server error: Unable to fetch details",
      });
  }
};

export const adminElectricianBlockUnblock = async (req, res) => {
  try {
    const { electricianId } = req.body;
    const electricianDetail = await Electrician.findById(electricianId);

    if (!electricianDetail) {
      return res.status(404).json({ message: "electrician not found" });
    }

    electricianDetail.electricianIsBlocked =
      !electricianDetail.electricianIsBlocked;
    await electricianDetail.save();

    const blockStatus = electricianDetail.electricianIsBlocked
      ? "blocked"
      : "unblocked";
    res.cookie("userjwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(200).json({
      message: `${electricianDetail.electricianName} ${blockStatus} successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message:
        "Internal server error: Unable to fetch or update electrician details",
    });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.cookie("adminjwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "An error occurred during Logout." });
  }
};
