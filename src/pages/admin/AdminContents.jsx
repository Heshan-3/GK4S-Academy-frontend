import axios from "axios";
import { BookOpen, Timer, Trash2, Video } from "lucide-react";
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

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            const token = localStorage.getItem("token");

            setContents(contents.filter((content) => content._id !== id));

            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/contents/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log("Deleted:", res.data);
            
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to delete. Refreshing list.");
                setLoading(true); 
            });
        }
    }

  return (
    <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">All Courses</h1>
            
            <div className="flex flex-col gap-4">
                {contents.map((course) => (
                    <div 
                        key={course._id}
                        className="relative flex items-center p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        // onClick={() => navigate(`/course/${course._id}`)}
                    >

                        <button 
                            onClick={(e) => {
                                e.stopPropagation(); // Prevents clicking the card background
                                handleDelete(course._id);
                            }}
                            className="absolute top-3 right-3 p-2 bg-red-50 text-red-500 rounded-full opacity-100 group-hover:opacity-100 transition-opacity hover:bg-red-100 z-10"
                            title="Delete Course"
                            >
                            <Trash2 size={18} />
                        </button>

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
                            <p className="text-gray-500 text-sm mb-4 line-clamp-1">
                                {course.tutor?.firstName} {course.tutor?.lastName || "Unknown Tutor"}
                            </p>
                            <div className="flex items-center gap-6 text-gray-400 text-sm">
                                <div className="flex items-center gap-1.5">
                                    <span>LKR {course.price}</span> {/* Placeholder: Add to Schema later */}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Video size={18} />
                                    <a 
                                        href={course.videoLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="hover:text-blue-600 transition-colors cursor-pointer underline-offset-4 hover:underline"
                                    >
                                        {course.videoLink}
                                    </a> {/* Placeholder: Add to Schema later */}
                                </div>
                                <div className="flex items-center gap-1.5 ml-auto">
                                    <Timer size={18} className="text-yellow-400 fill-yellow-400" />
                                    <span className="font-medium text-gray-600">
                                        {new Date(course.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                        })}
                                    </span>
                                    
                                </div>
                            </div>
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