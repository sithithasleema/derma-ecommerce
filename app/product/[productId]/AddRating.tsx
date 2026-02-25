"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddRatingProps {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

const AddRating = ({ product, user }: AddRatingProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  //programmatically change a field's value in form
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (data.rating === 0) return toast.error("No rating selected");

    const ratingData = {
      ...data,
      userId: user?.id,
      product: product,
      // variants: variants,
    };
    console.log(ratingData);

    //    Saving customer review to DB
    axios
      .post("/api/rating", ratingData)
      .then(() => {
        toast.success("Rating submitted");
        router.refresh();
      })
      .catch((error) => {
        const message =
          error?.response?.data?.message || "Something went wrong";
        toast.error(message);
      })
      .finally(() => {
        reset();
        setIsLoading(false);
      });
  };

  // If no user or product
  if (!user || !product) return null;

  // Retrieve delivered orders
  const deliveredOrder = user?.orders?.some(
    (order: Order) =>
      order.products.find((item) => item.id === product.id) &&
      order.deliveryStatus === "delivered"
  );

  // Check if user already left review for this particular product
  const userReview = product?.reviews?.find((review: Review) => {
    return review.userId === user.id;
  });

  // Return error if already user left review or no delivered product
  if (!deliveredOrder) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 max-w-[700px]">
      <Heading title="Rate this product" />
      <div className="flex flex-col gap-4">
        <Rating
          onChange={(event, newValue) => {
            setValue("rating", newValue);
          }}
        />

        {/* Input Review */}
        <Input
          id="comment"
          label="Comment"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Button
          label={isLoading ? "Loading" : "Rate Product"}
          onClick={handleSubmit(onSubmit)}
          custom
        />
      </div>
    </div>
  );
};

export default AddRating;
