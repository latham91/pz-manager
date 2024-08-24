import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  steamId: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.Player || mongoose.model("Player", PlayerSchema);
