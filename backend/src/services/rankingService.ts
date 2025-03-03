import { Repo } from "../models/repoModel";
import { DailyStat } from "../models/statsModel";

export const getLatestRankings = async () => {
  try {
    const latestReport = await DailyStat.findOne().sort({ report_date: -1 });
    if (!latestReport) return [];

    const latestDate = latestReport.report_date;

    const rankings = await DailyStat.find({ report_date: latestDate })
      .sort({ stars: -1 })
      .limit(100);

    const results = [];
    for (const ranking of rankings) {
      const repo = await Repo.findById(ranking.repo_id);
      results.push({
        repo,
        daily_stats: ranking,
      });
    }

    return results;
  } catch (error) {
    throw new Error("Error fetching latest rankings: ");
  }
};

