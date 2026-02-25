"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatPrice } from "@/utils/formatPrice";
import { formatNumber } from "@/utils/formatNumber";

interface SummaryProps {
  products: Product[];
  orders: Order[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary = ({ orders, products, users }: SummaryProps) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });
  useEffect(() => {
    setSummaryData((prev) => {
      const temporaryData = { ...prev };

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "completed") {
          return acc + item.amount;
        } else return acc;
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === "completed";
      });

      const unpaidOrders = orders.filter((order) => {
        return order.status === "pending";
      });

      // Update temporary data with current this.state.
      temporaryData.sale.digit = totalSale;
      temporaryData.orders.digit = orders.length;
      temporaryData.paidOrders.digit = paidOrders.length;
      temporaryData.unpaidOrders.digit = unpaidOrders.length;
      temporaryData.products.digit = products.length;
      temporaryData.users.digit = users.length;

      return temporaryData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1300px] m-auto">
      {/* Heading */}
      <div className="mb-8 mt-8">
        <Heading title="Stats" center />
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-4xl font-semibold">
                  {summaryData[key].label === "Total Sale" ? (
                    <>{formatPrice(summaryData[key].digit)}</>
                  ) : (
                    <>{formatNumber(summaryData[key].digit)}</>
                  )}
                </div>

                {/* Summary values */}
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
