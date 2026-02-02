import { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Download, Loader2 } from "lucide-react";

export default function GetMaterials({ courseId }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // inside GetReview.jsx
useEffect(() => {
  // 🛑 STOP: Only fetch if the student actually clicked the button
  if (!isOpen || !contentId) return;

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Get your JWT
      
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/content/${contentId}`,
        {
          headers: { Authorization: `Bearer ${token}` } // 🔑 Add this to fix 401
        }
      );
      setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchReviews();
}, [isOpen, contentId]); // Only runs when modal opens or ID changes

  if (loading) return <Loader2 className="animate-spin text-blue-500" />;

  return (
    <div className="mt-4 space-y-2">
      <h4 className="font-semibold text-gray-700 mb-2">Course Materials</h4>
      {materials.length === 0 ? (
        <p className="text-sm text-gray-500">No materials uploaded yet.</p>
      ) : (
        materials.map((item) => (
          <div key={item._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" size={20} />
              <span className="text-sm font-medium text-gray-800">{item.title}</span>
            </div>
            <a
              href={`${import.meta.env.VITE_BACKEND_URL}${item.fileUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-blue-100 rounded-full text-blue-600 transition"
            >
              <Download size={18} />
            </a>
          </div>
        ))
      )}
    </div>
  );
}