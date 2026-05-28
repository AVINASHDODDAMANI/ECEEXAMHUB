import { connectToDatabase } from "../../../lib/mongodb";
import { normalizeIdentifier } from "../../../lib/auth/identity";
import { hashPassword, validatePasswordStrength } from "../../../lib/auth/password";
import { createAndSendOtp } from "../../../lib/auth/otp";
import { checkRateLimit, getClientIp } from "../../../lib/auth/rate-limit";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const ip = getClientIp(req);
  const rate = checkRateLimit(`signup:${ip}`, { limit: 8, windowMs: 15 * 60 * 1000 });

  if (!rate.allowed) {
    return res.status(429).json({
      message: "Too many signup attempts. Please try again later.",
      retryAfterSeconds: rate.retryAfterSeconds,
    });
  }

  const identity = normalizeIdentifier(req.body?.identifier);
  const password = String(req.body?.password || "");
  const name = String(req.body?.name || "").trim().slice(0, 80);
  const passwordError = validatePasswordStrength(password);

  if (identity.error) {
    return res.status(400).json({ message: identity.error });
  }

  if (passwordError) {
    return res.status(400).json({ message: passwordError });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ [identity.field]: identity.value });

  if (existingUser?.status === "active") {
    return res.status(409).json({ message: "An account already exists. Please login instead." });
  }

  const passwordHash = await hashPassword(password);
  const user =
    existingUser ||
    new User({
      [identity.field]: identity.value,
      name,
      status: "pending",
    });

  user.name = name || user.name;
  user.passwordHash = passwordHash;
  user.status = "pending";
  await user.save();

  try {
    const otp = await createAndSendOtp({
      identifier: identity.value,
      channel: identity.channel,
      purpose: "signup",
      req,
    });

    return res.status(200).json({
      message: "Signup started. Verify the OTP sent to your contact.",
      maskedIdentifier: user[identity.field],
      expiresAt: otp.expiresAt,
      debugCode: otp.debugCode,
    });
  } catch (error) {
    return res.status(503).json({
      message: "Account was prepared, but OTP delivery is not configured yet.",
      detail: process.env.NODE_ENV === "production" ? undefined : error.message,
    });
  }
}
