import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { useCart, cartSelectors } from "@/lib/cart/store";
import { formatPriceShort } from "@/lib/format";
import { SHIPPING_FLAT_CENTS } from "@/lib/site";
import { initRazorpayCheckout, verifyRazorpayPayment } from "@/lib/razorpay.functions";
import { listMyAddresses } from "@/lib/account.functions";
import { useAuthUser } from "@/hooks/use-auth-user";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout/")({
  head: () => ({
    meta: [
      { title: "Checkout — HOLYCULT" },
      { name: "description", content: "Secure your pieces." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact?: string };
  theme: { color: string };
  handler: (resp: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  modal: { ondismiss: () => void };
}
interface RazorpayCtor { new (opts: RazorpayOptions): { open: () => void } }
declare global { interface Window { Razorpay?: RazorpayCtor } }

const formSchema = z.object({
  email: z.string().trim().email("INVALID EMAIL"),
  name: z.string().trim().min(2, "NAME REQUIRED").max(120),
  phone: z.string().trim().min(6, "PHONE REQUIRED").max(40),
  address: z.string().trim().min(4, "ADDRESS REQUIRED").max(240),
  city: z.string().trim().min(1, "CITY REQUIRED").max(120),
  postal: z.string().trim().min(1, "POSTAL REQUIRED").max(40),
  country: z.string().trim().min(2, "COUNTRY REQUIRED").max(60),
});
type FormValues = z.infer<typeof formSchema>;

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const subtotal = useCart(cartSelectors.subtotalCents);
  const clearCart = useCart((s) => s.clear);
  const navigate = useNavigate();
  const { user } = useAuthUser();
  const initFn = useServerFn(initRazorpayCheckout);
  const verifyFn = useServerFn(verifyRazorpayPayment);
  const addressesFn = useServerFn(listMyAddresses);

  const currency = lines[0]?.currency ?? "INR";

  const { data: savedAddresses = [] } = useQuery({
    queryKey: ["account", "addresses"],
    queryFn: () => addressesFn(),
    enabled: !!user,
  });

  const [values, setValues] = useState<FormValues>({
    email: "", name: "", phone: "", address: "", city: "", postal: "", country: "India",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [selectedAddressId, setSelectedAddressId] = useState<string | "new">("new");
  const [processing, setProcessing] = useState(false);

  // Prefill email from user
  useEffect(() => {
    if (user?.email && !values.email) setValues((v) => ({ ...v, email: user.email! }));
  }, [user, values.email]);

  // Auto-pick default address
  useEffect(() => {
    if (!savedAddresses.length) return;
    const def = savedAddresses.find((a) => a.is_default) ?? savedAddresses[0];
    if (def && selectedAddressId === "new") {
      setSelectedAddressId(def.id);
      setValues((v) => ({
        ...v,
        name: def.name, phone: def.phone ?? "", address: def.address,
        city: def.city, postal: def.postal, country: def.country,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedAddresses.length]);

  function pickAddress(id: string) {
    setSelectedAddressId(id);
    if (id === "new") {
      setValues((v) => ({ ...v, name: "", phone: "", address: "", city: "", postal: "", country: "India" }));
      return;
    }
    const a = savedAddresses.find((x) => x.id === id);
    if (a) {
      setValues((v) => ({
        ...v,
        name: a.name, phone: a.phone ?? "", address: a.address,
        city: a.city, postal: a.postal, country: a.country,
      }));
    }
  }

  const shipping = lines.length ? SHIPPING_FLAT_CENTS : 0;
  const total = subtotal + shipping;

  const pay = useMutation({
    mutationFn: async (data: FormValues) => {
      const init = await initFn({
        data: {
          email: data.email,
          userId: user?.id ?? null,
          shipping: {
            name: data.name, phone: data.phone, address: data.address,
            city: data.city, postal: data.postal, country: data.country,
          },
          lines: lines.map((l) => ({ productId: l.productId, sizeLabel: l.sizeLabel, qty: l.qty })),
        },
      });
      const ok = await loadRazorpay();
      if (!ok || !window.Razorpay) throw new Error("Could not load Razorpay");

      return await new Promise<{ orderId: string }>((resolve, reject) => {
        const rp = new window.Razorpay!({
          key: init.keyId,
          amount: init.amount,
          currency: init.currency,
          name: "HOLYCULT",
          description: `Order ${init.refCode}`,
          order_id: init.razorpayOrderId,
          prefill: { name: data.name, email: data.email, contact: data.phone },
          theme: { color: "#1C1A18" },
          handler: async (resp) => {
            try {
              await verifyFn({
                data: {
                  orderId: init.orderId,
                  razorpay_order_id: resp.razorpay_order_id,
                  razorpay_payment_id: resp.razorpay_payment_id,
                  razorpay_signature: resp.razorpay_signature,
                },
              });
              resolve({ orderId: init.orderId });
            } catch (err) {
              reject(err);
            }
          },
          modal: { ondismiss: () => reject(new Error("Payment cancelled")) },
        });
        rp.open();
      });
    },
    onMutate: () => setProcessing(true),
    onSuccess: ({ orderId }) => {
      clearCart();
      navigate({ to: "/receipt/$orderId", params: { orderId } });
    },
    onError: (err: Error) => {
      toast.error(err.message);
      setProcessing(false);
    },
    onSettled: () => setProcessing(false),
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const result = formSchema.safeParse(values);
    if (!result.success) {
      const flat: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of result.error.issues) flat[issue.path[0] as keyof FormValues] = issue.message;
      setErrors(flat);
      const first = Object.values(flat)[0];
      if (first) toast.error(first);
      return;
    }
    setErrors({});
    pay.mutate(result.data);
  }

  const bind = (k: keyof FormValues) => ({
    value: values[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [k]: e.target.value })),
  });

  const stockOk = useMemo(() => lines.every((l) => l.qty > 0), [lines]);

  if (lines.length === 0) {
    return (
      <main className="pt-28 pb-24 page-container text-center">
        <div className="section-num mb-4">/ 05 — CHECKOUT</div>
        <div className="text-6xl text-hc-bronze/40 mb-4">☩</div>
        <h1 className="display-md mb-4">YOUR CART IS EMPTY.</h1>
        <Link to="/drop" className="cta cta-primary">ENTER THE DROP</Link>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-24 page-container no-print">
      <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="section-num mb-2">/ 05 — SECURE</div>
          <h1 className="display-md">CHECKOUT</h1>
        </div>
        {!user && (
          <Link to="/auth" search={{ redirect: "/checkout" }} className="label-xs text-hc-muted hover:text-hc-text">
            HAVE AN ACCOUNT? SIGN IN →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
        <form onSubmit={submit} className="space-y-10">
          <section className="space-y-6">
            <div className="label-xs text-hc-muted">IDENTIFICATION</div>
            <Field placeholder="EMAIL ADDRESS" type="email" {...bind("email")} error={errors.email} />
          </section>

          {user && savedAddresses.length > 0 && (
            <section className="space-y-3">
              <div className="label-xs text-hc-muted">SAVED ADDRESSES</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedAddresses.map((a) => (
                  <button
                    type="button"
                    key={a.id}
                    onClick={() => pickAddress(a.id)}
                    className={`text-left p-3 border transition-all ${
                      selectedAddressId === a.id ? "border-hc-text bg-hc-text/[0.04]" : "border-hc-border hover:border-hc-text"
                    }`}
                  >
                    <div className="label-xs mb-1 flex items-center gap-2">
                      {a.label || "ADDRESS"} {a.is_default && <span className="bg-hc-neon px-1 text-[9px]">DEFAULT</span>}
                    </div>
                    <div className="meta text-hc-muted leading-snug">
                      {a.name}, {a.city}, {a.postal}
                    </div>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => pickAddress("new")}
                  className={`text-left p-3 border-dashed border transition-all ${
                    selectedAddressId === "new" ? "border-hc-text bg-hc-text/[0.04]" : "border-hc-border hover:border-hc-text"
                  }`}
                >
                  <div className="label-xs mb-1">＋ USE NEW</div>
                  <div className="meta text-hc-muted">Enter a different shipping address.</div>
                </button>
              </div>
            </section>
          )}

          <section className="space-y-6">
            <div className="label-xs text-hc-muted">SHIPPING</div>
            <Field placeholder="FULL NAME" {...bind("name")} error={errors.name} />
            <Field placeholder="PHONE" {...bind("phone")} error={errors.phone} />
            <Field placeholder="STREET ADDRESS" {...bind("address")} error={errors.address} />
            <div className="grid grid-cols-2 gap-6">
              <Field placeholder="CITY" {...bind("city")} error={errors.city} />
              <Field placeholder="POSTAL" {...bind("postal")} error={errors.postal} />
            </div>
            <Field placeholder="COUNTRY" {...bind("country")} error={errors.country} />
          </section>

          <button type="submit" disabled={processing || !stockOk} className="cta cta-neon w-full">
            {processing ? "OPENING PAYMENT…" : `PAY — ${formatPriceShort(total, currency)}`}
          </button>
          <div className="flex items-center justify-center gap-2 meta text-hc-muted">
            <span className="inline-block w-1.5 h-1.5 bg-hc-neon rounded-full" />
            SECURED BY RAZORPAY · UPI · CARDS · NETBANKING · WALLETS
          </div>
        </form>

        <aside className="md:sticky md:top-24 border border-hc-border p-6 space-y-5 bg-hc-surface">
          <div className="flex items-center justify-between">
            <div className="label-xs text-hc-muted">ORDER · {lines.length} ITEM{lines.length !== 1 ? "S" : ""}</div>
            <div className="text-hc-bronze">☩</div>
          </div>
          <div className="space-y-4">
            {lines.map((l) => (
              <motion.div
                layout
                key={`${l.productId}-${l.sizeLabel}`}
                className="flex gap-3 items-center"
              >
                <img src={l.productImage} alt={l.productName} className="w-14 h-16 object-cover bg-hc-bg shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold truncate">{l.productName}</div>
                  <div className="meta text-hc-muted">SIZE {l.sizeLabel} · QTY {l.qty}</div>
                </div>
                <div className="font-mono text-sm tabular-nums">{formatPriceShort(l.unitPriceCents * l.qty, currency)}</div>
              </motion.div>
            ))}
          </div>
          <div className="rule" />
          <div className="space-y-2 font-mono text-xs">
            <div className="flex justify-between"><span className="text-hc-muted">SUBTOTAL</span><span>{formatPriceShort(subtotal, currency)}</span></div>
            <div className="flex justify-between"><span className="text-hc-muted">SHIPPING</span><span>{formatPriceShort(shipping, currency)}</span></div>
            <div className="rule my-2" />
            <div className="flex justify-between text-sm font-bold"><span>TOTAL</span><span>{formatPriceShort(total, currency)}</span></div>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {processing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-hc-bg/85 backdrop-blur-md z-[200] flex items-center justify-center p-6"
          >
            <div className="max-w-sm w-full text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-7xl text-hc-bronze"
              >☩</motion.div>
              <div className="section-num">OPENING SECURE PAYMENT</div>
              <p className="meta text-hc-muted">Do not close this window.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Field({
  placeholder, type = "text", value, onChange, error,
}: { placeholder: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string }) {
  return (
    <div>
      <input className="form-input" placeholder={placeholder} type={type} value={value} onChange={onChange} />
      {error && <div className="text-[10px] text-hc-danger mt-1 font-bold">{error}</div>}
    </div>
  );
}
