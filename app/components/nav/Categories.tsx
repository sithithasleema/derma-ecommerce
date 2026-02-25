"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Category from "./Category";
import {
  FaPumpSoap,
  FaTint,
  FaLeaf,
  FaSun,
  FaSpa,
  FaRegSmileBeam,
} from "react-icons/fa";

const skincareCategories = [
  { label: "All", value: "all", icon: FaRegSmileBeam },
  { label: "Cleanser", value: "cleanser", icon: FaPumpSoap },
  { label: "Serum", value: "serum", icon: FaTint },
  { label: "Moisturizer", value: "moisturizer", icon: FaLeaf },
  { label: "Sunscreen", value: "sunscreen", icon: FaSun },
  { label: "Toner", value: "toner", icon: FaSpa },
  { label: "Mask", value: "mask", icon: FaSpa },
];

export default function Categories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const allowed = pathname === "/" || pathname === "/products";
  if (!allowed) return null;

  return (
    // NOT sticky here — navbar already handles it
    <div className="py-3">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {skincareCategories.map((item) => (
          <Category
            key={item.value}
            label={item.label}
            value={item.value}
            icon={item.icon}
            selected={
              item.value === "all"
                ? !category || category === "all"
                : category === item.value
            }
          />
        ))}
      </div>
    </div>
  );
}
