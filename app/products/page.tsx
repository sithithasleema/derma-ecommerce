/* eslint-disable @typescript-eslint/no-explicit-any */
import getProducts from "@/actions/getProducts";
import ProductCard from "../components/products/ProductCard";
import NullData from "../components/NullData";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    searchTerm?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const products =
    (await getProducts({
      category: params.category || null,
      searchTerm: params.searchTerm || null,
    })) ?? [];

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.35em] uppercase text-slate-500">
            Shop
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            All Products
          </h1>

          {/* Optional: show active filters */}
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
            {params.category && (
              <span className="rounded-full bg-slate-100 px-3 py-1">
                Category: {params.category}
              </span>
            )}
            {params.searchTerm && (
              <span className="rounded-full bg-slate-100 px-3 py-1">
                Search: {params.searchTerm}
              </span>
            )}
          </div>
        </div>

        {/* Grid or empty state */}
        {products.length === 0 ? (
          <NullData title="No products found. Try a different search or clear filters." />
        ) : (
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {products.map((product: any) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
