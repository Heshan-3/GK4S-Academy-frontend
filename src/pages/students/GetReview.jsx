import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Star, MessageSquare } from "lucide-react";

export default function GetReview({ isOpen, onClose, contentId, courseTitle }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && contentId) {
      setLoading(true);
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/content/${contentId}`)
        .then(res => {
          setReviews(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen, contentId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h3 className="font-bold text-[#1e3a5f] text-xl">Course Reviews</h3>
            <p className="text-sm text-gray-500">{courseTitle}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Reviews List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading feedback...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-10">
              <MessageSquare className="mx-auto text-gray-300 mb-2" size={40} />
              <p className="text-gray-400">No reviews for this course yet.</p>
            </div>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-sm text-gray-700">
                    {rev.student?.firstName} {rev.student?.lastName}
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        className={i < rev.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"} 
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">"{rev.comment}"</p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}