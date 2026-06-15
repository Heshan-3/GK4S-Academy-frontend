import { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Download, Loader2 } from "lucide-react";

export default function GetMaterials({ courseId }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // inside GetMaterials.jsx
useEffect(() => {
  if (!courseId) return;

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      // 💡 ADD THE QUERY PARAMETER HERE: ?courseId=${courseId}
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/materials/all?courseId=${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setMaterials(response.data);
    } catch (err) {
      console.error("Error fetching materials:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchMaterials();
}, [courseId]); // Refetch whenever the courseId changes

  if (loading) return (
    <div className="flex justify-center p-4">
      <Loader2 className="animate-spin text-blue-500" />
    </div>
  );

  if (error) return <p className="text-red-500 text-sm">{error}</p>;

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
              title="Download File"
            >
              <Download size={18} />
            </a>
          </div>
        ))
      )}
    </div>
  );
}