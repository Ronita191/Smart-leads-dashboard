import {
  Response,
  NextFunction
} from "express";

import {
  AuthRequest
} from "./authMiddleware";

export const adminOnly = (

  req: AuthRequest,
  res: Response,
  next: NextFunction

) => {

  // Check if logged-in user has admin role
  if (req.user.role !== "admin") {

    return res.status(403).json({
      message:
        "Access Denied. Admin Only.",
    });
  }

  // Allow request to proceed if user is admin
  next();
};