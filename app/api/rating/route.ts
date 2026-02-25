import { getCurrentUser } from "@/actions/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { Order, Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("Hello from rating");
  const currentUser = await getCurrentUser();
  console.log("Current User:>>>>", currentUser);

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body;
  console.log("📦 Received body:", {
    comment,
    rating,
    product,
    userId,
  });

  try {
    // Retrieve delivered orders
    const deliveredOrder = currentUser?.orders?.some((order: Order) => {
      console.log("Product Id:>>>", product.id);

      return order.products.find((item) => {
        console.log("Item Id:>>>", item.id);
        return item.id === product.id;
      });
    });

    console.log("📦 Delivered order found:", deliveredOrder);

    // Check if user already left review for this particular product
    const userReview = product?.reviews.find((review: Review) => {
      return review.userId === currentUser.id;
    });
    console.log("⚠️ userReview", userReview);

    // Return error if already user left review or no delivered product
    if (userReview || !deliveredOrder) {
      console.log("⚠️ Review exists or product not delivered");
      return NextResponse.json(
        { message: "You have already reviewed this product" },
        {
          status: 403,
        }
      );
    }

    // If everything is good, store review in DB
    const review = await prisma.review.create({
      data: {
        comment,
        rating,
        productId: product.id,
        userId,
      },
    });

    // Return review to user
    return NextResponse.json(review);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
