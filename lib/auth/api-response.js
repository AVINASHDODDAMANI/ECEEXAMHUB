export function getSafeErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  const message = String(error?.message || "");

  if (/querySrv|ECONNREFUSED|ENOTFOUND|server selection|MONGODB_URI|Mongo/i.test(message)) {
    return "Database connection failed. Check MONGODB_URI and internet/DNS access, then try again.";
  }

  return fallback;
}
