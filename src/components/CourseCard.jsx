export default function CourseCard({ content }) {
  // 🔐 Prevent crash when data is not yet available
  if (!content) return null;

  // Destructure only the fields from your Content model
  const {
    title = "Untitled Course",
    tutor,
    image, // Ensure your backend provides this URL
    price = 0,
    description = "No description available.",
  } = content;

  const author = tutor?.firstName || "Unknown Tutor";
  const displayPrice = price === 0 ? "Free" : `$${price}`;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        {/* Price Tag */}
        <span className="text-xs bg-primary text-white px-3 py-1 rounded-full">
          {displayPrice}
        </span>

        {/* Title */}
        <h3 className="mt-4 text-xl font-serif font-bold">
          {title}
        </h3>

        {/* Tutor Name */}
        <p className="text-sm text-gray-600 mt-1">
          by {author}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 mt-3 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}