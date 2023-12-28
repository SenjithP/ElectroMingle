import Booking from "../models/electricianBookingSchema.js";

export const electricianBooking = async (req, res) => {
  try {
    const {
      clientId,
      electricianId,
      clientName,
      clientEmail,
      clientMobileNumber,
      clientState,
      clientLocality,
      clientAddress,
      clientWorkDate,
      workDescription,
    } = req.body;

    if ( 
      !clientId ||
      !electricianId ||
      !clientName ||
      clientName.trim().length === 0 ||
      !clientEmail ||
      clientEmail.trim().length === 0 ||
      !clientMobileNumber ||
      clientMobileNumber.trim().length === 0 ||
      !clientState ||
      clientState.trim().length === 0 ||
      !clientLocality ||
      clientLocality.trim().length === 0 ||
      !clientAddress ||
      clientAddress.trim().length === 0 ||
      !clientWorkDate ||
      clientWorkDate.trim().length === 0 ||
      !workDescription ||
      workDescription.trim().length === 0
    ) {
     return res.status(400).json({ error: "All fields are required" });
    }

    if (/\d/.test(clientName)) {
      return res
        .status(500)
        .json({ error: "Name should not contain numbers" });
    }
    if (!/^[a-zA-Z0-9._]+@gmail\.com$/.test(clientEmail)) {
      return res
        .status(500)
        .json({ error: "Email should be in proper format" });
    }
    if (!/^\d{10}$/.test(clientMobileNumber)) {
      return res
        .status(500)
        .json({ error: "Mobile number must be 10 digits" });
    }
 
    
    // Check if the slot is already booked for the given date
    const bookedDate = await Booking.findOne({
      electricianId: electricianId,
      clientWorkDate: clientWorkDate,
    });
    if (bookedDate) {
     return res.status(400).json({ error: "Sorry, No slot available for this date" });
    } else {

      const booking = new Booking({
        clientId,
        electricianId,
        clientName,
        clientEmail,
        clientMobileNumber,
        clientState, 
        clientLocality,
        clientAddress,
        clientWorkDate, 
        clientWorkDescription: workDescription,
      });


      await booking.save();

     return res.status(200).json({ message: "Booking successful!" });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Something went wrong...." });
  }
};


