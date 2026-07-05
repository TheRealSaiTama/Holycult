import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminListProducts } from "@/lib/admin.functions";
import { ProductForm } from "@/components/admin/ProductForm";

export const Route = createFileRoute("/_authenticated/admin/products/$id")({
  component: EditProduct,
});

function EditProduct() {
  const { id } = Route.useParams();
  const listFn = useServerFn(adminListProducts);
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => listFn(),
  });
  const product = products.find((p) => p.id === id);

  if (isLoading) return <div className="label-xs text-hc-muted">LOADING…</div>;
  if (!product) return <div className="label-xs text-hc-danger">PRODUCT NOT FOUND</div>;

  return (
    <div className="space-y-6">
      <div>
        <div className="section-num mb-2">/ CMS</div>
        <h1 className="display-md">EDIT — {product.name}</h1>
      </div>
      <ProductForm
        initial={{
          id: product.id,
          ref: product.ref,
          slug: product.slug,
          name: product.name,
          description: "",
          price_cents: product.price_cents,
          category: product.category,
          fabric: "",
          image_url: product.image_url,
          status: product.status,
          sort_order: product.sort_order,
          sizes: (product.product_sizes ?? []).map((s: { label: string; stock_qty: number; sort_order: number }) => ({
            label: s.label,
            stock_qty: s.stock_qty,
            sort_order: s.sort_order,
          })),
        }}
      />
    </div>
  );
}
