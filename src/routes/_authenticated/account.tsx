import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ACCOUNT_NAV } from "@/lib/site";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/account")({
  component: AccountLayout,
});

function AccountLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const qc = useQueryClient();

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    toast.success("SIGNED OUT");
    navigate({ to: "/", replace: true });
  }

  return (
    <main className="pt-24 pb-20 page-container min-h-screen">
      <div className="mb-10">
        <div className="section-num mb-2">/ ACCOUNT · 026</div>
        <h1 className="display-lg">YOUR CULT</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12">
        <aside className="md:border-r md:border-hc-border md:pr-8">
          <nav className="flex md:flex-col gap-1 overflow-x-auto">
            {ACCOUNT_NAV.map((l) => {
              const active = l.to === "/account" ? pathname === l.to : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-2.5 label-xs border-l-2 transition-colors whitespace-nowrap ${
                    active ? "border-hc-neon text-hc-text bg-hc-surface" : "border-transparent text-hc-muted hover:text-hc-text"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <button
              onClick={signOut}
              className="px-3 py-2.5 label-xs text-hc-muted hover:text-hc-danger text-left flex items-center gap-2 mt-2 md:mt-8 border-l-2 border-transparent"
            >
              <LogOut size={12} /> SIGN OUT
            </button>
          </nav>
        </aside>
        <section className="min-w-0">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
