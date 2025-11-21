import mongoose from "mongoose";

const scanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  codeSnippet: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

scanSchema.index({ userId: 1 });

const Scan = mongoose.model("Scan", scanSchema);

export default Scan;
