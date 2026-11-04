import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  // Lets a phone on the local network load dev-only assets (JS chunks, HMR) from this Mac.
  // Without this, `next dev --hostname 0.0.0.0` answers 403 to /_next/* requests that come
  // from http://<LAN-IP>:3000, so the page never hydrates and no client animation runs.
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "*.local",
    "*.lan",
  ],
  async redirects() {
    return [{ source: "/", destination: "/de", permanent: true }];
  },
};
export default nextConfig;
