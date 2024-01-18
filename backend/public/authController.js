import Electrician from "../models/electricianSchema.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import {
  generateUserToken,
  generateElectricianToken,
} from "../utils/generateToken.js";
import { sendVerifyMail } from "../utils/emailService.js";

export const register = async (req, res) => {
  try {
    const { role, name, email, password, mobileNumber } = req.body;
    if (
      !role ||
      role.trim().length === 0 ||
      !name ||
      name.trim().length === 0 ||
      !email ||
      email.trim().length === 0 ||
      !password ||
      password.trim().length === 0 ||
      !mobileNumber ||
      mobileNumber.trim().length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (/\d/.test(name)) {
      return res
        .status(500)
        .json({ message: "Name should not contain numbers" });
    }
    if (!/^[a-zA-Z0-9._]+@gmail\.com$/.test(email)) {
      return res
        .status(500)
        .json({ message: "Email should be in proper format" });
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password should contain atleast 1 capital, 1 small, 1 special character,1 number and min 8 characters",
      });
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res
        .status(500)
        .json({ message: "Mobile number must be 10 digits" });
    }

    if (role === "client") {
      const existingUser = await User.findOne({ userEmail: email });

      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email already exists." });
      } else {
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
          userName: name,
          userEmail: email,
          userPassword: hashPassword,
        });

        await user.save();
      }
    } else if (role === "electrician") {
      const existingElectrician = await Electrician.findOne({
        electricianEmail: email,
      });

      if (existingElectrician) {
        return res
          .status(400)
          .json({ message: "Electrician with this email already exists." });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const electrician = new Electrician({
          electricianName: name,
          electricianEmail: email,
          electricianPassword: hashPassword,
          electricianMobileNumber: mobileNumber,
        });
        await electrician.save();
      }
    } else {
      return res.status(400).json({ message: "Invalid role provided." });
    }
    return res.status(200).json({ message: "Registration successful.", role });
  } catch (error) {
    console.error("An error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during registration...." });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const email = req.body.email;
    if(!email){
      return res.status(400).json({ error: "Provide Email", });
    }
    const otp = await sendVerifyMail(email);
    return res.status(200).json({ message: "OTP Send successful.", otp });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
};

// authController.js
export const authGoogle = async (req, res) => {
  try {
    const user = await User.findOne({ userEmail: req.body.email });

    if (user) {
      // User already exists, return false status
      const token = generateUserToken(res, user._id);
      return res.status(200).json({
        success: true,
        token,
        _id: user._id,
        email: user.userEmail,
        name: user.userName,
      });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(generatedPassword, salt);

      const newUser = new User({
        userName:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        userEmail: req.body.email,
        userPassword: hashPassword,
      });

      await newUser.save();
      const token = generateUserToken(res, newUser._id);
      return res.status(201).json({
        success: true,
        token,
        _id: newUser._id,
        email: newUser.userEmail,
        name: newUser.userName,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during registration or login.",
    });
  }
};

export const electricianLogin = async (req, res) => {
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

    const electrician = await Electrician.findOne({ electricianEmail: email });

    if (!electrician) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const verifiedPassword = await bcrypt.compare(
      password,
      electrician.electricianPassword
    );

    if (verifiedPassword) {
      generateElectricianToken(res, electrician._id);

      return res.status(201).json({
        _id: electrician._id,
        name: electrician.electricianName,
        email: electrician.electricianEmail,
      });
    } else {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during login." });
  }
};

export const clientLogin = async (req, res) => {
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

    const user = await User.findOne({ userEmail: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    if (user.userIsBlocked === true) {
      return res
        .status(400)
        .json({ message: "You Are Blocked From This Site! Contact Admin" });
    }

    const verifiedPassword = await bcrypt.compare(password, user.userPassword);

    if (verifiedPassword) {
      generateUserToken(res, user._id);

      return res.status(201).json({
        _id: user._id,
        name: user.userName,
        email: user.userEmail,
      });
    } else {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during login." });
  }
};

export const userLogout = async (req, res) => {
  try {
    res.cookie("userjwt", "", {
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

export const electricianLogout = async (req, res) => {
  try {
    res.cookie("electricianjwt", "", {
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
