export const SITE = {
  name: "HOLYCULT",
  tagline: "Heavyweight uniform for the congregation.",
  email: "hello@holycult.shop",
  city: "Mumbai",
  studio: "Bandra West, Mumbai 400050, India",
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
} as const;

export type NavLink = { to: string; label: string };

export const PRIMARY_NAV: NavLink[] = [
  { to: "/drop", label: "DROP" },
  { to: "/lookbook", label: "LOOKBOOK" },
  { to: "/archive", label: "ARCHIVE" },
  { to: "/journal", label: "JOURNAL" },
  { to: "/about", label: "ABOUT" },
  { to: "/contact", label: "CONTACT" },
];

export const ACCOUNT_NAV: NavLink[] = [
  { to: "/account", label: "PROFILE" },
  { to: "/account/addresses", label: "ADDRESSES" },
  { to: "/account/orders", label: "ORDERS" },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "SHOP",
    links: [
      { to: "/drop", label: "Current Drop" },
      { to: "/lookbook", label: "Lookbook" },
      { to: "/archive", label: "Archive" },
      { to: "/cart", label: "Cart" },
    ],
  },
  {
    title: "ACCOUNT",
    links: [
      { to: "/account", label: "Profile" },
      { to: "/account/orders", label: "Orders" },
      { to: "/account/addresses", label: "Addresses" },
      { to: "/auth", label: "Sign In" },
    ],
  },
  {
    title: "HELP",
    links: [
      { to: "/size-guide", label: "Size Guide" },
      { to: "/shipping-returns", label: "Shipping & Returns" },
      { to: "/faq", label: "FAQ" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "CULT",
    links: [
      { to: "/about", label: "About" },
      { to: "/journal", label: "Journal" },
    ],
  },
];

export const SHIPPING_FLAT_CENTS = 9900; // ₹99 flat shipping
