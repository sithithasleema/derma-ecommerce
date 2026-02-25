/* eslint-disable @typescript-eslint/no-explicit-any */
import getProducts from "@/actions/getProducts";
import Container from "./components/Container";

import ProductCard from "./components/products/ProductCard";
import NullData from "./components/NullData";
import ValueProps from "./components/ValueProps";
import Hero from "./components/Hero";

interface HomeProps {
  searchParams: Promise<{
    category?: string;
    searchTerm?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  const products = await getProducts({
    category: params.category || null,
    searchTerm: params.searchTerm || null,
  });

  // function shuffleArray(array: any[]) {
  //   const copy = [...array]; // avoid mutating original
  //   for (let i = copy.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [copy[i], copy[j]] = [copy[j], copy[i]];
  //   }
  //   return copy;
  // }

  // const shuffledProducts = shuffleArray(products);

  return (
    <div className="p-8">
      <Container>
        {/* Always show these */}
        {/* <HomeBanner /> */}

        <div className="mt-8">
          <Hero />
        </div>

        {/* Products area */}
        {/* Featured Section */}
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-slate-500">
                Home Collection
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Featured Products
              </h2>
            </div>
          </div>

          <div className="mt-8">
            {products.length === 0 ? (
              <NullData title="No products available." />
            ) : (
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
                {products.map((product: any) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Always show this too */}
        <div className="mt-14 w-full border-t border-slate-200 pt-14">
          <ValueProps />
        </div>
      </Container>
    </div>
  );
}
