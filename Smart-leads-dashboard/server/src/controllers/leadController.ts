import Lead from "../models/Lead";
import { Request, Response } from "express";

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {

    const page =
      Number(req.query.page) || 1;

    const limit = 10;

    const skip =
      (page - 1) * limit;

    const total =
      await Lead.countDocuments();

    const leads =
      await Lead.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      leads,
    });

  } catch (error: any) {

    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};