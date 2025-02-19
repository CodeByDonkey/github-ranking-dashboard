import mongoose, { Schema, model } from 'mongoose';

const dailyStatSchema = new Schema({
    report_date: { type: Date, required: true },
    repo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Repository', required: true },  // Reference to Repo collection
    forks: { type: Number, required: true },
    issues: { type: Number, required: true },
    stars: { type: Number, required: true },
    last_commit: { type: Date, required: true },
});  

export default model('Daily_Stat', dailyStatSchema);
