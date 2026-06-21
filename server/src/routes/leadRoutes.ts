import { protect } from "../middleware/authMiddleware";
import { adminOnly }
from "../middleware/roleMiddleware";
import express, { Request, Response } from "express";
import Lead from "../models/Lead";
import { updateLead } from "../controllers/leadController";

const router = express.Router();

// GET LEADS WITH SEARCH + FILTER + PAGINATION
router.get("/", protect, async (req: Request, res: Response) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = 5;

    const search = req.query.search || "";
    const status = req.query.status || "";
    const source = req.query.source || "";

    const query: any = {};

    // SEARCH
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // STATUS FILTER
    if (status) {
      query.status = status;
    }

    // SOURCE FILTER
    if (source) {
      query.source = source;
    }

    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      leads,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});
// POST
router.post("/", protect, async (req: Request, res: Response) => {
  try {
    const newLead = await Lead.create(req.body);
    res.json(newLead);
  } catch (err) {
    res.status(500).json(err);
  }
});
 router.get(
  "/:id",
  protect,
  async (req: Request, res: Response) => {

    try {

      const lead =
        await Lead.findById(req.params.id);

      res.json(lead);

    } catch (err) {

      res.status(500).json(err);
    }
  }
);
// DELETE
router.delete(
  "/:id",

  protect,

  adminOnly,

  async (
    req: Request,
    res: Response
  ) => {

    try {

      await Lead.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Deleted",
      });

    } catch (err) {

      res.status(500).json(err);
    }
  }
);

// UPDATE
router.put("/:id", protect, updateLead);

export default router;