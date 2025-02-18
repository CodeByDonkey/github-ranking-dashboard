import mongoose from "mongoose";
import Daily_Stat from "../models/statsModel";

export const getDailyStatsByRepo = async (
    repo_id: mongoose.Types.ObjectId | undefined,
    getAll: boolean = true
) => {
    try {
        const daily_stats = await Daily_Stat.find({ repo_id })
        .sort({ report_date: -1 })
        .exec();
        if (getAll) {
            return daily_stats
        } else {
            return daily_stats[0]
        }
    } catch (error) {
        console.error(error);
        throw new Error("Database error while fetching daily stats");
    }
};
