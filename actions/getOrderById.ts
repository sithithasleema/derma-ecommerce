import { prisma } from "@/lib/prisma";

export default async function getOrderById(orderId: string) {
  if (!orderId) return null;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    return order ?? null;
  } catch (error) {
    console.error("getOrderById error:", error);
    return null;
  }
}
