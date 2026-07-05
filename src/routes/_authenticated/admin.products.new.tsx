import { createFileRoute } from "@tanstack/react-router";
import { ProductForm } from "@/components/admin/ProductForm";

export const Route = createFileRoute("/_authenticated/admin/products/new")({
  component: NewProduct,
});

function NewProduct() {
  return (
    <div className="space-y-6">
      <div>
        <div className="section-num mb-2">/ CMS</div>
        <h1 className="display-md">NEW PRODUCT</h1>
      </div>
      <ProductForm />
    </div>
  );
}
