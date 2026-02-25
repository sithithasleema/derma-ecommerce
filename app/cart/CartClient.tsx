"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack, MdHighlightOff } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient = ({ currentUser }: CartClientProps) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your Cart is Empty</div>

        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span className="hover:text-gray-900">Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-md gap-4 pb-2 mt-8 items-center">
        <div className="col-span-2 justify-self-start">Products</div>
        <div className="justify-self-center">Price</div>
        <div className="justify-self-center">Quantity</div>
        <div className="justify-self-end">Total</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>

      <div className="border-b-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[200px] mt-8">
          <Button
            onClick={() => {
              handleClearCart();
            }}
            small
            outline
            label={
              <span className="flex items-center">
                <MdHighlightOff className="mr-1" />
                Clear Cart
              </span>
            }
          />
        </div>

        <div className="text-sm flex flex-col gap-3 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p>Shipping and taxes calculated at checkout</p>
          <Button
            label={currentUser ? "Checkout" : "Login to Checkout"}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              currentUser ? router.push("/checkout") : router.push("/login");
            }}
            custom
          />
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span className="hover:text-gray-900">Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
