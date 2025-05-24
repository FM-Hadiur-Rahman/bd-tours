// app/tour/[slug]/page.js

import TourDetailsPage from "../../_components/TourDetailsPage"; // Adjust the path accordingly

export default async function Page({ params }) {
  const { slug } = await params; // Get the slug from params
  const response = await fetch(`http://127.0.0.1:8000/tour/${slug}`);

  // Check if the response is ok (status code 2xx)
  if (!response.ok) {
    throw new Error("Failed to fetch tour data");
  }

  const data = await response.json(); // Parse the JSON
  const tour = data.data.tour;

  return <TourDetailsPage tour={tour} />;
}
