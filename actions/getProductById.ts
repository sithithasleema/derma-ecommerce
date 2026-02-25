import { prisma } from "@/lib/prisma";

interface IParams {
  productId?: string;
}

export default async function getProductById(params: IParams) {
  try {
    const resolvedParams = await params;
    const { productId } = resolvedParams;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },

      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
        variants: true,
      },
    });

    if (!product) return null;

    return product;
  } catch (error) {
    throw new Error();
  }
}
