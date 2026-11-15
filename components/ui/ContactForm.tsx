"use client";
import { useRef, useState, type FormEvent } from "react";
import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import {
  LIMITS,
  projectTypeIds,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from "@/lib/contact-schema";

type Status = "idle" | "sending" | "success" | "error";
const empty: ContactValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  message: "",
  privacy: false,
};

const input =
  "mt-2 block min-h-12 w-full border border-white/25 bg-transparent px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-white/70 aria-[invalid=true]:border-red-300/70";

function Field({
  name,
  label,
  optional,
  optionalLabel,
  error,
  children,
}: {
  name: string;
  label: string;
  optional?: boolean;
  optionalLabel: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs text-white/70">
        {label}
        {optional && <span className="text-white/35"> · {optionalLabel}</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ t, locale }: { t: Messages; locale: Locale }) {
  const f = t.contact.form;
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const set = <K extends keyof ContactValues>(k: K, v: ContactValues[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const err = (k: keyof ContactValues) =>
    errors[k] ? f.errors[errors[k]!] : undefined;
  const describe = (k: keyof ContactValues) =>
    errors[k] ? `${k}-error` : undefined;

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    setFailure("");
    const found = validateContact(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok === true) {
        setStatus("success");
        setValues(empty);
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setFailure(f.errors.summary);
      } else if (data.error === "not_configured") {
        setFailure(f.errors.notConfigured);
      } else if (data.error === "rate_limited") {
        setFailure(f.errors.rateLimited);
      } else {
        setFailure(f.errors.sendFailed);
      }
    } catch {
      setFailure(f.errors.network);
    }
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="border border-white/20 p-8 lg:p-10">
        <h3 className="text-2xl font-light tracking-tight">{f.successTitle}</h3>
        <p className="mt-4 text-sm leading-7 text-white/65">{f.successText}</p>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={submit} noValidate className="space-y-5">
      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>
      <Field
        name="name"
        label={f.name}
        optionalLabel={f.optional}
        error={err("name")}
      >
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={LIMITS.name}
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={describe("name")}
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className={input}
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          name="company"
          label={f.company}
          optional
          optionalLabel={f.optional}
          error={err("company")}
        >
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={LIMITS.company}
            aria-invalid={!!errors.company}
            aria-describedby={describe("company")}
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            className={input}
          />
        </Field>
        <Field
          name="phone"
          label={f.phone}
          optional
          optionalLabel={f.optional}
          error={err("phone")}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            aria-invalid={!!errors.phone}
            aria-describedby={describe("phone")}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={input}
          />
        </Field>
      </div>
      <Field
        name="email"
        label={f.email}
        optionalLabel={f.optional}
        error={err("email")}
      >
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          maxLength={LIMITS.email}
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={describe("email")}
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          className={input}
        />
      </Field>
      <Field
        name="projectType"
        label={f.projectType}
        optionalLabel={f.optional}
        error={err("projectType")}
      >
        <select
          id="projectType"
          name="projectType"
          required
          aria-required="true"
          aria-invalid={!!errors.projectType}
          aria-describedby={describe("projectType")}
          value={values.projectType}
          onChange={(e) => set("projectType", e.target.value)}
          className={`${input} appearance-none bg-[#050505]`}
        >
          <option value="">{f.choose}</option>
          {projectTypeIds.map((id, i) => (
            <option key={id} value={id}>
              {f.types[i]}
            </option>
          ))}
        </select>
      </Field>
      <Field
        name="message"
        label={f.message}
        optionalLabel={f.optional}
        error={err("message")}
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          className={`${input} resize-y`}
        />
      </Field>
      <div>
        <label className="flex min-h-11 cursor-pointer items-start gap-3 text-sm leading-6 text-white/70">
          <input
            type="checkbox"
            name="privacy"
            required
            aria-required="true"
            aria-invalid={!!errors.privacy}
            aria-describedby={describe("privacy")}
            checked={values.privacy}
            onChange={(e) => set("privacy", e.target.checked)}
            className="mt-1 size-5 shrink-0 accent-white"
          />
          <span>
            {f.privacyBefore}
            <a
              href={`/${locale}/datenschutz`}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-4"
            >
              {f.privacyLink}
            </a>
            {f.privacyAfter}
          </span>
        </label>
        {errors.privacy && (
          <p id="privacy-error" className="mt-1 text-xs text-red-300">
            {err("privacy")}
          </p>
        )}
      </div>
      {failure && (
        <p
          role="alert"
          className="border border-red-300/40 p-4 text-sm text-red-200"
        >
          {failure}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className="flex min-h-12 w-full items-center justify-center gap-4 rounded-full bg-white px-8 text-sm text-black transition hover:bg-white/80 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? f.sending : f.submit}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
