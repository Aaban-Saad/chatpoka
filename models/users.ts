import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  lastSeen: { type: Date, default: Date.now },
  image: { type: String, required: false },
});

export default mongoose.models.users || mongoose.model("users", UserSchema);
