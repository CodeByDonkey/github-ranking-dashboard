import { Request, Response } from "express";
import {Repo } from "../models/repoModel";
import { getRepoByName } from "../services/repoService";
import { getDailyStatsByRepo } from "../services/dailyStatsService";

export const getRepositories = async (req: Request, res: Response) => {
  try {
    const repos = await Repo.find().exec();

    const reposWithStats = await Promise.all(
      repos.map(async (repo) => {
        const stats = await getDailyStatsByRepo(repo._id, false);
        return {
          repo,
          daily_stats: stats
        };
      })
    );

    res.status(200).json(reposWithStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRepoDetails = async (req: Request, res: Response) => {
  const { repo_name } = req.params;
  
  try {
      const repo = await getRepoByName(repo_name);

      const stats = await getDailyStatsByRepo(repo?._id, false);
      
      res.status(200).json({
          repo,
          daily_stats: stats
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
};

export const getReposDailyStats = async (req: Request, res: Response) => {
  const { repo_name } = req.params;
  
  try {
    const repo = await getRepoByName(repo_name);

    const stats = await getDailyStatsByRepo(repo?._id, true);
    
    res.status(200).json({
        repo,
        daily_stats: stats
    });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
};
