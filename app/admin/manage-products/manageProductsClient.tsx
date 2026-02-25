"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import ActionBtn from "@/app/components/ActionBtn";
import { MdCached, MdDelete, MdRemoveRedEye } from "react-icons/md";
import { useCallback } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define the type that matches what Prisma query returns
type ProductWithVariantsAndReviews = {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;

  images: string[];
  price?: string | null;
  variants: {
    id: string;
    productId: string;
    size: string;
    style: string | null;
    price: number;
    inStock: boolean;
  }[];
  reviews: {
    id: string;
    comment: string;
    rating: number;
    createdDate: Date;
    user: {
      id: string;
      name: string | null;
      email?: string | null;
      role?: string;
    };
  }[];
};

interface ManageProductsClientProps {
  products: ProductWithVariantsAndReviews[];
}

const ManageProductsClient = ({ products }: ManageProductsClientProps) => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rows: any = [];

  if (products) {
    rows = products.flatMap((product) => {
      return product.variants.map((variant) => {
        return {
          id: `${product.id}-${variant.id}`, // Unique ID for DataGrid
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          description: product.description,
          brand: product.brand,
          category: product.category,
          inStock: variant.inStock,
          size: variant.size,
          style: variant.style,
          variantPrice: variant.price,
        };
      });
    });
  }

  const paginationModel = { page: 0, pageSize: 5 };

  // Function to toggle product status INSTOCK OR OUT OF STOCK - API CALL
  const handleToggleStock = useCallback(
    (variantId: string, inStock: boolean) => {
      console.log("Variant id:", variantId);
      axios
        .put("/api/variant", {
          variantId,
          inStock: !inStock,
        })
        .then(() => {
          toast.success("Variant status changed");
          router.refresh();
        })
        .catch(() => {
          toast.error("Unable to change status");
        });
    },
    [],
  );

  // Deleting variant from database - API CALL
  const handlevariantDelete = useCallback(
    (variantId: string, productId: string) => {
      axios
        .delete("/api/variant", {
          data: { variantId, productId },
        })
        .then(() => {
          toast.success("Variant Deleted");
          router.refresh();
        })
        .catch(() => {
          toast.error("Unable to delete");
        });
    },
    [],
  );

  // Define your columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "productId", headerName: "Product ID", width: 200 },
    { field: "variantId", headerName: "Variant ID", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "size", headerName: "Size", width: 100 },
    { field: "style", headerName: "Style", width: 100 },
    {
      field: "variantPrice",
      headerName: "Price",
      width: 100,
      type: "number",
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-700">
            {params.row.variantPrice}
          </div>
        );
      },
    },

    {
      field: "inStock",
      headerName: "In Stock",
      width: 150,
      renderCell: (params) =>
        params.row.inStock ? (
          <div className="flex justify-between items-center gap-4 w-full h-full">
            <Status
              text="Available"
              color="text-green-800"
              bgColor="bg-green-100"
            />
          </div>
        ) : (
          <div className="flex justify-between items-center gap-4 w-full h-full">
            <Status
              text="Out of Stock"
              color="text-red-500"
              bgColor="bg-rose-100"
            />
          </div>
        ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,

      renderCell: (params) => {
        return (
          <div className="flex justify-between items-center gap-4 w-full h-full">
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                handleToggleStock(params.row.variantId, params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                handlevariantDelete(params.row.variantId, params.row.productId);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`product/${[params.row.productId]}`);
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
        <Heading title="Manage Products" center />
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

export default ManageProductsClient;
