import jwt from "jsonwebtoken"

export  const generateUserToken = (res, userId, role) => {
  try {
    const token = jwt.sign({ userId, role }, process.env.USER_JWT_SECRET, {
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

export const electricianToken = (res, userId, role) => {
  try {
    const token = jwt.sign({ userId, role }, process.env.ELECTRICIAN_JWT_SECRET, {
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

export const shopToken = (res, userId, role) => {
  try {
    const token = jwt.sign({ userId, role }, process.env.SHOP_JWT_SECRET, {
      expiresIn: "30d",
    });


    res.cookie('shopjwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

  } catch (error) {
    console.error('Error generating token:', error);
  }
};