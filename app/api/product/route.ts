import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  // Basic validation to check if the user is admin
  if (currentUser?.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Unauthorized: Admin access only." },
      { status: 403 }
    );
  }
  // Retrieving data from body
  try {
    const body = await req.json();
    const { name, description, brand, category, variants, images } = body;

    const variantCount = variants.length;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        brand,
        category,
        images,
        variantCount,
        variants: {
          create: variants.map(
            (variant: {
              size: string;
              style: string;
              price: string;
              inStock: boolean;
            }) => ({
              size: variant.size,
              style: variant.style,
              price: parseFloat(variant.price),
              inStock: variant.inStock,
            })
          ),
        },
      },
    });
    console.log("Created product:", product);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Error creating product:", error.message);
  }
}

// Endpoint to update product
export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  // Basic validation to check if the user is admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Unauthorized: Admin access only." },
      { status: 403 }
    );
  }
}
