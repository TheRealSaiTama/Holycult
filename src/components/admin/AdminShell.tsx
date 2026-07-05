import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const ADMIN_NAV: Array<{ to: string; label: string; exact?: boolean }> = [
  { to: "/admin", label: "DASHBOARD", exact: true },
  { to: "/admin/products", label: "PRODUCTS" },
  { to: "/admin/lookbook", label: "LOOKBOOK" },
  { to: "/admin/size-charts", label: "SIZE CHARTS" },
  { to: "/admin/orders", label: "ORDERS" },
];


export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("SIGNED OUT");
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="pt-20 min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-60 md:min-h-screen border-b md:border-b-0 md:border-r border-hc-border bg-hc-surface/40">
        <div className="p-6 border-b border-hc-border">
          <div className="section-num mb-1">/ ADMIN</div>
          <div className="display-md leading-none">CMS</div>
        </div>
        <nav className="flex md:flex-col overflow-x-auto md:overflow-visible">
          {ADMIN_NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`px-6 py-4 label-xs border-b border-hc-border whitespace-nowrap transition-colors ${active ? "bg-hc-text text-hc-bg" : "hover:bg-hc-surface"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={signOut}
            className="px-6 py-4 label-xs hover:bg-hc-surface text-left flex items-center gap-2 mt-auto md:mt-12 text-hc-muted hover:text-hc-danger"
          >
            <LogOut size={12} /> SIGN OUT
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10 min-w-0">{children}</main>
    </div>
  );
}
