import { connectToDatabase } from "../../../lib/mongodb";
import { normalizeIdentifier } from "../../../lib/auth/identity";
import { verifyOtpCode } from "../../../lib/auth/otp";
import { createSessionToken, setAuthCookie } from "../../../lib/auth/session";
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
  const rate = checkRateLimit(`otp-verify:${ip}:${identity.value}`, {
    limit: 10,
    windowMs: 15 * 60 * 1000,
  });

  if (!rate.allowed) {
    return res.status(429).json({
      message: "Too many OTP verification attempts. Please wait and try again.",
      retryAfterSeconds: rate.retryAfterSeconds,
    });
  }

  await connectToDatabase();

  const otpResult = await verifyOtpCode({
    identifier: identity.value,
    code: req.body?.code,
    purpose,
  });

  if (!otpResult.ok) {
    return res.status(401).json({ message: otpResult.message });
  }

  let user = await User.findOne({ [identity.field]: identity.value });

  if (!user && purpose === "signup") {
    user = new User({ [identity.field]: identity.value });
  }

  if (!user || user.status === "disabled") {
    return res.status(404).json({ message: "No account found for this contact." });
  }

  if (identity.channel === "email") {
    user.emailVerifiedAt = user.emailVerifiedAt || new Date();
  } else {
    user.phoneVerifiedAt = user.phoneVerifiedAt || new Date();
  }

  user.status = "active";
  user.failedLoginCount = 0;
  user.lockedUntil = null;
  user.lastLoginAt = new Date();
  await user.save();

  setAuthCookie(res, createSessionToken(user));

  return res.status(200).json({
    user: {
      id: String(user._id),
      name: user.name,
      email: user.email || "",
      phone: user.phone || "",
      role: user.role,
    },
  });
}
