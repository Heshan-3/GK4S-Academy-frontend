import { useState } from "react";
import axios from "axios";
import { X, Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function AddMaterial({ isOpen, onClose, courseId}) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);
      formData.append("courseId", courseId);

      const token = localStorage.getItem("token");

    await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/materials/add`,
    formData,
    {
        headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        },
    }
    );


      toast.success("Material added successfully!");
      onClose();
      setTitle("");
      setFile(null);
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X />
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-[#1e3a5f] mb-1">
            Add Course Material
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Upload notes, PDFs, videos, or resources
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Material title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            {/* File input */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:border-blue-500 transition">
              <Upload className="text-blue-500 mb-2" />
              <span className="text-sm text-gray-500">
                {file ? file.name : "Click to upload file"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </label>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Uploading..." : "Add Material"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
