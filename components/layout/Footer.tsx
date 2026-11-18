import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { contactInfo } from "@/data/contact";
import { Logo } from "@/components/ui/Logo";

export function Footer({ t, locale }: { t: Messages; locale: Locale }) {
  const base = `/${locale}`;
  const nav = [
    [t.footer.nav[0], base],
    [t.footer.nav[1], `${base}/about`],
    [t.footer.nav[2], `${base}#services`],
    [t.footer.nav[3], `${base}/portfolio`],
    [t.footer.nav[4], `${base}#contact`],
  ];
  return (
    <footer className="border-t border-white/10 py-10 lg:py-14">
      <div className="container-x grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href={base} aria-label="FRAME NO. 9 Home">
            <Logo variant="stack" />
          </a>
          <p className="mt-5 text-[10px] tracking-[.2em] text-white/45">
            {t.footer.brand.toUpperCase()}
          </p>
          <p className="mt-6 text-sm text-white/65">{t.footer.slogan}</p>
        </div>
        <nav aria-label={t.footer.navLabel}>
          <ul className="space-y-1 text-sm text-white/65">
            {nav.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex min-h-11 items-center transition hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm text-white/65">
          <ul className="space-y-1">
            {contactInfo.instagram && (
              <li>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center transition hover:text-white"
                >
                  Instagram
                </a>
              </li>
            )}
            <li>
              <a
                href={`${base}/impressum`}
                className="inline-flex min-h-11 items-center transition hover:text-white"
              >
                {t.footer.legal}
              </a>
            </li>
            <li>
              <a
                href={`${base}/datenschutz`}
                className="inline-flex min-h-11 items-center transition hover:text-white"
              >
                {t.footer.privacy}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[10px] text-white/40">
          <p>
            © {new Date().getFullYear()} FRAME NO. 9 · {t.footer.copyright}
          </p>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center hover:text-white"
          >
            {t.footer.top} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
