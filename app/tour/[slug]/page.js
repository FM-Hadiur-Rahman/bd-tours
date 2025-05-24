// app/tour/[slug]/page.js

import TourDetailsPage from "../../_components/TourDetailsPage"; // Adjust the path accordingly
import { API_BASE_URL } from "@/utils/api";

export default async function Page({ params }) {
  const { slug } = await params; // Get the slug from params
  const response = await fetch(`${API_BASE_URL}/tour/${slug}`);

  // Check if the response is ok (status code 2xx)
  if (!response.ok) {
    throw new Error("Failed to fetch tour data");
  }

  const data = await response.json(); // Parse the JSON
  const tour = data.data.tour;

  return <TourDetailsPage tour={tour} />;
}
