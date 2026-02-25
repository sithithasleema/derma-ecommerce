"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import ImageUploader from "@/app/components/admin/ImageUploader";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import TextArea from "@/app/components/inputs/TextArea";
import Input from "@/app/components/inputs/Input";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

type Variant = {
  size: string; // e.g. 30ml, 50ml, 100ml
  price: number | string;
  style?: string; // e.g. Normal, Oily, Dry, Sensitive (optional)
  inStock: boolean;
};

interface ProductFormData {
  name: string;
  description: string;
  brand: string;
  category: string;
  images: string[];
  variants: Variant[];
}

type PartialProductFormData = Partial<ProductFormData>;

const SKINCARE_CATEGORIES = [
  { label: "Cleanser", value: "cleanser" },
  { label: "Serum", value: "serum" },
  { label: "Moisturizer", value: "moisturizer" },
  { label: "Sunscreen", value: "sunscreen" },
  { label: "Toner", value: "toner" },
  { label: "Mask", value: "mask" },
];

const PRESET_SIZES = ["30ml", "50ml", "100ml"];
const PRESET_SKIN_TYPES = ["Normal", "Oily", "Dry", "Sensitive"];

function normalizeMoney(value: any) {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, n);
}

function dedupeVariants(variants: Variant[]) {
  const seen = new Set<string>();
  const out: Variant[] = [];
  for (const v of variants) {
    const size = (v.size || "").trim();
    const style = (v.style || "").trim();
    const key = `${size}__${style}`;
    if (!size) continue;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      size,
      style,
      price: normalizeMoney(v.price),
      inStock: v.inStock ?? true,
    });
  }
  return out;
}

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm<PartialProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      brand: "Pure Derma Botanics",
      category: "",
      images: [],
      variants: [{ size: "30ml", style: "Normal", price: "", inStock: true }],
    },
    mode: "onSubmit",
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "variants",
  });

  const images = watch("images") || [];

  const generateVariants = (mode: "sizes-only" | "sizes-and-skin") => {
    const basePriceRaw = prompt("Base price (number). Example: 34");
    if (!basePriceRaw) return;

    const basePrice = normalizeMoney(basePriceRaw);
    if (!basePrice) {
      toast.error("Please enter a valid base price.");
      return;
    }

    const created: Variant[] =
      mode === "sizes-only"
        ? PRESET_SIZES.map((s, idx) => ({
            size: s,
            style: "",
            price: basePrice + idx * 8, // simple tier pricing
            inStock: true,
          }))
        : PRESET_SIZES.flatMap((s, idx) =>
            PRESET_SKIN_TYPES.map((t) => ({
              size: s,
              style: t,
              price: basePrice + idx * 8,
              inStock: true,
            })),
          );

    // Replace existing rows with generated ones
    replace(created as any);
    toast.success("Variants generated!");
  };

  const addQuickVariant = () => {
    append({ size: "", style: "", price: "", inStock: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (raw) => {
    setIsLoading(true);

    try {
      const data = raw as PartialProductFormData;

      // Validate required fields
      if (!data.name?.trim()) throw new Error("Product name is required.");
      if (!data.description?.trim())
        throw new Error("Description is required.");
      if (!data.brand?.trim()) throw new Error("Brand is required.");
      if (!data.category?.trim()) throw new Error("Category is required.");
      if (!data.images || data.images.length === 0)
        throw new Error("Please upload at least 1 image.");

      const cleanedVariants = dedupeVariants(
        (data.variants || []) as Variant[],
      );
      if (cleanedVariants.length === 0)
        throw new Error("Add at least 1 valid variant (size required).");

      // Ensure every variant has a valid price
      for (const v of cleanedVariants) {
        if (!v.price || Number(v.price) <= 0) {
          throw new Error("Each variant must have a price greater than 0.");
        }
      }

      const cleanData: ProductFormData = {
        name: data.name.trim(),
        description: data.description.trim(),
        brand: data.brand.trim(),
        category: data.category.trim(),
        images: data.images,
        variants: cleanedVariants,
      };

      await axios.post("/api/product", cleanData);

      toast.success("Product saved to DB");
      router.refresh();

      reset({
        name: "",
        description: "",
        brand: "Pure Derma Botanics",
        category: "",
        images: [],
        variants: [{ size: "30ml", style: "Normal", price: "", inStock: true }],
      });
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto space-y-8"
    >
      <Heading title="Add a Skincare Product" center />

      {/* Basic info */}
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          id="name"
          label="Product Name"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />

        <Input
          id="brand"
          label="Brand"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </div>

      <TextArea
        id="description"
        label="Description"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />

      {/* Category */}
      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          {...register("category", { required: "Category is required" })}
          disabled={isLoading}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#3a5a40]/20"
        >
          <option value="">Select a category</option>
          {SKINCARE_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="mt-2 text-sm text-red-700">
            {(errors.category.message as string) || "Category is required"}
          </p>
        )}
      </div>

      <hr className="border-slate-200" />

      {/* Images */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-slate-900">Product Images</p>
        <p className="text-xs text-slate-500">
          Upload 1–6 images. First image will be used on product cards.
        </p>
        <ImageUploader control={control} name="images" />
        {(!images || images.length === 0) && (
          <p className="text-xs text-slate-500">No images uploaded yet.</p>
        )}
      </div>

      <hr className="border-slate-200" />

      {/* Variants */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Variants</p>
            <p className="text-xs text-slate-500">
              Use <b>Size</b> as ml (30ml/50ml/100ml). Use <b>Type</b> as skin
              type (Normal/Oily/Dry/Sensitive).
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => generateVariants("sizes-only")}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              disabled={isLoading}
            >
              Generate: Sizes only
            </button>
            <button
              type="button"
              onClick={() => generateVariants("sizes-and-skin")}
              className="rounded-full bg-[#3a5a40] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2f3f35] transition"
              disabled={isLoading}
            >
              Generate: Sizes + Skin Type
            </button>
            <button
              type="button"
              onClick={addQuickVariant}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              disabled={isLoading}
            >
              + Add Variant
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="grid gap-3 md:grid-cols-12">
                {/* Size */}
                <div className="md:col-span-4">
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Size
                  </label>
                  <input
                    placeholder="30ml"
                    {...register(`variants.${index}.size` as const, {
                      required: "Size is required",
                    })}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3a5a40]/20"
                  />
                  {errors.variants?.[index]?.size && (
                    <p className="mt-1 text-xs text-red-700">
                      {errors.variants[index]?.size?.message as string}
                    </p>
                  )}
                </div>

                {/* Type / Style */}
                <div className="md:col-span-4">
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Type (optional)
                  </label>
                  <input
                    placeholder="Normal / Oily / Dry / Sensitive"
                    {...register(`variants.${index}.style` as const)}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3a5a40]/20"
                  />
                </div>

                {/* Price */}
                <div className="md:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Price (AUD)
                  </label>
                  <input
                    placeholder="34"
                    type="number"
                    step="0.01"
                    min={0}
                    {...register(`variants.${index}.price` as const, {
                      required: "Price is required",
                      valueAsNumber: true,
                      min: { value: 0.01, message: "Price must be > 0" },
                    })}
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3a5a40]/20"
                  />
                  {errors.variants?.[index]?.price && (
                    <p className="mt-1 text-xs text-red-700">
                      {errors.variants[index]?.price?.message as string}
                    </p>
                  )}
                </div>

                {/* Remove */}
                <div className="md:col-span-1 flex md:items-end">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={isLoading || fields.length === 1}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 transition disabled:opacity-50"
                    title={
                      fields.length === 1
                        ? "At least 1 variant is required"
                        : "Remove"
                    }
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* In stock */}
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register(`variants.${index}.inStock` as const)}
                  defaultChecked={true}
                  disabled={isLoading}
                  className="h-4 w-4 accent-[#3a5a40]"
                />
                <span className="text-sm text-slate-700">In stock</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button
        label={
          isLoading ? (
            <LoaderCircle className="animate-spin h-5 w-5 text-white" />
          ) : (
            "Save Product"
          )
        }
        onClick={handleSubmit(onSubmit)}
        custom
        disabled={isLoading}
      />
    </form>
  );
};

export default AddProductForm;
