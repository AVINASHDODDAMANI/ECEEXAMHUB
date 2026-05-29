import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis/cloudflare";
import { NextResponse } from "next/server";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const isRateLimitEnabled = Boolean(redisUrl && redisToken);

const redis = isRateLimitEnabled
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : null;

const cache = new Map();

const pageRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(120, "1 m"),
      analytics: true,
      prefix: "ratelimit:page",
      ephemeralCache: cache,
    })
  : null;

const apiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, "1 m"),
      analytics: true,
      prefix: "ratelimit:api",
      ephemeralCache: cache,
    })
  : null;

const adminRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 m"),
      analytics: true,
      prefix: "ratelimit:admin",
      ephemeralCache: cache,
    })
  : null;

const CANONICAL_SOLUTION_QUERY_REDIRECTS = [
  {
    pathname: "/solution/gate-2025",
    params: {
      exam: "GATE",
      year: "2025",
      paperId: "gate-ece-2025",
    },
  },
  {
    pathname: "/solution/bel-may-2025",
    params: {
      exam: "BEL",
      year: "2025",
      month: "May",
      paperId: "bel-engineer-electronics-may-2025",
    },
  },
  {
    pathname: "/solution/bel-december-2025",
    params: {
      exam: "BEL",
      year: "2025",
      month: "December",
      paperId: "bel-probationary-engineer-ece-december-2025",
    },
  },
  {
    pathname: "/solution/bel-december-2023",
    params: {
      exam: "BEL",
      year: "2023",
      month: "December",
      paperId: "bel-probationary-engineer-electronics-december-2023",
    },
  },
];

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    request.ip ||
    "anonymous"
  );
}

function getRateLimitForPath(pathname) {
  if (pathname.startsWith("/api/admin") || pathname === "/admin") {
    return adminRateLimit;
  }

  if (pathname.startsWith("/api")) {
    return apiRateLimit;
  }

  return pageRateLimit;
}

function setRateLimitHeaders(response, result) {
  response.headers.set("X-RateLimit-Limit", String(result.limit));
  response.headers.set("X-RateLimit-Remaining", String(result.remaining));
  response.headers.set("X-RateLimit-Reset", String(result.reset));
}

function getCanonicalSolutionRedirectUrl(request) {
  const redirectMatch = CANONICAL_SOLUTION_QUERY_REDIRECTS.find((item) => {
    if (request.nextUrl.pathname !== item.pathname) {
      return false;
    }

    return Object.entries(item.params).every(
      ([key, value]) => request.nextUrl.searchParams.get(key) === value
    );
  });

  if (!redirectMatch) {
    return null;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = redirectMatch.pathname;
  redirectUrl.search = "";
  return redirectUrl;
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const canonicalRedirectUrl = getCanonicalSolutionRedirectUrl(request);

  if (canonicalRedirectUrl) {
    return NextResponse.redirect(canonicalRedirectUrl, 308);
  }

  if (!isRateLimitEnabled) {
    return NextResponse.next();
  }

  const rateLimit = getRateLimitForPath(pathname);

  if (!rateLimit) {
    return NextResponse.next();
  }

  const identifier = `${getClientIp(request)}:${pathname.startsWith("/api") ? "api" : "page"}`;
  let result;

  try {
    result = await rateLimit.limit(identifier);
  } catch {
    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Status", "unavailable");
    return response;
  }

  if (!result.success) {
    const retryAfter = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
    const response = NextResponse.json(
      { message: "Too many requests. Please try again later." },
      { status: 429 }
    );

    setRateLimitHeaders(response, result);
    response.headers.set("Retry-After", String(retryAfter));
    return response;
  }

  const response = NextResponse.next();
  setRateLimitHeaders(response, result);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
