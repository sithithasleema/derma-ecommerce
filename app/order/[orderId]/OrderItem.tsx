import { CartProductType, Order } from "@prisma/client";
import Image from "next/image";

interface OrderItemProps {
  item: CartProductType;
}

const OrderItem = ({ item }: OrderItemProps) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 py-4 items-center">
      {" "}
      {/* Product details */}
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <div className="relative w-[100px]">
            {item?.image && (
              <Image src={item?.image} alt={item.name} width={50} height={50} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="truncate">{item.name}</div>
          <div>Size:{item.selectedSize}</div>
          <div>Style:{item.selectedStyle}</div>
        </div>
      </div>
      {/* Price */}
      <div>${item.price.toFixed(2)}</div>
      {/* Quantity */}
      <div>{item.quantity}</div>
      {/* Total */}
      <div className="font-semibold">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderItem;
