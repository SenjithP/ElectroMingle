import jwt from "jsonwebtoken";

const electricianVerifyToken = (req, res, next) => {
  const token = req.cookies.electricianjwt;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ELECTRICIAN_JWT_SECRET);
    const electricianId = decodedToken.electricianId;
    if (!electricianId) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default electricianVerifyToken;
