"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="max-w-[1400px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>Order ID: {order.id}</div>

      <div>
        Total Amount:{" "}
        <span className="font-semibold text-lg">
          {formatPrice(order.amount)}
        </span>
      </div>

      {/* Payment status */}
      <div className="flex gap-2 items-center">
        <div>Payment status:</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="Pending"
              color="text-orange-800"
              bgColor="bg-orange-100"
            />
          ) : order.status === "completed" ? (
            <Status
              text="Completed"
              color="text-green-800"
              bgColor="bg-green-100"
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Delivery status */}

      <div className="flex gap-2 items-center">
        <div>Delivery status:</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="Pending"
              color="text-orange-800"
              bgColor="bg-orange-100"
            />
          ) : order.deliveryStatus === "disptached" ? (
            <Status
              text="Dispatched"
              color="text-purple-800"
              bgColor="bg-purple-100"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="Delivered"
              color="text-green-800"
              bgColor="bg-green-100"
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Date */}
      <div>Date: {moment(order.createDate).fromNow()}</div>

      {/* Order Product list in grid */}
      <div>
        <h2 className="font-semibold mt-4 mb-2 gap-0">Products Ordered</h2>
        <div className="grid grid-cols-5 border border-gray-300">
          <div className="border-b-2 border-r border-gray-300 p-2 col-span-2">
            Product
          </div>
          <div className="border-b-2 border-r border-gray-300 p-2">Price</div>
          <div className="border-b-2 border-r border-gray-300 p-2">
            Quantity
          </div>
          <div className="border-b-2 border-r border-gray-300 p-2">Total</div>
        </div>
        {order.products &&
          order.products.map((item) => {
            return <OrderItem key={item.id} item={item}></OrderItem>;
          })}
      </div>
    </div>
  );
};

export default OrderDetails;
