import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  plan: { type: String, enum: ["free", "pro", "enterprise"], required: true },
  createdAt: { type: Date, default: Date.now },
  creatorsId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

export default mongoose.models.tenants || mongoose.model("tenants", TenantSchema);
