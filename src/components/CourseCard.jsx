import { useState } from "react";
import { Star } from "lucide-react"; // Import Star icon
import GetReview from "../pages/students/GetReview";
import RequestAccess from "../pages/students/RequestAccess";

export default function CourseCard({ content }) {
  const [showReviews, setShowReviews] = useState(false);
  
  if (!content) return null;

  const {
    _id,
    isPaid,
    title = "Untitled Course",
    tutor,
    image,
    price = 0,
    description = "No description available.",
  } = content;

  const author = tutor?.firstName || "Unknown Tutor";
  const displayPrice = price === 0 ? "Free" : `LKR ${price}`;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col h-full">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
           <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
            {displayPrice}
          </span>
          
          {/* ⭐ REVIEW TRIGGER BUTTON */}
          <button 
            onClick={() => setShowReviews(true)}
            className="flex items-center gap-1 text-xs font-bold text-yellow-600 hover:text-yellow-700 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-200 transition-colors"
          >
            <Star size={14} className="fill-yellow-500" />
            Reviews
          </button>
        </div>

        <h3 className="mt-4 text-xl font-serif font-bold text-[#1e3a5f]">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mt-1">by {author}</p>

        <p className="text-sm text-gray-500 mt-3 line-clamp-2 flex-grow">
          {description}
        </p>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <RequestAccess
            contentId={_id}
            isPaid={isPaid}
          />
        </div>
      </div>

      {/* Review List Pop-up */}
      <GetReview
        isOpen={showReviews} 
        onClose={(e) => {
            // Optional: check if e exists (not all triggers provide it)
            if(e && e.stopPropagation) e.stopPropagation(); 
            setShowReviews(false);
        }} 
        contentId={_id} 
        courseTitle={title} 
      />
    </div>
  );
}