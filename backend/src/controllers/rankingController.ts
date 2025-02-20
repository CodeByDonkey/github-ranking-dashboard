import { Request, Response } from "express";
import { getLatestRankings } from "../services/rankingService";

export const getLatestRanking = async (req: Request, res: Response) => {
  try {
    const rankings = await getLatestRankings();
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rankings" });
  }
};