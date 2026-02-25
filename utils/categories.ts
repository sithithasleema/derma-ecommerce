"use client";

import { MdStorefront } from "react-icons/md";
import { GrMultiple } from "react-icons/gr";
import { GoSingleSelect } from "react-icons/go";

export const categories = [
  {
    label: "All",
    value: "all",
    icon: MdStorefront,
  },
  {
    label: "Hand-painted Originals",
    value: "hand-painted-originals",
    icon: MdStorefront,
  },
  {
    label: "Single Prints",
    value: "single-prints",
    icon: GoSingleSelect,
  },
  {
    label: "Multi-Panel Canvas Sets",
    value: "multi-panel-canvas-sets",
    icon: GrMultiple,
  },
];
