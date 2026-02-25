import { getCurrentUser } from "@/actions/getCurrentUser";
import { storage } from "@/lib/firebase";
import { prisma } from "@/lib/prisma";
import { deleteObject, ref } from "firebase/storage";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// Deleting images from firebase storage
async function deleteFirebaseImages(imageUrls: string[]) {
  for (const url of imageUrls) {
    try {
      const decodedUrl = decodeURIComponent(url.split("/o/")[1].split("?")[0]);
      const imageRef = ref(storage, decodedUrl);
      await deleteObject(imageRef);
      console.log("images deleted");
    } catch (err) {
      console.error("Failed to delete image:", url, err);
    }
  }
}

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
    const { variantId, inStock } = body;

    if (!variantId) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const variant = await prisma.variant.update({
      where: { id: variantId },
      data: { inStock },
    });

    return NextResponse.json(variant);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const currentUser = await getCurrentUser();

  // Basic validation to check if the user is admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Unauthorized: Admin access only." },
      { status: 403 }
    );
  }
  try {
    const { variantId, productId } = await req.json();

    //   Find the variant to get productId
    const variant = await prisma.variant.findUnique({
      where: {
        id: variantId,
      },
    });

    if (!variant) {
      return new Response("Variant not found", { status: 404 });
    }

    //   Delete the variant
    await prisma.variant.delete({
      where: { id: variantId },
    });

    const count = await prisma.variant.count({ where: { productId } });
    await prisma.product.update({
      where: { id: productId },
      data: { variantCount: count },
    });

    //   Count remaining variants for this product
    const remainingVariantsCounts = await prisma.variant.count({
      where: { productId },
    });

    //   if no variant remain, delete product and product images from firebase storage
    if (remainingVariantsCounts === 0) {
      const product = await prisma.product.findUnique({
        where: { id: productId },
        select: {
          images: true,
        },
      });

      if (product?.images && product.images.length > 0) {
        await deleteFirebaseImages(product.images);
      }

      // Delete the product
      await prisma.product.delete({
        where: { id: productId },
      });
    }

    return NextResponse.json(
      { message: "Variants deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return new Response("Internal error", { status: 500 });
  }
}
