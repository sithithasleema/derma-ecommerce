"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import ActionBtn from "@/app/components/ActionBtn";
import { MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import { useCallback } from "react";
import toast from "react-hot-toast";

import axios from "axios";
import { useRouter } from "next/navigation";

import { Order, User } from "@prisma/client";
import moment from "moment";
import { formatPrice } from "@/utils/formatPrice";

interface OrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const OrdersClient = ({ orders }: OrdersClientProps) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const paginationModel = { page: 0, pageSize: 5 };

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 200 },
    { field: "customer", headerName: "Customer Name", width: 200 },
    {
      field: "price",
      headerName: "Price (AUD)",
      width: 100,
      type: "number",
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-700">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="flex justify-between items-center w-full h-full">
            {params.row.paymentStatus === "pending" ? (
              <Status
                text="Pending"
                color="text-orange-800"
                bgColor="bg-orange-100"
              />
            ) : params.row.paymentStatus === "completed" ? (
              <Status
                text="Completed"
                color="text-green-800"
                bgColor="bg-green-100"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="flex justify-between items-center w-full h-full">
            {params.row.deliveryStatus === "pending" ? (
              <Status
                text="Pending"
                color="text-orange-800"
                bgColor="bg-orange-100"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                text="Dispatched"
                color="text-purple-800"
                bgColor="bg-purple-100"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                text="Delivered"
                color="text-green-800"
                bgColor="bg-green-100"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,

      renderCell: (params) => {
        return (
          <div className="flex justify-between items-center gap-4 w-full h-full">
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${[params.row.id]}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1800px]">
      <div className="my-8">
        <Heading title="Your Orders" center />
      </div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default OrdersClient;
