import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";


// REGISTER USER
export const registerUser = async (req: Request, res: Response) => {
  console.log("🔥 REGISTER API HIT");
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password, role } = req.body || {};

    // VALIDATION
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, password are required",
      });
    }

    // CHECK EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
    });

    return res.status(201).json({
      message: "User Registered Successfully",
      user,
    });

  } catch (error: any) {
    console.log("REGISTER ERROR FULL:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};


// LOGIN USER
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};

    // VALIDATION
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (error: any) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
