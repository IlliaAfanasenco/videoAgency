"use client";
import { useState, type FormEvent } from "react";
import type { Messages } from "@/messages/de";
export function ContactBrief({ t }: { t: Messages }) {
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = `${t.contact.subject}\n${data.get("name")}\n${data.get("email")}\n\n${data.get("message")}`;
    try {
      await navigator.clipboard.writeText(text);
      setStatus(t.contact.copied);
    } catch {
      setStatus(t.contact.error);
    }
  }
  return (
    <form onSubmit={submit} className="space-y-5">
      <p className="text-sm leading-6 text-white/55">{t.contact.hint}</p>
      {[
        { name: "name", label: t.contact.name, type: "text" },
        { name: "email", label: t.contact.email, type: "email" },
      ].map((field) => (
        <label key={field.name} className="block text-xs text-white/70">
          {field.label}
          <input
            name={field.name}
            type={field.type}
            autoComplete={field.name}
            required
            maxLength={180}
            className="mt-2 block w-full border-b border-white/25 bg-transparent py-3 text-base text-white"
          />
        </label>
      ))}
      <label className="block text-xs text-white/70">
        {t.contact.message}
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          className="mt-2 block w-full resize-y border border-white/25 bg-transparent p-3 text-base text-white"
        />
      </label>
      <button
        type="submit"
        className="min-h-11 rounded-full bg-white px-6 py-3 text-xs text-black transition hover:bg-white/80"
      >
        {t.contact.copy} →
      </button>
      <p role="status" className="text-sm text-white/65">
        {status}
      </p>
    </form>
  );
}
