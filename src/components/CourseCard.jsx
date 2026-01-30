export default function CourseCard({ content }) {
  // 🔐 Prevent crash when data is not yet available
  if (!content) return null;

  const {
    title = "Untitled Course",
    tutor,
    image,
    isPaid = false,
    avgRating = 0,
    totalStudents = 0,
  } = content;

  const category = isPaid ? "Premium" : "Free";
  const author = tutor?.name || "Unknown Tutor";
  const weeks = "6 weeks"; // until duration is added to Content model

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <span className="text-xs bg-primary text-white px-3 py-1 rounded-full">
          {category}
        </span>

        <h3 className="mt-4 text-xl font-serif font-bold">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          by {author}
        </p>

        <div className="flex gap-4 text-sm text-gray-600 mt-3">
          ⭐ {avgRating.toFixed(1)} | 👥 {totalStudents} | ⏱ {weeks}
        </div>

        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-accent w-[65%] rounded-full"></div>
          </div>
          <p className="text-sm text-right mt-1">65%</p>
        </div>
      </div>
    </div>
  );
}
