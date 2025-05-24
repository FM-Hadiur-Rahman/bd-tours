"use client";

import { useState } from "react";
import Image from "next/image";
import MapBoxComponent from "./mapBox";
import ReviewCard from "./ReviewCard";
import { userData } from "../context/AuthContext";

export default function TourDetailsPage({ tour }) {
  const [loading, setLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  if (!tour) return <p>Loading...</p>; // Loading state

  return (
    <div>
      <div className="bg-white shadow-lg overflow-hidden">
        <div className="relative flex flex-col">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <Image
            src={`/img/tours/${tour.imageCover}`}
            alt={tour.name}
            width={400}
            height={250}
            priority
            className="w-full h-64 object-cover"
          />
          <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold bg-black/50 px-3 py-1 rounded">
            {tour.name}
          </h3>
        </div>

        <div className="p-6">
          <h4 className="text-lg font-semibold text-gray-700">
            {tour.difficulty} {tour.duration}-day tour
          </h4>
          <p className="text-gray-600 mt-2">{tour.summary}</p>

          <div className="mt-4 space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500">
                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
              </svg>
              <span>{tour.startLocation?.description || "No description"}</span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500">
                <use xlinkHref="/img/icons.svg#icon-calendar"></use>
              </svg>
              <span>
                {tour.startDates && tour.startDates.length > 0
                  ? new Date(tour.startDates[0]).toLocaleString("en-us", {
                      month: "long",
                      year: "numeric",
                    })
                  : "No start date available"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500">
                <use xlinkHref="/img/icons.svg#icon-flag"></use>
              </svg>
              <span>
                {tour.locations && tour.locations.length > 0
                  ? `${tour.locations.length} stops`
                  : "No locations available"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-500">
                <use xlinkHref="/img/icons.svg#icon-user"></use>
              </svg>
              <span>{tour.maxGroupSize} people</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 px-6 py-4">
          <p className="text-gray-700 font-semibold text-lg">
            ${tour.price} <span className="text-sm">per person</span>
          </p>
          <p className="text-yellow-500 font-semibold">
            {tour.ratingsAverage}
            <span className="text-gray-500">({tour.ratingsQuantity})</span>
          </p>
        </div>
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
              Your Guides
            </h1>
            {tour.guides.map((guide) => (
              <div
                key={guide._id}
                className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src={`/img/users/${guide.photo}`}
                      alt={guide.name}
                      width={400}
                      height={250}
                      priority
                      className="w-24 h-24 object-cover rounded-full"
                    />
                  </div>
                  <div className="ml-4 flex flex-col justify-center">
                    <h3 className="font-semibold text-gray-800">
                      {guide.name}
                    </h3>
                    <span
                      className={`${
                        guide.role === "lead-guide"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      } text-white px-3 py-1 rounded-full text-xs mt-2`}
                    >
                      {guide.role === "lead-guide"
                        ? "Lead guide"
                        : "Tour guide"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className=" ml-4 mb-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mb-4">
              Tour Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {tour.description}
            </p>
          </div>
        </div>

        <MapBoxComponent tour={tour} />
        <div>
          <div className="py-20 grid grid-flow-col gap-12">
            {tour.reviews?.length > 0 ? (
              tour.reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))
            ) : (
              <p className="text-center text-gray-500">No reviews available.</p>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center bg-gray-900 p-8">
          <div className="relative h-60 w-60">
            {/* Logo Image */}
            <div className="absolute left-0 top-1/2 h-60 w-60 rounded-full shadow-xl flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 z-10 -translate-x-[35%] -translate-y-1/2">
              <img
                src="/img/logo-white.png"
                alt="Natours logo"
                className="w-full"
              />
            </div>

            {/* Tour Images */}
            <img
              src={`http://localhost:8000/img/tours/${tour.images[1]}`}
              alt="Tour picture"
              className="absolute left-0 top-1/2 h-60 w-60 rounded-full shadow-lg -translate-x-[10%] -translate-y-1/2 scale-[0.97] z-9"
            />
            <img
              src={`http://localhost:8000/img/tours/${tour.images[2]}`}
              alt="Tour picture"
              className="absolute left-0 top-1/2 h-60 w-60 rounded-full shadow-lg -translate-x-[-15%] -translate-y-1/2 scale-[0.94] z-8"
            />
          </div>

          <div className=" flex flex-col items-center text-center space-y-4">
            <h2 className="heading-secondary text-4xl font-bold text-white">
              What are you waiting for?
            </h2>
            <p className=" text-lg text-gray-300">
              {tour.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>

            <div>
              {userData ? (
                <button
                  className="btn btn--green bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full w-full"
                  data-tour-id={tour.id}
                >
                  Book tour now!
                </button>
              ) : (
                <a
                  href="/login"
                  className="btn btn--green bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full w-full"
                >
                  Log in to book tour
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
