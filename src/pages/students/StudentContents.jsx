import axios from "axios";
import { BookOpen, Timer, Video, CheckCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import RequestAccess from "./RequestAccess";
import GetMaterials from "./GetMaterials";
import ReviewModal from "./AddReview";

export default function StudentContents() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/contents/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setContents(res.data);
      } catch (err) {
        console.error("Error fetching contents", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  const myLibrary = contents.filter(
    (course) => !course.isPaid || course.accessStatus === "approved"
  );

  const availableToBuy = contents.filter(
    (course) => course.isPaid && course.accessStatus !== "approved"
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading your classroom...
      </div>
    );
  }

  return (
    <div className="px-4 py-6 md:p-8 max-w-6xl mx-auto">
      {/* MY LIBRARY */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-6">
        My Library
      </h1>

      <div className="flex flex-col gap-5 mb-12">
        {myLibrary.length > 0 ? (
          myLibrary.map((course) => (
            <div
              key={course._id}
              className="bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-5"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnail */}
                <div className="w-full md:w-40 h-40 md:h-24 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                  <Video size={40} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <h2 className="text-lg md:text-xl font-bold text-[#1e3a5f]">
                      {course.title}
                    </h2>

                    <CheckCircle
                      size={20}
                      className="text-green-500 shrink-0"
                    />
                  </div>

                  <p className="text-gray-500 text-sm mt-2">
                    {course.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
                    <a
                      href={course.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                    >
                      <Video size={18} />
                      Watch Content
                    </a>

                    <div className="flex items-center gap-2 text-gray-500 sm:ml-auto">
                      <Timer
                        size={18}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-sm">
                        {new Date(
                          course.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    <button
                      onClick={() =>
                        setActiveCourse(
                          activeCourse === course._id ? null : course._id
                        )
                      }
                      className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      {activeCourse === course._id
                        ? "Hide Materials"
                        : "View Materials"}
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCourse(course);
                        setIsModalOpen(true);
                      }}
                      className="w-full sm:w-auto px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 flex items-center justify-center gap-2 border border-yellow-200"
                    >
                      <Star
                        size={18}
                        className="fill-yellow-500 text-yellow-500"
                      />
                      Review
                    </button>
                  </div>

                  {/* Materials */}
                  {activeCourse === course._id && (
                    <div className="mt-4">
                      <GetMaterials courseId={course._id} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">
            You don't have any courses yet.
          </p>
        )}
      </div>

      {/* AVAILABLE COURSES */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-400 border-t pt-8 mb-6">
        Available Courses
      </h2>

      <div className="flex flex-col gap-5">
        {availableToBuy.length > 0 ? (
          availableToBuy.map((course) => (
            <div
              key={course._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 md:p-5"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnail */}
                <div className="w-full md:w-40 h-40 md:h-24 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
                  <BookOpen size={40} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-[#1e3a5f]">
                        {course.title}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {course.tutor?.firstName}{" "}
                        {course.tutor?.lastName}
                      </p>
                    </div>

                    <span className="font-bold text-green-700">
                      LKR {course.price}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-5">
                    <div className="w-full sm:w-auto">
                      <RequestAccess
                        contentId={course._id}
                        isPaid={course.isPaid}
                        initialStatus={course.accessStatus}
                      />
                    </div>

                    <div className="flex items-center gap-2 text-gray-500 sm:ml-auto">
                      <Timer
                        size={18}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-sm">
                        {new Date(
                          course.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">
            No more courses available at the moment.
          </p>
        )}
      </div>

      {/* REVIEW MODAL */}
      {selectedCourse && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          contentId={selectedCourse._id}
          courseTitle={selectedCourse.title}
        />
      )}
    </div>
  );
}