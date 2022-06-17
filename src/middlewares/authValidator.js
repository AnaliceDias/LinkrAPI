import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function authValidator(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer", "").trim();
  if (!token) {
    return res.status(401).send("Token not found");
  }

  try {
    const user = jwt.verify(token, process.env.JWT_KEY);

    res.locals.user = user.userId;
    next();
  } catch (e) {
    res.status(401).send("Token has expired");
  }
}
