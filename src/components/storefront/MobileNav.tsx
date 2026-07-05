import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRIMARY_NAV } from "@/lib/site";

interface Props { open: boolean; onClose: () => void }

export function MobileNav({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[70] md:hidden no-print"
          />
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed top-0 left-0 right-0 bg-hc-bg z-[71] md:hidden no-print border-b border-hc-text"
          >
            <div className="flex items-center justify-between p-5 border-b border-hc-border">
              <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
                <img src="/logo/logo.jpeg" alt="HOLYCULT" className="h-7 w-auto" />
                <span className="uppercase tracking-tight text-sm" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                  HOLYCULT
                </span>
              </Link>
              <button onClick={onClose} aria-label="Close menu" className="p-2">
                <X size={22} />
              </button>
            </div>
            <nav className="p-2">
              {PRIMARY_NAV.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className="flex items-center justify-between px-4 py-5 border-b border-hc-border"
                    activeProps={{ className: "text-hc-bronze" }}
                  >
                    <span className="uppercase text-2xl" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
                      {l.label}
                    </span>
                    <span className="label-xs text-hc-muted">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="p-5 space-y-3">
              <Link to="/drop" onClick={onClose} className="cta cta-primary w-full">
                ENTER THE DROP
              </Link>
              <Link to="/account" onClick={onClose} className="cta cta-outline w-full">
                MY ACCOUNT
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
