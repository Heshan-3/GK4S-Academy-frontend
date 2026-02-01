import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Video, Star, BookOpen } from "lucide-react"; // Using lucide-react for icons

export default function TutorCourses() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contents/all`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setCourses(response.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error("Error fetching courses:", error);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">My Courses</h1>
            
            <div className="flex flex-col gap-4">
                {courses.map((course) => (
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

                            {/* Stats/Footer */}
                            <div className="flex items-center gap-6 text-gray-400 text-sm">
                                <div className="flex items-center gap-1.5">
                                    <Users size={18} />
                                    <span>450 students</span> {/* Placeholder: Add to Schema later */}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Video size={18} />
                                    <span>12 videos</span> {/* Placeholder: Add to Schema later */}
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                                    <span className="font-medium text-gray-600">4.8</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {courses.length === 0 && !isLoading && (
                    <p className="text-gray-500 italic">No courses found.</p>
                )}
            </div>
        </div>
    );
}