import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AdminShell } from "@/components/admin/AdminShell";
import { adminCheckRole } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const check = useServerFn(adminCheckRole);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "role"],
    queryFn: () => check(),
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="pt-32 page-container">
        <div className="label-xs text-hc-muted">VERIFYING ACCESS…</div>
      </div>
    );
  }

  if (error || !data?.isAdmin) {
    return (
      <div className="pt-32 page-container max-w-md">
        <div className="section-num mb-4">/ 403</div>
        <h1 className="display-md mb-3">NOT ADMIN.</h1>
        <p className="text-hc-muted meta mb-8">
          Your account is signed in but doesn't have admin access. Ask an existing admin to grant you the
          <code className="font-mono"> admin </code> role.
        </p>
        <Link to="/" className="cta cta-primary">RETURN</Link>
      </div>
    );
  }

  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
