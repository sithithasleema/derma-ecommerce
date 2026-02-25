"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import type { IconType } from "react-icons";
import queryString from "query-string";

interface CategoryProps {
  label: string;
  icon: IconType;
  value: string;
  selected?: boolean;
}

export default function Category({
  label,
  icon: Icon,
  selected,
  value,
}: CategoryProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    // Always filter the products listing page
    const baseUrl = "/products";

    // Reset category filter
    if (value === "all") {
      // Keep searchTerm if user has typed one
      const currentQuery = params ? queryString.parse(params.toString()) : {};
      // remove category from query
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { category, ...rest } = currentQuery as Record<
        string,
        string | string[]
      >;

      const url = queryString.stringifyUrl(
        { url: baseUrl, query: rest },
        { skipNull: true },
      );

      router.push(url);
      return;
    }

    const currentQuery = params ? queryString.parse(params.toString()) : {};

    const updatedQuery = {
      ...currentQuery,
      category: value,
    } as Record<string, string | string[]>;

    const url = queryString.stringifyUrl(
      { url: baseUrl, query: updatedQuery },
      { skipNull: true },
    );

    router.push(url);
  }, [value, params, router]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={[
        "group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm",
        "transition focus:outline-none focus:ring-2 focus:ring-white/30",
        selected
          ? "bg-white/12 text-white"
          : "text-white/70 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      <Icon size={18} className={selected ? "opacity-100" : "opacity-90"} />
      <span className="font-medium tracking-wide">{label}</span>

      {selected && (
        <span className="absolute inset-x-4 -bottom-1 h-[2px] rounded-full bg-[#cbd5c0]" />
      )}
    </button>
  );
}
