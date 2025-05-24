"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL } from "@/utils/api";

export default function Overview({ tour }) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(
      new Date(tour.startDates[0]).toLocaleString("en-us", {
        month: "long",
        year: "numeric",
      })
    );
  }, [tour.startDates]);

  if (!formattedDate) return null;
  return (
    <li>
      <div className=" bg-white shadow-lg  overflow-hidden transition-transform transform hover:scale-105">
        {/* Card Header */}
        <div className="relative flex flex-col">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <Image
            src={`${API_BASE_URL}/img/tours/${tour.imageCover}`}
            alt={tour.name}
            width={400}
            height={250}
            priority
            className="w-full h-56 object-cover"
          />
          <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold bg-black/50 px-3 py-1 rounded">
            {tour.name}
          </h3>
        </div>

        {/* Card Details */}
        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-700">
            {tour.difficulty} {tour.duration}-day tour
          </h4>
          <p className="text-gray-600 mt-2">{tour.summary}</p>

          {/* Tour Info */}
          <div className="mt-4 space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500">
                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
              </svg>
              <span>{tour.startLocation.description}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500">
                <use xlinkHref="/img/icons.svg#icon-calendar"></use>
              </svg>
              <span>
                {new Date(tour.startDates[0]).toLocaleString("en-us", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500">
                <use xlinkHref="/img/icons.svg#icon-flag"></use>
              </svg>
              <span>{tour.locations.length} stops</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500">
                <use xlinkHref="/img/icons.svg#icon-user"></use>
              </svg>
              <span>{tour.maxGroupSize} people</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
          <p className="text-gray-700 font-semibold text-lg">
            ${tour.price} <span className="text-sm">per person</span>
          </p>
          <p className="text-yellow-500 font-semibold">
            {tour.ratingsAverage}{" "}
            <span className="text-gray-500">({tour.ratingsQuantity})</span>
          </p>
          <Link
            href={`/tour/${tour.slug}`}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition"
          >
            Details
          </Link>
        </div>
      </div>
    </li>
  );
}
