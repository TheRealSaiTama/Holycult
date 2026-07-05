import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { Nav } from "../components/holycult/Nav";
import { Footer } from "../components/holycult/Footer";
import { CartDrawer } from "../components/storefront/CartDrawer";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-hc-bg px-4">
      <div className="max-w-md text-center">
        <div className="section-num mb-4">404 — LOST</div>
        <h1 className="display-md mb-4">NOT FOUND</h1>
        <p className="meta text-hc-muted mb-8">This page does not exist. Or it sold out.</p>
        <Link to="/" className="cta cta-primary">RETURN</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-hc-bg px-4">
      <div className="max-w-md text-center">
        <div className="section-num mb-4">FAULT</div>
        <h1 className="display-md mb-4">SOMETHING BROKE</h1>
        <p className="meta text-hc-muted mb-8">{error?.message ?? "Reload or return to the storefront."}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="cta cta-primary"
          >
            RETRY
          </button>
          <a href="/" className="cta cta-outline">RETURN</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#F5F0EB" },
      { property: "og:site_name", content: "HOLYCULT" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo/logo.jpeg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-hc-bg text-hc-text selection:bg-hc-neon selection:text-hc-text">
        <Nav />
        <Outlet />
        <Footer />
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--hc-text)",
              color: "var(--hc-bg)",
              border: "none",
              borderRadius: 0,
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
}
