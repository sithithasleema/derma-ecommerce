import Link from "next/link";
import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product) return <NullData title="The product cannot be found" />;

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Breadcrumb / back */}
        <div className="mb-6">
          <Link
            href="/products"
            className="text-sm font-medium text-[#1f2f26] hover:underline"
          >
            ← Back to all products
          </Link>
        </div>

        <Container>
          <ProductDetails product={product} />

          <hr className="w-full mt-12 border-slate-200" />

          <div className="flex flex-col mt-12 gap-10">
            <AddRating product={product} user={user} />
            <ListRating product={product} />
          </div>
        </Container>
      </div>
    </main>
  );
};

export default Product;
