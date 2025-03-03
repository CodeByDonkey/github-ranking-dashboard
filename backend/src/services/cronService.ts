import axios from 'axios';
import * as mongoose from 'mongoose';
import * as cron from 'node-cron';
import csv from 'csv-parser';
import { Readable } from 'stream';
import { Schema, model } from 'mongoose';
import moment from 'moment';
import { DailyStat } from "../models/statsModel";
import { Repo } from "../models/repoModel";


const mongoURI = 'mongodb://localhost:27017/github_public_repos_db';
mongoose.connect(mongoURI);

const processedReportSchema = new Schema({
  report_date: { type: String, unique: true }
});

const ProcessedReport = model('ProcessedReport', processedReportSchema);

async function getCurrentDate(): Promise<string> {
  return moment().format('YYYY-MM-DD');
}

async function fetchGitHubReport(currentDate: string): Promise<any[]> {
  const url = `https://raw.githubusercontent.com/EvanLi/Github-Ranking/refs/heads/master/Data/github-ranking-${currentDate}.csv`;
  try {
    const response = await axios.get(url);
    const rows: any[] = [];
    Readable.from(response.data)
      .pipe(csv())
      .on('data', (data) => rows.push(data));
    return new Promise((resolve) => {
      setTimeout(() => resolve(rows), 3000);
    });
  } catch (error) {
    console.error(`Failed to fetch report for ${currentDate}:`, error);
    return [];
  }
}

async function processAndSaveReport(data: any[], currentDate: string): Promise<void> {
  const repoOps = data.map((repo) => ({
    updateOne: {
      filter: { repo_name: repo.repo_name },
      update: { $set: repo },
      upsert: true
    }
  }));
  await Repo.bulkWrite(repoOps);
  
  const repoDocs = await Repo.find({ repo_name: { $in: data.map((r) => r.repo_name) } }, '_id repo_name');
  const repoNameToId: Record<string, string> = Object.fromEntries(repoDocs.map((repo) => [repo.repo_name, repo._id]));

  const dailyOps = data.map((daily) => ({
    updateOne: {
      filter: { repo_id: repoNameToId[daily.repo_name], report_date: currentDate },
      update: { $set: { ...daily, repo_id: repoNameToId[daily.repo_name] } },
      upsert: true
    }
  }));
  await DailyStat.bulkWrite(dailyOps);
}

async function isReportProcessed(currentDate: string): Promise<boolean> {
  return (await ProcessedReport.countDocuments({ report_date: currentDate })) > 0;
}

async function markReportAsProcessed(currentDate: string): Promise<void> {
  await new ProcessedReport({ report_date: currentDate }).save();
}

async function main(): Promise<void> {
  const currentDate = await getCurrentDate();
  if (await isReportProcessed(currentDate)) {
    console.log(`Skipping ${currentDate}, already processed.`);
    return;
  }
  const data = await fetchGitHubReport(currentDate);
  if (data.length > 0) {
    await processAndSaveReport(data, currentDate);
    await markReportAsProcessed(currentDate);
    console.log(`Processed report for ${currentDate}`);
  } else {
    console.log(`No report available for ${currentDate}`);
  }
}

cron.schedule('0 0 * * *', async () => {
  await main();
});

export { main };
