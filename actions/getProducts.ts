/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams = {}) {
  try {
    const { category, searchTerm } = params;

    const query: any = {};

    if (category) {
      query.category = category;
    }

    const OR = searchTerm
      ? [
          {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ]
      : undefined;

    const products = await prisma.product.findMany({
      where: {
        ...query,
        ...(OR && { OR }),
      },
      include: {
        variants: true,
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return products;
  } catch (error) {
    console.error("getProducts error:", error);
    throw new Error("Failed to fetch products");
  }
}
