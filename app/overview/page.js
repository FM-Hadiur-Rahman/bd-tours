import Overview from "../_components/overview";
import { API_BASE_URL } from "@/utils/api";

// ✅ Tells Next.js NOT to pre-render this page during build
export const dynamic = "force-dynamic";

export default async function Page() {
  let tours = [];

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/tours`, {
      cache: "no-store", // optional but avoids stale data
    });
    const result = await res.json();
    tours = result.data.data || [];
  } catch (error) {
    console.error("❌ Failed to fetch tours:", error);
    // Optional: fallback UI or message
  }

  return (
    <div>
      <div>
        <h1 className="bg-yellow-50 py-6 text-3xl ">All Tours</h1>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-4">
        {tours.map((tour) => (
          <Overview tour={tour} key={tour.id} />
        ))}
      </ul>
    </div>
  );
}
