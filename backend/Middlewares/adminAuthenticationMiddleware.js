import jwt from "jsonwebtoken";

const adminVerifyToken = (req, res, next) => {
  const token = req.cookies.adminjwt;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    const adminId = decodedToken.adminId;
    if (!adminId) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });  
  }
};

export default adminVerifyToken;
