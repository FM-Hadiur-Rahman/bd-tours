import Overview from "../_components/overview";
import { API_BASE_URL } from "@/utils/api";

export default async function Page() {
  const res = await fetch(`${API_BASE_URL}/api/v1/tours`);
  const result = await res.json();
  // Store in state

  return (
    <div>
      <div>
        <h1 className="bg-yellow-50 py-6 text-3xl ">All Tours</h1>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-4">
        {result.data.data.map((tour) => (
          <Overview tour={tour} key={tour.id} />
        ))}
      </ul>
    </div>
  );
}
