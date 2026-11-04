"use client";
import { useEffect, useId, useRef, useState } from "react";
export function Modal({
  trigger,
  title,
  close,
  children,
  className = "",
}: {
  trigger: React.ReactNode;
  title: string;
  close: string;
  children: React.ReactNode;
  className?: string;
}) {
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const node = dialog.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node?.showModal();
    return () => {
      document.body.style.overflow = previous;
      node?.close();
    };
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {trigger}
      </button>
      <dialog
        aria-labelledby={titleId}
        ref={dialog}
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (
            e.target === dialog.current ||
            (e.target instanceof Element && e.target.closest('a[href^="#"]'))
          )
            setOpen(false);
        }}
        className="fixed inset-0 m-auto max-h-[90svh] w-[min(92vw,680px)] overflow-y-auto border border-white/20 bg-[#0c0d0e] p-7 text-white shadow-2xl backdrop:bg-black/85 sm:p-12"
        data-lenis-prevent
      >
        <div className="mb-8 flex items-start justify-between gap-6">
          <h2 id={titleId} className="text-3xl font-light tracking-tight">
            {title}
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label={close}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-xl"
          >
            ×
          </button>
        </div>
        {children}
      </dialog>
    </>
  );
}
