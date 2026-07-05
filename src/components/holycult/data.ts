export interface Product {
  id: string;
  ref: string;
  name: string;
  price: number;
  sizes: string[];
  inventoryPct: number;
  category: string;
  image: string;
  fabric: string;
}

export const DROPS: Product[] = [
  { id: "p1", ref: "HC-SS26-HOOD-01", name: "VOID HOODIE", price: 165, sizes: ["S", "M", "L", "XL"], inventoryPct: 18, category: "HOODIE", image: "/products/void-hoodie.jpg", fabric: "420GSM HEAVY FLEECE" },
  { id: "p2", ref: "HC-SS26-OVR-02", name: "OBSIDIAN DROP TEE", price: 78, sizes: ["S", "M", "L"], inventoryPct: 41, category: "TEE", image: "/products/obsidian-tee.jpg", fabric: "280GSM PREMIUM COTTON" },
  { id: "p3", ref: "HC-SS26-CRG-03", name: "RAZOR CARGO PANT", price: 142, sizes: ["S", "M", "L", "XL"], inventoryPct: 9, category: "CARGO", image: "/products/razor-cargo.jpg", fabric: "HEAVYWEIGHT TWILL" },
  { id: "p4", ref: "HC-SS26-HOOD-04", name: "PHANTOM HEAVY HOOD", price: 178, sizes: ["M", "L", "XL"], inventoryPct: 27, category: "HOODIE", image: "/products/phantom-hood.jpg", fabric: "420GSM HEAVY FLEECE" },
  { id: "p5", ref: "HC-SS26-OVR-05", name: "BONE DROP-SHOULDER", price: 82, sizes: ["S", "M", "L", "XL"], inventoryPct: 63, category: "TEE", image: "/products/bone-tee.jpg", fabric: "280GSM PREMIUM COTTON" },
  { id: "p6", ref: "HC-SS26-CRG-06", name: "TITAN CARGO", price: 155, sizes: ["M", "L", "XL"], inventoryPct: 14, category: "CARGO", image: "/products/titan-cargo.jpg", fabric: "HEAVYWEIGHT TWILL" },
];

export const PAST_DROPS = [
  { label: "FW25-07 — ONYX TEE", sold: 180, image: "/products/obsidian-tee.jpg" },
  { label: "SS25-04 — GHOST CARGO", sold: 140, image: "/products/titan-cargo.jpg" },
  { label: "FW25-02 — TITAN HOOD", sold: 120, image: "/products/phantom-hood.jpg" },
  { label: "SS25-01 — CORE TEE", sold: 200, image: "/products/bone-tee.jpg" },
];
