/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";
import Image from "next/image";

interface ListRatingProps {
  product: any;
}

const ListRating = ({ product }: ListRatingProps) => {
  if (product.reviews?.length === 0) return null;
  return (
    <div className="review-section">
      <Heading title="Product Review" />
      <div>
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div
                key={review.id}
                className="max-w-1/2 mt-4 bg-slate-50 rounded-xl p-4"
              >
                <div className="flex gap-4 items-center ">
                  <Avatar src={review?.user.image} />
                  <div>
                    <p className="font-semibold">{review?.user.name}</p>
                    <p className="text-gray-600">
                      {moment(review.createdDate).fromNow()}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Rating value={review?.rating} readOnly></Rating>
                  <p className="mt-4">{review?.comment}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
