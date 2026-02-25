"use client";

import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { categories } from "@/utils/categories";

interface ProductCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

const ProductCard = ({ data }: ProductCardProps) => {
  const productRatingAverage =
    data.reviews?.length > 0
      ? data.reviews.reduce(
          (acc: number, curr: { rating: number }) => acc + curr.rating,
          0,
        ) / data.reviews.length
      : 0;

  const categoryLabel =
    categories.find((c) => c.value === data.category)?.label || data.category;

  const price =
    data.variants?.[0]?.price != null
      ? `${formatPrice(data.variants[0].price)} AUD`
      : "Price N/A";

  const imageSrc = data.images?.[0] || "/fallback.png";

  return (
    <Link href={`/product/${data.id}`} className="block">
      <div className="group h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        {/* Image */}
        <div className="relative aspect-[4/5] w-full bg-[#eef3ee]">
          <Image
            fill
            src={imageSrc}
            alt={data.name}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />

          {/* Category pill */}
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#1f2f26] backdrop-blur">
            {categoryLabel}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="line-clamp-1 text-sm font-semibold text-slate-900">
            {data.name}
          </h2>

          {/* Rating */}
          <div className="mt-2 flex items-center justify-between gap-2">
            <Rating
              value={productRatingAverage}
              precision={0.5}
              readOnly
              size="small"
              emptyIcon={
                <StarIcon style={{ opacity: 0.35 }} fontSize="inherit" />
              }
            />
            <span className="text-xs text-slate-500">
              {data.reviews?.length ?? 0} reviews
            </span>
          </div>

          {/* Price */}
          <div className="mt-3 text-sm font-semibold text-[#1f2f26]">
            {price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
