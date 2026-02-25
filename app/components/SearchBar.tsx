"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: { searchTerm: "" },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const term = (data.searchTerm || "").toString().trim();

    if (!term) {
      router.push("/products");
      return;
    }

    const url = queryString.stringifyUrl(
      {
        url: "/products",
        query: { searchTerm: term },
      },
      { skipNull: true },
    );

    router.push(url);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex w-full overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#3a5a40]/25">
        <input
          {...register("searchTerm")}
          autoComplete="off"
          type="text"
          placeholder="Search cleansers, serums, moisturizers..."
          className="w-full px-5 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
        />

        <button
          type="submit"
          className="px-5 py-3 text-sm font-semibold text-white bg-[#3a5a40] hover:bg-[#2f3f35] transition"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
