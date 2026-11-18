// Two-tier section identity: gold index + hairline + clear section name (animated by Motion via data-section-label).
export function SectionLabel({
  children,
  index,
}: {
  children: React.ReactNode;
  index?: number;
}) {
  return (
    <div
      data-section-label
      className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-5"
    >
      {index !== undefined && (
        <span
          data-sl-num
          className="text-sm font-light tabular-nums tracking-[.12em] text-gold sm:text-base"
        >
          {String(index).padStart(2, "0")}
        </span>
      )}
      <span
        data-sl-line
        aria-hidden="true"
        className="h-px w-10 shrink-0 origin-left bg-gold/60 sm:w-20"
      />
      <span
        data-sl-text
        className="min-w-0 text-xs uppercase tracking-[.14em] text-white sm:text-sm sm:tracking-[.18em] lg:text-base"
      >
        {children}
      </span>
    </div>
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
