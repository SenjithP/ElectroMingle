import dotenv from "dotenv";
import Booking from "../models/electricianBookingSchema.js";
import Electrician from "../models/electricianSchema.js";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import User from "../models/userSchema.js";
import Review from "../models/clientElectricianReview.js";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const getElectriciansList = async (req, res) => {
  try {
    const electriciansList = await Electrician.find({});
    if (electriciansList && electriciansList.length > 0 && electriciansList.electricianIsVerified) {

      res.status(200).json({ electriciansList: electriciansList });
    } else {
      return res.status(404).json({ message: "Electricians not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export const getSingleElectriciansData = async (req, res) => {
  try {

    const electriciansList = await Electrician.find({ _id: req.query.id });
    if (electriciansList && electriciansList.length > 0) {
      res.status(200).json({ electriciansList: electriciansList });
    } else {
      return res.status(404).json({ message: "Electricians not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

export const getScheduledWorksData = async (req, res) => {
  try {
    const token = req.cookies.userjwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing JWT" });
    }
    const decodedToken = jwt.verify(token, process.env.USER_JWT_SECRET);
    const userId = decodedToken.userId;
    const scheduledWorks = await Booking.find({ clientId: userId }).populate(
      "electricianId"
      
    );
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

let idOfTheBookingToBeUpdated;
export const makePayment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Mr.${req.body.electricianName}`,
              description: "Work Successfully Completed!! Thank you",
            },
            unit_amount: req.body.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        "http://localhost:3000/clientScheduledWorks?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/clientScheduledWorks",
    });
    idOfTheBookingToBeUpdated = req.body.id;
    res.send({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateWorkStatus = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: idOfTheBookingToBeUpdated });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.workCompletedStatus = "PaymentSuccess";
    booking.workPaymentStatus = true;

    await booking.save();

    res.status(200).json({ message: "Work status updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

export const clientElectricianReview = async (req, res) => {
  try {
    const { electricianId, rating, review, userId } = req.body;
    const electrician = await Electrician.findById(electricianId);
    if (!electrician) {
      return res.status(404).json({ error: "Electrician not found" });
    }
    electrician.rating =
      Math.round(((electrician.rating + rating) / 2) * 5) / 5;
    await electrician.save();
    const booking = await Booking.findOne({
      clientId: userId,
      electricianId,
    });

    if (!booking) {
      return res
        .status(403)
        .json({ error: "You have no access to review this electrician" });
    }

    if (rating < 1) {
      return res.status(500).json({ error: "Please Provide Rating" });
    }

    const newReview = await Review.create({
      electricianId,
      rating,
      review,
      userId,
    });

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getElectriciansReviews = async (req, res) => {
  try {
    const electricianId = req.query.id;
    if (!electricianId) {
      return res.status(400).json({
        message: "Some Error Occured",
      });
    }
    const electriciansReviews = await Review.find({
      electricianId: electricianId,
    }).populate("userId");
    if (electriciansReviews && electriciansReviews.length > 0) {
      res.status(200).json({ electriciansReviews: electriciansReviews });
    } else {
      return res.status(404).json({ message: "Reviews not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
