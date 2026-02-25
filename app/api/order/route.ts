import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  // Basic validation to check if the user is admin
  if (currentUser?.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Unauthorized: Admin access only." },
      { status: 403 }
    );
  }
  try {
    const body = await req.json();
    const { id, deliveryStatus } = body;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: id },
      data: { deliveryStatus },
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
