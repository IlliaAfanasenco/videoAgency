export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 text-[10px] uppercase tracking-[.23em] text-white/45">
      {children}
    </p>
  );
}
export function Heading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`whitespace-pre-line text-[clamp(2.1rem,3.5vw,3.65rem)] font-light leading-[1.08] tracking-[-.045em] ${className}`}
    >
      {children}
    </h2>
  );
}
