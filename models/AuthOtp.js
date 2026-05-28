import mongoose from "mongoose";

const AuthOtpSchema = new mongoose.Schema(
  {
    identifierHash: {
      type: String,
      required: true,
      index: true,
    },
    identifierMasked: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      enum: ["email", "phone"],
      required: true,
    },
    purpose: {
      type: String,
      enum: ["login", "signup"],
      required: true,
    },
    codeHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
    consumedAt: {
      type: Date,
      default: null,
    },
    attemptCount: {
      type: Number,
      default: 0,
    },
    requestIp: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

AuthOtpSchema.index({ identifierHash: 1, purpose: 1, consumedAt: 1, createdAt: -1 });

export default mongoose.models.AuthOtp || mongoose.model("AuthOtp", AuthOtpSchema);
