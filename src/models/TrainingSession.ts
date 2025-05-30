import mongoose, { Schema } from "mongoose";

const TrainingSessionSchema = new Schema({
  date: { type: Date, default: Date.now },
  exercise: { type: String, required: true },
  duration: { type: Number, required: true }, // minutos
  difficulty: { type: Number, min: 1, max: 5 },
  notes: { type: String },
  hits: { type: Number },     // nuevo campo opcional
  improved: { type: Boolean, default: false },
});

export default mongoose.models.TrainingSession || mongoose.model("TrainingSession", TrainingSessionSchema);