import mongoose, { Schema, models, model } from 'mongoose';

// Define Repo schema
const repoSchema = new Schema({
  repo_name: { type: String, required: true, unique: true },
  repo_url: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String },
  language: { type: String },
});

// Use `models` to prevent overwriting the model
export const Repo = models.Repo || model('Repo', repoSchema);
