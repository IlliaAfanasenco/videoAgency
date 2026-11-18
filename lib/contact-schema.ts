// Validation shared by the browser form and the API route (single source of truth).
export const projectTypeIds = [
  "social-media-strategy",
  "hotels-hospitality",
  "business-commercial",
  "weddings-events",
  "drone-aerial",
  "photo-video",
  "other",
] as const;
export type ProjectTypeId = (typeof projectTypeIds)[number];

export const LIMITS = {
  name: 120,
  company: 120,
  email: 254,
  phone: 40,
  messageMin: 10,
  message: 5000,
} as const;

export type ContactValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  privacy: boolean;
};

export type FieldError =
  "required" | "email" | "phone" | "messageShort" | "tooLong" | "privacy";
export type ContactErrors = Partial<Record<keyof ContactValues, FieldError>>;

const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/;
const PHONE = /^[+\d][\d\s().\-/]{4,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  const name = v.name.trim();
  if (!name) e.name = "required";
  else if (name.length > LIMITS.name) e.name = "tooLong";
  if (v.company.trim().length > LIMITS.company) e.company = "tooLong";
  const email = v.email.trim();
  if (!email) e.email = "required";
  else if (email.length > LIMITS.email) e.email = "tooLong";
  else if (!EMAIL.test(email)) e.email = "email";
  const phone = v.phone.trim();
  if (phone) {
    if (phone.length > LIMITS.phone) e.phone = "tooLong";
    else if (!PHONE.test(phone)) e.phone = "phone";
  }
  if (!(projectTypeIds as readonly string[]).includes(v.projectType))
    e.projectType = "required";
  const message = v.message.trim();
  if (!message) e.message = "required";
  else if (message.length < LIMITS.messageMin) e.message = "messageShort";
  else if (message.length > LIMITS.message) e.message = "tooLong";
  if (v.privacy !== true) e.privacy = "privacy";
  return e;
}
