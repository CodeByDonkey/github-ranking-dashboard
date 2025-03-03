import mongoose, { Schema, models, model } from 'mongoose';

const repoSchema = new Schema({
  repo_name: { type: String, required: true, unique: true },
  repo_url: { type: String, required: true },
  username: { type: String, required: true },
  description: { type: String },
  language: { type: String },
});

export const Repo = models.Repo || model('Repo', repoSchema);
