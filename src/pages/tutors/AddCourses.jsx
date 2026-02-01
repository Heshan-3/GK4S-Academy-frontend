import { useState } from "react";
import axios from "axios";

export default function AddCourses() {
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isPaid, setIsPaid] = useState(true);

  async function handleAddCourse(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contents/add`,
        {
          title,
          videoLink : videoLink,
          isPaid,
          price,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Course added:", result.data);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6">
        Add New Course
      </h1>

      <form
        onSubmit={handleAddCourse}
        className="bg-white rounded-2xl shadow-lg p-6 space-y-5"
      >
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Title
          </label>
          <input
            type="text"
            placeholder="e.g. Full Stack Web Development"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none"
          />
        </div>

        {/* Video URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Video URL
          </label>
          <input
            type="url"
            placeholder="https://youtube.com/..."
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Is the Course Paid?
          </label>
          <input
            type="checkbox"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
            className="w-4 h-4 text-[#1e3a5f] rounded focus:ring-[#1e3a5f]"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (LKR)
          </label>
          <input
            type="number"
            placeholder="1500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none"
          />
        </div>

        {/* Image Upload */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Thumbnail
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm text-gray-600
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:bg-[#1e3a5f] file:text-white
              hover:file:bg-[#163050]"
          />
        </div> */}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Course Description
          </label>
          <textarea
            rows="4"
            placeholder="Write a short description about the course..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1e3a5f] focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-[#1e3a5f] text-white py-3 rounded-xl font-semibold hover:bg-[#163050] transition"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}
