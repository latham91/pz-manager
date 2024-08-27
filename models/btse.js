import mongoose from "mongoose";

const BTSESchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  steamId: {
    type: String,
    required: true,
  },
  warning: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
});

export default mongoose.models.BTSE || mongoose.model("BTSE", BTSESchema);
