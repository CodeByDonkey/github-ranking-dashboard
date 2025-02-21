import express from "express";
import { getRepoDetails, getReposDailyStats, getRepositories } from "../controllers/repoController";
import { getLatestRanking } from "../controllers/rankingController";

const router = express.Router();

router.get("/repos", getRepositories);
router.get("/rankings/latest", getLatestRanking);
router.get("/repos/:repo_name/stats", getReposDailyStats);
router.get("/repos/:repo_name", getRepoDetails);

export default router;
