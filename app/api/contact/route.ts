import {
  LIMITS,
  validateContact,
  type ContactValues,
} from "@/lib/contact-schema";
import { getMailConfig, sendContactMail } from "@/lib/mail";

const TYPE_LABELS: Record<string, string> = {
  drone: "Drone & Aerial Cinematography",
  "weddings-events": "Weddings & Events",
  "social-media": "Social Media & Creative Strategy",
  commercial: "Commercial & Brand Films",
  other: "Other",
};

// Best-effort limiter (per server instance). Use an edge/WAF limit in production as well.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60_000;
const MAX = 5;
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX;
}

const json = (body: object, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const str = (v: unknown) => (typeof v === "string" ? v : "");

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 20_000) return json({ error: "invalid" }, 413);
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "invalid" }, 400);
  }
  if (!raw || typeof raw !== "object") return json({ error: "invalid" }, 400);

  // Honeypot: real visitors never fill this hidden field. Bots get a silent no-op.
  if (str(raw.website)) return json({ ok: true }, 200);

  const values: ContactValues = {
    name: str(raw.name),
    company: str(raw.company),
    email: str(raw.email),
    phone: str(raw.phone),
    projectType: str(raw.projectType),
    message: str(raw.message),
    privacy: raw.privacy === true,
  };
  // Hard cap before any processing, regardless of what the browser enforced.
  if (values.message.length > LIMITS.message * 2)
    return json({ error: "invalid" }, 400);
  const errors = validateContact(values);
  if (Object.keys(errors).length)
    return json({ error: "validation", errors }, 422);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return json({ error: "rate_limited" }, 429);

  const config = getMailConfig();
  if (!config) return json({ error: "not_configured" }, 503);

  try {
    const ok = await sendContactMail(
      config,
      {
        ...values,
        name: values.name.trim(),
        company: values.company.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
      },
      TYPE_LABELS[values.projectType],
    );
    if (!ok) return json({ error: "send_failed" }, 502);
  } catch {
    return json({ error: "send_failed" }, 502);
  }
  return json({ ok: true }, 200);
}
