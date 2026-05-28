import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "./layout";

const modeCopy = {
  login: {
    title: "Login",
    intro: "Access your ECE Exam Guide account with password or OTP.",
    passwordAction: "Login",
    otpAction: "Send Login OTP",
    alternateText: "New here?",
    alternateLink: "/signup",
    alternateLabel: "Create account",
  },
  signup: {
    title: "Sign Up",
    intro: "Create a secure account using your email address or phone number.",
    passwordAction: "Create Account",
    otpAction: "Send Signup OTP",
    alternateText: "Already have an account?",
    alternateLink: "/login",
    alternateLabel: "Login",
  },
};

export default function AuthForm({ mode = "login" }) {
  const router = useRouter();
  const copy = modeCopy[mode];
  const [method, setMethod] = useState("password");
  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function callAuthApi(url, body) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong. Please try again.");
    }

    return data;
  }

  function showSuccess(message) {
    setStatus({ type: "success", message });
  }

  function showError(error) {
    setStatus({ type: "error", message: error.message || "Something went wrong." });
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      if (mode === "signup") {
        const data = await callAuthApi("/api/auth/signup", { identifier, name, password });
        setOtpSent(true);
        setMethod("otp");
        showSuccess(data.debugCode ? `OTP sent. Dev code: ${data.debugCode}` : data.message);
      } else {
        await callAuthApi("/api/auth/login-password", { identifier, password });
        await router.push("/learn");
      }
    } catch (error) {
      showError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSendOtp(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const data = await callAuthApi("/api/auth/request-otp", {
        identifier,
        name,
        purpose: mode,
      });
      setOtpSent(true);
      showSuccess(data.debugCode ? `OTP sent. Dev code: ${data.debugCode}` : "OTP sent. Check your email or phone.");
    } catch (error) {
      showError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerifyOtp(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await callAuthApi("/api/auth/verify-otp", {
        identifier,
        code: otp,
        purpose: mode,
      });
      await router.push("/learn");
    } catch (error) {
      showError(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout
      title={`${copy.title} - ECE Exam Guide`}
      description={copy.intro}
      noIndex
      pageClassName="py-8 sm:py-12"
    >
      <section className="mx-auto grid max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-[#061f55] px-6 py-8 text-white sm:px-8">
          <p className="text-sm font-extrabold uppercase tracking-normal !text-[#ffb36f]">
            Secure Account
          </p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight !text-white sm:text-4xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-sm font-medium leading-7 !text-white/86">{copy.intro}</p>
          <div className="mt-8 grid gap-3 text-sm font-semibold">
            <p className="!text-white/90">Passwords are hashed before storage.</p>
            <p className="!text-white/90">Sessions use HttpOnly cookies.</p>
            <p className="!text-white/90">OTP codes expire quickly and are never stored as plain text.</p>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
            {["password", "otp"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setMethod(item);
                  setStatus({ type: "", message: "" });
                }}
                className={`h-11 rounded-md text-sm font-extrabold transition ${
                  method === item
                    ? "bg-white text-[#071d49] shadow-sm"
                    : "text-slate-600 hover:text-[#071d49]"
                }`}
              >
                {item === "password" ? "Password" : "OTP"}
              </button>
            ))}
          </div>

          <form
            onSubmit={method === "password" ? handlePasswordSubmit : otpSent ? handleVerifyOtp : handleSendOtp}
            className="mt-6 grid gap-4"
          >
            {mode === "signup" ? (
              <label className="grid gap-2">
                <span className="text-sm font-extrabold text-slate-800">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  maxLength={80}
                  className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#ff7417]"
                  placeholder="Your name"
                />
              </label>
            ) : null}

            <label className="grid gap-2">
              <span className="text-sm font-extrabold text-slate-800">Email or Phone</span>
              <input
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                autoComplete={method === "password" ? "username" : "one-time-code"}
                className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#ff7417]"
                placeholder="name@example.com or +919876543210"
                required
              />
            </label>

            {method === "password" ? (
              <label className="grid gap-2">
                <span className="text-sm font-extrabold text-slate-800">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  minLength={10}
                  className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#ff7417]"
                  placeholder={mode === "signup" ? "Minimum 10 characters" : "Your password"}
                  required
                />
              </label>
            ) : otpSent ? (
              <label className="grid gap-2">
                <span className="text-sm font-extrabold text-slate-800">OTP</span>
                <input
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  minLength={6}
                  maxLength={6}
                  className="h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#ff7417]"
                  placeholder="6 digit code"
                  required
                />
              </label>
            ) : null}

            {status.message ? (
              <p
                className={`rounded-lg px-4 py-3 text-sm font-bold ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {status.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-md bg-[#ff7417] px-5 text-sm font-extrabold text-white transition hover:bg-[#e96009] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? "Please wait..."
                : method === "password"
                  ? copy.passwordAction
                  : otpSent
                    ? "Verify OTP"
                    : copy.otpAction}
            </button>

            {method === "otp" && otpSent ? (
              <button
                type="button"
                onClick={(event) => {
                  setOtp("");
                  void handleSendOtp(event);
                }}
                disabled={isSubmitting}
                className="h-11 rounded-md border border-slate-200 text-sm font-extrabold text-[#071d49] transition hover:border-[#ff7417]"
              >
                Resend OTP
              </button>
            ) : null}
          </form>

          <p className="mt-6 text-center text-sm font-semibold text-slate-600">
            {copy.alternateText}{" "}
            <Link href={copy.alternateLink} className="font-extrabold text-[#ff7417]">
              {copy.alternateLabel}
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
