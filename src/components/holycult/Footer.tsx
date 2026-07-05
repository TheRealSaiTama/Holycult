import { Link } from "@tanstack/react-router";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-hc-border no-print mt-24">
      <div className="page-container py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-2 max-w-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <img src="/logo/logo.jpeg" alt="HOLYCULT" className="h-7 w-auto" />
            <span className="uppercase tracking-tight text-sm" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              {SITE.name}
            </span>
          </div>
          <p className="meta text-hc-muted leading-relaxed mb-6">{SITE.tagline}</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3 border-b border-hc-border pb-2">
            <input className="form-input border-none flex-1 py-1 text-xs" placeholder="EMAIL / JOIN THE CULT" type="email" aria-label="Email address" />
            <button className="label-xs hover:text-hc-bronze transition-colors">JOIN →</button>
          </form>
        </div>

        {FOOTER_COLUMNS.map((c) => (
          <div key={c.title}>
            <div className="label-xs text-hc-muted mb-4">{c.title}</div>
            <ul className="flex flex-col gap-2.5">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-hc-text hover:text-hc-bronze transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-hc-border">
        <div className="page-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="label-xs text-hc-muted">HOLYCULT © {new Date().getFullYear()} — ALL RIGHTS RESERVED</span>
          <span className="label-xs text-hc-neon font-bold">NO RESTOCKS. EVER.</span>
        </div>
      </div>
    </footer>
  );
}
