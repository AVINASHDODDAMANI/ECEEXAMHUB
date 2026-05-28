import crypto from "crypto";
import AuthOtp from "../../models/AuthOtp";
import { maskIdentifier } from "./identity";

const OTP_TTL_MINUTES = 10;
const MAX_OTP_ATTEMPTS = 5;

function otpSecret() {
  return process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "development-only-auth-secret-change-before-production";
}

export function hashIdentifier(identifier) {
  return crypto.createHmac("sha256", otpSecret()).update(identifier).digest("hex");
}

function hashOtp(identifier, code) {
  return crypto.createHmac("sha256", otpSecret()).update(`${identifier}:${code}`).digest("hex");
}

function createOtpCode() {
  return String(crypto.randomInt(100000, 1000000));
}

export async function createAndSendOtp({ identifier, channel, purpose, req }) {
  const code = createOtpCode();
  const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

  await AuthOtp.create({
    identifierHash: hashIdentifier(identifier),
    identifierMasked: maskIdentifier(identifier, channel),
    channel,
    purpose,
    codeHash: hashOtp(identifier, code),
    expiresAt,
    requestIp: req?.headers?.["x-forwarded-for"] || req?.socket?.remoteAddress || "",
  });

  await deliverOtp({ identifier, channel, code, purpose });

  return {
    expiresAt,
    debugCode:
      process.env.NODE_ENV !== "production" && process.env.AUTH_DEBUG_OTP === "true"
        ? code
        : undefined,
  };
}

export async function verifyOtpCode({ identifier, code, purpose }) {
  const otp = await AuthOtp.findOne({
    identifierHash: hashIdentifier(identifier),
    purpose,
    consumedAt: null,
    expiresAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });

  if (!otp) {
    return { ok: false, message: "The OTP is invalid or expired." };
  }

  if (otp.attemptCount >= MAX_OTP_ATTEMPTS) {
    return { ok: false, message: "Too many OTP attempts. Request a new code." };
  }

  otp.attemptCount += 1;
  const expectedHash = Buffer.from(otp.codeHash, "hex");
  const candidateHash = Buffer.from(hashOtp(identifier, String(code || "").trim()), "hex");
  const matches =
    expectedHash.length === candidateHash.length &&
    crypto.timingSafeEqual(expectedHash, candidateHash);

  if (!matches) {
    await otp.save();
    return { ok: false, message: "The OTP is invalid or expired." };
  }

  otp.consumedAt = new Date();
  await otp.save();

  return { ok: true };
}

async function deliverOtp({ identifier, channel, code, purpose }) {
  if (channel === "email") {
    await deliverEmailOtp({ email: identifier, code, purpose });
    return;
  }

  await deliverSmsOtp({ phone: identifier, code, purpose });
}

async function deliverEmailOtp({ email, code, purpose }) {
  const webhook = process.env.AUTH_EMAIL_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_EMAIL_WEBHOOK_URL is required to send email OTPs.");
    }

    return;
  }

  await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.AUTH_EMAIL_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.AUTH_EMAIL_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({
      to: email,
      subject: "Your ECE Exam Guide OTP",
      text: `Your ${purpose} OTP is ${code}. It expires in ${OTP_TTL_MINUTES} minutes.`,
    }),
  });
}

async function deliverSmsOtp({ phone, code, purpose }) {
  const webhook = process.env.AUTH_SMS_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SMS_WEBHOOK_URL is required to send phone OTPs.");
    }

    return;
  }

  await fetch(webhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.AUTH_SMS_WEBHOOK_TOKEN
        ? { Authorization: `Bearer ${process.env.AUTH_SMS_WEBHOOK_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({
      to: phone,
      text: `Your ECE Exam Guide ${purpose} OTP is ${code}. It expires in ${OTP_TTL_MINUTES} minutes.`,
    }),
  });
}
