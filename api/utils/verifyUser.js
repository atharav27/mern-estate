import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';


export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized")); 
  }

  jwt.verify(token, process.env.JWT_SECRET || 'atharav', (err, user) => { // Use environment variable for secret
    if (err) {
      return next(errorHandler(403, "Forbidden")); // Properly call errorHandler
    }

    req.user = user;
    next();
  });
};
