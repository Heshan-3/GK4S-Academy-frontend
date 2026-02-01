import axios from "axios";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminContents() {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loading){
            const token = localStorage.getItem("token");
            axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/contents/all`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(res => {
                setContents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching contents", err);
                setLoading(false);
            });
        }
    }, [loading]);
  return (
    <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">All Courses</h1>
            
            <div className="flex flex-col gap-4">
                {contents.map((course) => (
                    <div 
                        key={course._id}
                        className="flex items-center p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate(`/course/${course._id}`)}
                    >
                        {/* Left: Icon/Image Placeholder */}
                        <div className="w-40 h-24 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500 mr-6 shrink-0">
                            <BookOpen size={40} strokeWidth={1.5} />
                        </div>

                        {/* Middle: Content */}
                        <div className="flex-grow">
                            <h2 className="text-xl font-bold text-[#1e3a5f] mb-1">
                                {course.title}
                            </h2>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-1">
                                {course.description}
                            </p>
                        </div>
                    </div>
                ))}

                {contents.length === 0 && !loading && (
                    <p className="text-gray-500 italic">No contents found.</p>
                )}
            </div>
        </div>
  );
}