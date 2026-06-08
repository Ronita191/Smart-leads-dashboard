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

  // CHECK ROLE
  if (req.user.role !== "admin") {

    return res.status(403).json({
      message:
        "Access Denied. Admin Only.",
    });
  }

  next();
};