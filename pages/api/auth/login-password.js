import { connectToDatabase } from "../../../lib/mongodb";
import { normalizeIdentifier } from "../../../lib/auth/identity";
import { verifyPassword } from "../../../lib/auth/password";
import { createSessionToken, setAuthCookie } from "../../../lib/auth/session";
import { checkRateLimit, getClientIp } from "../../../lib/auth/rate-limit";
import User from "../../../models/User";

const MAX_FAILED_LOGINS = 5;
const LOCK_MINUTES = 15;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed." });
  }

  const ip = getClientIp(req);
  const rate = checkRateLimit(`password-login:${ip}`, {
    limit: 12,
    windowMs: 15 * 60 * 1000,
  });

  if (!rate.allowed) {
    return res.status(429).json({
      message: "Too many login attempts. Please try again later.",
      retryAfterSeconds: rate.retryAfterSeconds,
    });
  }

  const identity = normalizeIdentifier(req.body?.identifier);

  if (identity.error) {
    return res.status(400).json({ message: identity.error });
  }

  await connectToDatabase();

  const user = await User.findOne({ [identity.field]: identity.value }).select("+passwordHash");
  const genericMessage = "Invalid login details.";

  if (!user || user.status === "disabled") {
    return res.status(401).json({ message: genericMessage });
  }

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return res.status(423).json({ message: "Account is temporarily locked. Try again later." });
  }

  const verified =
    identity.channel === "email" ? user.emailVerifiedAt : user.phoneVerifiedAt;

  if (!verified || user.status !== "active") {
    return res.status(403).json({ message: "Please verify your account with OTP before login." });
  }

  const passwordMatches = await verifyPassword(req.body?.password, user.passwordHash);

  if (!passwordMatches) {
    user.failedLoginCount += 1;

    if (user.failedLoginCount >= MAX_FAILED_LOGINS) {
      user.lockedUntil = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
      user.failedLoginCount = 0;
    }

    await user.save();
    return res.status(401).json({ message: genericMessage });
  }

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
