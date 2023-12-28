import jwt from "jsonwebtoken"

export  const generateUserToken = (res, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.USER_JWT_SECRET, {
      expiresIn: "30d",
    });


    res.cookie('userjwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

  } catch (error) {
    console.error('Error generating token:', error);
  }
};

export  const generateAdminToken = (res, adminId) => {
  try {
    const token = jwt.sign({ adminId }, process.env.ADMIN_JWT_SECRET, {
      expiresIn: "30d",
    });


    res.cookie('adminjwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

  } catch (error) {
    console.error('Error generating token:', error);
  }
};

export const generateElectricianToken = (res, electricianId) => {
  try {
    const token = jwt.sign({ electricianId }, process.env.ELECTRICIAN_JWT_SECRET, {
      expiresIn: "30d",
    });


    res.cookie('electricianjwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

  } catch (error) {
    console.error('Error generating token:', error);
  }
};

