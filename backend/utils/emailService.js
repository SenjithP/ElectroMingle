import nodemailer from "nodemailer";



export const sendVerifyMail = async (email) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
      host: process.env.TRANSPORTERHOST,
      port: process.env.TRANSPORTERPORT,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.TRANSPORTERUSERMAIL,
        pass: process.env.TRANSPORTERUSERPASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.TRANSPORTERUSERMAIL,
      to: email,
      subject: "For Verification Mail",
      html: `Hello, this message is from ElectroMingle, where we're dedicated to Electrifying The Future. To ensure the security of your account, kindly verify your email using the provided OTP: ${otp}. Please refrain from sharing this code with anyone for your account's safety.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent:-", info.response);
      }
    });
    return otp
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
