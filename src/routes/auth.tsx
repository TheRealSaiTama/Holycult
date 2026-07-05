import { createFileRoute, useNavigate, useRouter, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { motion } from "motion/react";

const searchSchema = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sign In — HOLYCULT" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const { redirect } = Route.useSearch();
  const dest = redirect && redirect.startsWith("/") ? redirect : "/account";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: dest });
    });
  }, [navigate, dest]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("WELCOME BACK");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${dest}`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("ACCOUNT CREATED");
      }
      router.invalidate();
      navigate({ to: dest });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "AUTH FAILED");
    } finally {
      setBusy(false);
    }
  }

  async function withGoogle() {
    setGoogleBusy(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/auth`,
      });
      if (result.error) throw result.error;
      if (result.redirected) return;
      toast.success("WELCOME");
      router.invalidate();
      navigate({ to: dest });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "GOOGLE SIGN-IN FAILED");
    } finally {
      setGoogleBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center pt-24 pb-12 px-6 relative overflow-hidden">
      {/* decor */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--hc-text) 1px, transparent 1px), linear-gradient(90deg, var(--hc-text) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md border border-hc-border bg-hc-surface p-8 sm:p-10 relative"
      >
        <div className="absolute -top-3 left-6 bg-hc-bg px-2 section-num">/ ACCESS · 026</div>
        <h1 className="display-md mb-2">{mode === "signin" ? "ENTER THE CULT" : "JOIN THE CULT"}</h1>
        <p className="meta text-hc-muted mb-8">
          {mode === "signin" ? "Sign in to continue." : "Create your account in seconds."}
        </p>

        <button
          type="button"
          onClick={withGoogle}
          disabled={googleBusy}
          className="w-full border border-hc-border bg-hc-bg hover:bg-hc-text hover:text-hc-bg transition-colors py-3 flex items-center justify-center gap-3 label-xs"
        >
          <GoogleGlyph />
          {googleBusy ? "..." : "CONTINUE WITH GOOGLE"}
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-hc-border" />
          <span className="label-xs text-hc-muted">OR</span>
          <div className="flex-1 h-px bg-hc-border" />
        </div>

        <form onSubmit={submit} className="space-y-6">
          {mode === "signup" && (
            <input
              className="form-input"
              type="text"
              placeholder="FULL NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            className="form-input"
            type="email"
            placeholder="EMAIL"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-input"
            type="password"
            placeholder="PASSWORD"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={busy} className="cta cta-primary w-full">
            {busy ? "..." : mode === "signin" ? "ENTER" : "CREATE ACCOUNT"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
          className="mt-6 label-xs text-hc-muted hover:text-hc-text w-full text-center"
        >
          {mode === "signin" ? "NEW HERE? CREATE AN ACCOUNT →" : "← BACK TO SIGN IN"}
        </button>

        <div className="mt-8 text-center">
          <Link to="/" className="label-xs text-hc-muted hover:text-hc-text">← RETURN TO STOREFRONT</Link>
        </div>
      </motion.div>
    </main>
  );
}

function GoogleGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}
