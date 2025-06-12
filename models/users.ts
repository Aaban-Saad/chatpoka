import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  providerAccountId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  lastSignIn: { type: Date, default: Date.now },
  provider: { type: String, required: true },
  image: { type: String, required: false },
});

export default mongoose.models.users || mongoose.model("users", UserSchema);
