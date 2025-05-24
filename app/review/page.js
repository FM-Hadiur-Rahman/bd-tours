export default function Page() {
  return (
    <div className="relative w-72 h-72 bg-lightblue">
      <div className="absolute top-12 left-12 bg-red-500 text-white p-4">
        I am absolutely positioned within the container
      </div>
    </div>
  );
}
