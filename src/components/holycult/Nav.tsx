import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ShoppingBag, User } from "lucide-react";
import { PRIMARY_NAV } from "@/lib/site";
import { useCart, cartSelectors } from "@/lib/cart/store";
import { MobileNav } from "@/components/storefront/MobileNav";
import { useAuthUser } from "@/hooks/use-auth-user";
import { motion, AnimatePresence } from "motion/react";

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isCheckoutFlow = pathname.startsWith("/checkout") || pathname.startsWith("/receipt");
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCart(cartSelectors.count);
  const openCart = useCart((s) => s.open);
  const { user } = useAuthUser();

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-hc-bg/85 backdrop-blur-md no-print transition-colors"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="page-container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer min-w-0 group">
            <motion.img
              src="/logo/logo.jpeg"
              alt="HOLYCULT"
              className="h-7 w-auto shrink-0"
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 12 }}
            />
            <span
              className="hidden sm:inline uppercase tracking-tight text-sm truncate"
              style={{ fontFamily: "'Archivo Black', sans-serif" }}
            >
              HOLYCULT
            </span>
          </Link>

          <div className="flex items-center gap-3 md:gap-6">
            {!isCheckoutFlow && (
              <div className="hidden md:flex items-center gap-6 label-xs">
                {PRIMARY_NAV.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="text-hc-muted hover:text-hc-text transition-colors relative group"
                    activeProps={{ className: "text-hc-text" }}
                  >
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-hc-bronze group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            )}

            <Link
              to={user ? "/account" : "/auth"}
              aria-label={user ? "Account" : "Sign in"}
              className="p-2 hover:text-hc-bronze transition-colors relative"
            >
              <User size={18} />
              {user && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-hc-neon"
                />
              )}
            </Link>

            <button
              onClick={openCart}
              aria-label={`Open cart, ${cartCount} items`}
              className="relative p-2 hover:text-hc-bronze transition-colors"
            >
              <ShoppingBag size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="absolute -top-0.5 -right-0.5 bg-hc-neon text-hc-text text-[10px] font-bold tabular-nums min-w-[18px] h-[18px] flex items-center justify-center px-1"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        <div className="rule" />
      </nav>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
