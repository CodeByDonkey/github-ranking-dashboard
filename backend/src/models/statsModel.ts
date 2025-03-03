import mongoose, { Schema, models, model } from 'mongoose';

const dailyStatSchema = new Schema({
  report_date: { type: Date, required: true },
  repo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Repo', required: true },  // Reference to Repo collection
  forks: { type: Number, required: true },
  issues: { type: Number, required: true },
  stars: { type: Number, required: true },
  last_commit: { type: Date, required: true },
});

export const DailyStat = models.Daily_Stat || model('Daily_Stat', dailyStatSchema);
