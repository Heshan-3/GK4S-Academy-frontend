import React, { useState } from "react";
import axios from "axios";
import { Star, X } from "lucide-react";
import toast from "react-hot-toast";

export default function ReviewModal({ isOpen, onClose, contentId, courseTitle }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return alert("Please select a rating!");

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/add`,
        { contentId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Review added Successfully")
      onClose();
    } catch (error) {
      toast.error("Failed to added review")
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-bold text-navy text-lg">Review {courseTitle}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-medium text-gray-500">Tap a star to rate</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    size={36}
                    className={(hover || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
                  />
                </button>
              ))}
            </div>
          </div>

          <textarea
            required
            rows="4"
            placeholder="What did you think of this course?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-2xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] bg-[#1e3a5f] text-white py-3 rounded-2xl font-bold hover:bg-[#163050] transition shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}