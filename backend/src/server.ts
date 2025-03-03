import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import repoRoutes from "./routes/repoRoutes";
import { main } from "./services/cronService"; // Import the cron job

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", repoRoutes);

// Run the cron job when the server starts
main(); // Optionally, you can also manually call `main` if you want to trigger immediately after startup.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Optional: Run cron job every day at midnight
  // cron.schedule('0 0 * * *', async () => {
  //   await main();
  // });
});
