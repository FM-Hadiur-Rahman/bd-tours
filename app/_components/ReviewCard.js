"use client";
import Image from "next/image";
import React from "react";

const ReviewCard = ({ review }) => {
  if (!review || !review.user) return null;

  return (
    <div className="w-72 p-16 bg-gray-100 rounded-md shadow-lg snap-center flex flex-col items-center">
      {/* User Avatar */}
      <div className="flex flex-col items-center">
        {review?.user?.photo && (
          <Image
            src={`http://localhost:8000/img/users/${review?.user?.photo}`} // Use full URL
            width={50}
            height={50}
            alt="User Photo"
            className="rounded-full"
          />
        )}
        <h6 className="text-sm font-semibold text-gray-700 mt-2">
          {review.user.name}
        </h6>
      </div>

      {/* Review Text */}
      <p className="text-gray-600 text-center">{review.review}</p>

      {/* Star Rating */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-6 h-6 ${
              review.rating >= star ? "fill-yellow-400" : "fill-gray-300"
            }`}
          >
            <use xlinkHref="/img/icons.svg#icon-star"></use>
          </svg>
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
