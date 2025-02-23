import mongoose from "mongoose";

const zodiacSchema = new mongoose.Schema({
  sign: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  // Add other fields as needed
});

export default mongoose.models.Zodiac || mongoose.model("Zodiac", zodiacSchema);
