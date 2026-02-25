/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Container from "@/app/components/Container";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { useCallback, useEffect, useState } from "react";

import SetQuantity from "@/app/components/products/SetQuantity";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import { useCart } from "@/hooks/useCart";
import SetStyleSize from "@/app/components/products/SetStyleSize";
import { useRouter } from "next/navigation";
import { MdCheckCircle } from "react-icons/md";
import { categories } from "@/utils/categories";

interface ProductDetailsProps {
  product: any;
}

export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedStyle: string;
  selectedSize: string;
  quantity: number;
  price: number;
  image?: string;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isProductInCart, setIsProductInCart] = useState(false);

  // Cart Initial State
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedStyle: "",
    selectedSize: "",
    quantity: 1,
    price: product.variants?.[0]?.price || 0,
    image: product?.images?.[0] ?? "",
  });

  useEffect(() => {
    if (
      !cartProducts ||
      !cartProduct.selectedStyle ||
      !cartProduct.selectedSize
    ) {
      setIsProductInCart(false);
      return;
    }

    const exists = cartProducts.some(
      (item) =>
        item.id === cartProduct.id &&
        item.selectedStyle === cartProduct.selectedStyle &&
        item.selectedSize === cartProduct.selectedSize
    );

    if (exists !== isProductInCart) {
      setIsProductInCart(exists);
    }
  }, [cartProducts, cartProduct, isProductInCart]);

  // Find the selected variant (based on style and size)
  const selectedVariant = product?.variants?.find(
    (variant: any) =>
      variant.style === cartProduct.selectedStyle &&
      variant.size === cartProduct.selectedSize
  );

  // Update cart product price when variant changes
  useEffect(() => {
    if (selectedVariant) {
      setCartProduct((prev) => ({
        ...prev,
        price: selectedVariant.price,
      }));
    }
  }, [selectedVariant]);

  // Handling Style and Size Changes
  const handleChange = useCallback(
    (field: "selectedStyle" | "selectedSize", value: string) => {
      if (field === "selectedStyle") {
        setCartProduct((prev) => ({
          ...prev,
          selectedStyle: value,
          selectedSize: "",
        }));
      } else {
        setCartProduct((prev) => ({
          ...prev,
          [field]: value,
        }));
      }
    },
    []
  );

  // Handling Quantity Changes
  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, []);

  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      const newQty = Math.max(1, prev.quantity - 1);
      return { ...prev, quantity: newQty };
    });
  }, []);

  // Calculating Reviews Average
  const productRatingAverage =
    product?.reviews?.length > 0
      ? product.reviews?.reduce(
          (acc: number, curr: { rating: number }) => acc + curr.rating,
          0
        ) / product.reviews?.length
      : 0;

  // display price
  const getDisplayPrice = () => {
    if (selectedVariant) {
      return selectedVariant.price;
    }
    // price range if no variant selected
    if (product.variants && product.variants.length > 0) {
      const prices = product.variants.map((v: any) => v.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      if (minPrice === maxPrice) {
        return minPrice;
      }
      return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
    }
    return product.variants?.[0]?.price || 0;
  };

  const displayPrice = getDisplayPrice();

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="max-h-[500px]">
          <ProductImage product={product} />
        </div>
        <div className="flex flex-col gap-1 text-slate-700">
          <div className="p-4">
            <h2 className="text-lg md:text-xl font-medium">{product.name}</h2>
            <span className="text-sm">Elite Canvas Australia</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm px-4">
            <Rating
              value={productRatingAverage}
              readOnly
              precision={0.5}
              size="small"
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <button
              onClick={() => {
                const el = document.getElementById("review-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="text-green-900 underline">
                {product.reviews?.length} reviews
              </span>
            </button>
          </div>

          {/* Price */}
          <div className="mt-3 px-4">
            <h2 className="text-lg font-semibold">
              {selectedVariant ? (
                // Show specific variant price
                <span className="text-green-700">
                  {formatPrice(selectedVariant.price)} AUD
                </span>
              ) : (
                // Show price range or starting price
                <span className="text-slate-600">
                  {typeof displayPrice === "string"
                    ? displayPrice
                    : `${formatPrice(displayPrice)} AUD`}
                  {!selectedVariant && product.variants?.length > 1 && (
                    <span className="text-sm text-slate-500 ml-2">
                      (Select style & size for exact price)
                    </span>
                  )}
                </span>
              )}
            </h2>
          </div>

          {/* Selecting Style and Size */}
          <SetStyleSize
            variants={product.variants}
            cartProduct={cartProduct}
            handleChange={handleChange}
          />

          {/* Quantity Selector */}
          <SetQuantity
            cartProduct={cartProduct}
            handleQtyIncrease={handleQtyIncrease}
            handleQtyDecrease={handleQtyDecrease}
          />

          {/* Category */}
          <div className="mt-3">
            <span className="font-semibold text-md mr-2">Category:</span>
            <span className="text-sm text-slate-500">
              {categories.find((c) => c.value === product.category)?.label ||
                product.category}
            </span>
          </div>

          {/* Stock Display */}
          {selectedVariant && (
            <div className="mt-2 px-4">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                  selectedVariant.inStock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {selectedVariant.inStock ? "✓ In Stock" : "✗ Out of Stock"}
              </span>
            </div>
          )}

          {isProductInCart ? (
            <>
              {/* View Cart Button */}
              <div className="mt-3 text-center">
                <Button
                  label="View Cart"
                  outline
                  onClick={() => {
                    router.push("/cart");
                  }}
                />
                <p className="flex gap-2 items-center justify-center text-green-800 mt-4">
                  <MdCheckCircle />
                  <span>Product added to cart.</span>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Add to Cart Button */}
              <div className="mt-3 text-center">
                <Button
                  label={
                    selectedVariant
                      ? `Add To Cart - ${formatPrice(
                          selectedVariant.price
                        )} AUD`
                      : "Select Style & Size"
                  }
                  custom
                  disabled={!selectedVariant || !selectedVariant.inStock}
                  onClick={() => handleAddProductToCart(cartProduct)}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
