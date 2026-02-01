import axios from "axios";
import { BookOpen, Timer, Video, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import RequestAccess from "./RequestAccess"; // Ensure the path is correct

export default function StudentContents() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch all contents on mount
  useEffect(() => {
    const fetchContents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/contents/all`,
          { headers: { Authorization: `Bearer ${token}` } }
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

  // 2. Logic: Filter "My Library" (Free or Approved) vs "Store" (Paid and Not Approved)
  const myLibrary = contents.filter(course => 
    !course.isPaid || course.accessStatus === 'approved'
  );

  const availableToBuy = contents.filter(course => 
    course.isPaid && course.accessStatus !== 'approved'
  );

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your classroom...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      
      {/* SECTION: MY LIBRARY (Accessible Content) */}
      <h1 className="text-3xl font-bold text-[#1e3a5f] mb-6">My Library</h1>
      <div className="flex flex-col gap-4 mb-12">
        {myLibrary.length > 0 ? (
          myLibrary.map((course) => (
            <div 
              key={course._id} 
              className="flex items-center p-5 bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-40 h-24 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mr-6 shrink-0">
                <Video size={40} strokeWidth={1.5} />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-[#1e3a5f] mb-1">{course.title}</h2>
                  <CheckCircle size={18} className="text-green-500" />
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-1">{course.description}</p>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1.5 text-blue-600 font-semibold">
                    <Video size={18} />
                    <a 
                        href={course.videoLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                    >
                      Watch Content
                    </a>
                  </div>

                  <div className="flex items-center gap-1.5 ml-auto text-gray-400">
                    <Timer size={18} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-medium text-gray-600">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">You don't have any courses yet.</p>
        )}
      </div>

      {/* SECTION: STORE (Locked/Pending Content) */}
      <h2 className="text-2xl font-bold text-gray-400 mb-6 border-t pt-8">Available Courses</h2>
      <div className="flex flex-col gap-4">
        {availableToBuy.length > 0 ? (
          availableToBuy.map((course) => (
            <div 
              key={course._id} 
              className="flex items-center p-5 bg-white border border-gray-200 rounded-2xl shadow-sm opacity-90"
            >
              <div className="w-40 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 mr-6 shrink-0">
                <BookOpen size={40} strokeWidth={1.5} />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-[#1e3a5f] mb-1">{course.title}</h2>
                    <p className="text-gray-500 text-sm mb-1">
                        {course.tutor?.firstName} {course.tutor?.lastName}
                    </p>
                  </div>
                  <span className="font-bold text-green-700">LKR {course.price}</span>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="w-48">
                    {/* Pass backend accessStatus to initialize the button state */}
                    <RequestAccess 
                      contentId={course._id} 
                      isPaid={course.isPaid} 
                      initialStatus={course.accessStatus} 
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                    <Timer size={18} className="text-yellow-400 fill-yellow-400" />
                    <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">No more courses available at the moment.</p>
        )}
      </div>
    </div>
  );
}