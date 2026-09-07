// Disallow localhost, cloud metadata services, and internal IP ranges
const BLOCKED_HOSTNAMES = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "169.254.169.254", // AWS/Cloud metadata IP
  "::1",
];

const PRIVATE_IP_RANGES = [
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
];

export function validateSafeUrl(urlString: string): URL {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(urlString);
  } catch {
    throw new Error("Invalid URL format.");
  }

  // Only allow HTTP and HTTPS
  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error("Only HTTP and HTTPS protocols are supported.");
  }

  const hostname = parsedUrl.hostname.toLowerCase();

  // Block private hostnames and local networks
  if (BLOCKED_HOSTNAMES.includes(hostname)) {
    throw new Error(
      "Access to local or private network addresses is forbidden.",
    );
  }

  for (const range of PRIVATE_IP_RANGES) {
    if (range.test(hostname)) {
      throw new Error("Access to private IP addresses is forbidden.");
    }
  }

  return parsedUrl;
}
