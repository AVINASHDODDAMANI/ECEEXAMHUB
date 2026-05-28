import { connectToDatabase } from "../../../lib/mongodb";
import { normalizeIdentifier } from "../../../lib/auth/identity";
import { createAndSendOtp } from "../../../lib/auth/otp";
import { checkRateLimit, getClientIp } from "../../../lib/auth/rate-limit";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const purpose = req.body?.purpose === "signup" ? "signup" : "login";
  const identity = normalizeIdentifier(req.body?.identifier);

  if (identity.error) {
    return res.status(400).json({ message: identity.error });
  }

  const ip = getClientIp(req);
  const rate = checkRateLimit(`otp:${purpose}:${ip}:${identity.value}`, {
    limit: 5,
    windowMs: 15 * 60 * 1000,
  });

  if (!rate.allowed) {
    return res.status(429).json({
      message: "Too many OTP requests. Please wait before requesting another code.",
      retryAfterSeconds: rate.retryAfterSeconds,
    });
  }

  await connectToDatabase();

  let user = await User.findOne({ [identity.field]: identity.value });

  if (purpose === "login") {
    const verified =
      identity.channel === "email" ? user?.emailVerifiedAt : user?.phoneVerifiedAt;

    if (!user || user.status !== "active" || !verified) {
      return res.status(404).json({ message: "No verified account found for this contact." });
    }
  } else if (!user) {
    user = await User.create({
      [identity.field]: identity.value,
      name: String(req.body?.name || "").trim().slice(0, 80),
      status: "pending",
    });
  }

  try {
    const otp = await createAndSendOtp({
      identifier: identity.value,
      channel: identity.channel,
      purpose,
      req,
    });

    return res.status(200).json({
      message: "OTP sent.",
      expiresAt: otp.expiresAt,
      debugCode: otp.debugCode,
    });
  } catch (error) {
    return res.status(503).json({
      message: "OTP delivery is not configured yet.",
      detail: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
}
