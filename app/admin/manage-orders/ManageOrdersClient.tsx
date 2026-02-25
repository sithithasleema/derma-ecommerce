"use client";

import dynamic from "next/dynamic";
import type { GridColDef } from "@mui/x-data-grid";

import Paper from "@mui/material/Paper";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import ActionBtn from "@/app/components/ActionBtn";
import { MdDeliveryDining, MdDone, MdRemoveRedEye } from "react-icons/md";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Order, User } from "@prisma/client";
import moment from "moment";
import { formatPrice } from "@/utils/formatPrice";

const DataGrid = dynamic(
  () => import("@mui/x-data-grid").then((m) => m.DataGrid),
  { ssr: false },
);

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const ManageOrdersClient = ({ orders }: ManageOrdersClientProps) => {
  const router = useRouter();

  const rows = useMemo(() => {
    return (orders || []).map((order) => ({
      id: order.id,
      customer: order.user?.name || "Unknown",
      amount: formatPrice(order.amount / 100), // assuming Stripe cents
      paymentStatus: order.status,
      date: moment(order.createDate).fromNow(),
      deliveryStatus: order.deliveryStatus || "pending",
    }));
  }, [orders]);

  const handleDispatch = useCallback(
    (id: string) => {
      axios
        .put("/api/order", { id, deliveryStatus: "dispatched" })
        .then(() => {
          toast.success("Order dispatched");
          router.refresh();
        })
        .catch(() => toast.error("Unable to change status"));
    },
    [router],
  );

  const handleDeliver = useCallback(
    (id: string) => {
      axios
        .put("/api/order", { id, deliveryStatus: "delivered" })
        .then(() => {
          toast.success("Order delivered");
          router.refresh();
        })
        .catch(() => toast.error("Unable to change status"));
    },
    [router],
  );

  const paginationModel = { page: 0, pageSize: 5 };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 240 },
    { field: "customer", headerName: "Customer", width: 180 },

    {
      field: "amount",
      headerName: "Amount (AUD)",
      width: 140,
      renderCell: (params) => (
        <div className="font-semibold text-slate-800">{params.row.amount}</div>
      ),
    },

    {
      field: "paymentStatus",
      headerName: "Payment",
      width: 160,
      renderCell: (params) => (
        <div className="flex items-center w-full h-full">
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
            <Status
              text="Unknown"
              color="text-slate-700"
              bgColor="bg-slate-100"
            />
          )}
        </div>
      ),
    },

    {
      field: "deliveryStatus",
      headerName: "Delivery",
      width: 170,
      renderCell: (params) => (
        <div className="flex items-center w-full h-full">
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
            <Status
              text="Unknown"
              color="text-slate-700"
              bgColor="bg-slate-100"
            />
          )}
        </div>
      ),
    },

    { field: "date", headerName: "Date", width: 140 },

    {
      field: "action",
      headerName: "Actions",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-3 w-full h-full">
          <ActionBtn
            icon={MdDeliveryDining}
            onClick={() => handleDispatch(params.row.id)}
          />
          <ActionBtn
            icon={MdDone}
            onClick={() => handleDeliver(params.row.id)}
          />
          <ActionBtn
            icon={MdRemoveRedEye}
            onClick={() => router.push(`/order/${params.row.id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-[1800px]">
      <div className="my-8">
        <Heading title="Manage Orders" center />
      </div>

      <Paper
        sx={{
          height: 420,
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(15, 23, 42, 0.08)",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          checkboxSelection
          sx={{
            border: 0,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(231, 239, 231, 0.6)", // soft sage
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "rgba(231, 239, 231, 0.35)",
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default ManageOrdersClient;
