import { prisma } from "@/lib/prisma";

export default async function getProductById(productId: string) {
  if (!productId) return null;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        reviews: {
          include: { user: true },
          orderBy: { createdDate: "desc" },
        },
        variants: true,
      },
    });

    return product ?? null;
  } catch (error) {
    console.error("getProductById error:", error);
    return null;
  }
}
