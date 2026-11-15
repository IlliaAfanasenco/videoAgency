/**
 * Public contact details. Intentionally empty until the client supplies them:
 * nothing is rendered (no fake links) while a value is missing.
 * Set in the deployment environment, e.g. NEXT_PUBLIC_CONTACT_EMAIL=hello@example.de
 */
export const contactInfo = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
};
