"use client";

import { formatPrice } from "@/utils/formatPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import SetQuantity from "../components/products/SetQuantity";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent = ({ item }: ItemContentProps) => {
  const {
    handleRemoveProductFromCart,
    handleIncreaseCartQuantity,
    handleDecreaseCartQuantity,
  } = useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center text-slate-800">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/products/{item.id}`}>
          <div className="relative w-[100px]">
            {item?.image && (
              <Image src={item?.image} alt={item.name} width={50} height={50} />
            )}
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <div className="truncate max-w-[500px]">
            <Link href={`/product/${item.id}`}>{item.name}</Link>
          </div>

          <div className="flex gap-4 mt-2">
            <p>
              <span className="font-semibold">Size:</span>
              {item.selectedSize}
            </p>
            <p>
              <span className="font-semibold">Size:</span>
              {item.selectedStyle}
            </p>
          </div>
          <div className="w-[100px] text-slate-700 mt-2">
            <button
              className="underline"
              onClick={() => {
                handleRemoveProductFromCart(item);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQtyIncrease={() => {
            handleIncreaseCartQuantity(item);
          }}
          handleQtyDecrease={() => {
            handleDecreaseCartQuantity(item);
          }}
        />
      </div>
      <div className="justify-self-end">{item.price * item.quantity}</div>
    </div>
  );
};

export default ItemContent;
