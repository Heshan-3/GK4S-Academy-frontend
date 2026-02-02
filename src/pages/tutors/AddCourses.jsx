import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react"; // Make sure to install lucide-react

export default function AddCourseModal({ isOpen, onClose, refreshCourses }) {
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isPaid, setIsPaid] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  if (!isOpen) return null; // Don't render anything if not open

  // Inside your handleAddCourse function
  async function handleAddCourse(e) {
      e.preventDefault();
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("videoLink", videoLink);
      formData.append("isPaid", isPaid); 
      formData.append("price", price);
      formData.append("description", description);
      
      // This MUST match the string "image" in upload.single("image")
      if (imageFile) {
          formData.append("image", imageFile); 
      }

      try {
          await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/contents/add`,
              formData,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                      // Note: Do NOT set 'Content-Type' manually. 
                      // Axios does it automatically for FormData with the correct boundary.
                  },
              }
          );
          refreshCourses();
          onClose();
      } catch (error) {
          console.error("Upload Error:", error.response?.data || error.message);
      }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        
        {/* Header */}
        <div className="sticky top-0 bg-white px-8 py-6 border-b flex justify-between items-center z-10">
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Add New Course</h1>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAddCourse} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Video URL</label>
            <input
              type="url"
              required
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#1e3a5f] file:text-white hover:file:bg-[#163050]"
            />
          </div>

          <div className="flex items-center gap-4 py-2">
            <label className="text-sm font-medium text-gray-700">Is the Course Paid?</label>
            <input
              type="checkbox"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
              className="w-5 h-5 accent-[#1e3a5f] rounded cursor-pointer"
            />
          </div>

          {isPaid && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (LKR)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] bg-[#1e3a5f] text-white py-3 rounded-xl font-semibold hover:bg-[#163050] transition shadow-lg shadow-blue-900/20"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}