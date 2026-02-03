import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Video, Star, BookOpen, TimerIcon, Timer, Trash2, Pencil } from "lucide-react"; // Using lucide-react for icons
import AddMaterial from "./AddMaterial";
import UpdateCourseModal from "../UpdateCourse";
import toast from "react-hot-toast";


export default function TutorCourses() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [itemsLoaded, setItemsLoaded] = useState(true)
    const [contents, setContents] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/contents/tutor-contents`, {
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setCourses(response.data);
            setItemsLoaded(false);
        }).catch((error) => {
            console.error("Error fetching courses:", error);
            setIsLoading(false);
        });
    }, [itemsLoaded]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this course?")) {
            const token = localStorage.getItem("token");

            // Optimistic UI update: Remove from state immediately
            setContents(contents.filter((content) => content._id !== id));

            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/contents/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log("Deleted:", res.data);
                toast.success("Deleted successfully")
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to delete. Refreshing list.");
                setItemsLoaded(true); // Trigger a re-fetch if delete fails
            });
        }
    }

    const handleEditClick = (e, course) => {
        e.stopPropagation(); // Stop navigation if card is clickable
        setCourseToEdit(course);
        setShowEditModal(true);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">My Courses</h1>
            
            <div className="flex flex-col gap-4">
                {courses.map((course) => (
                    <div 
                        key={course._id}
                        className="relative flex items-center p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        // onClick={() => navigate(`/course/${course._id}`)}
                    >
                        {/* Left: Icon/Image Placeholder */}
                        <div className="w-40 h-24 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500 mr-6 shrink-0">
                            <BookOpen size={40} strokeWidth={1.5} />
                        </div>

                        <button 
                                onClick={(e) => handleEditClick(e, course)}
                                className="absolute top-3 right-15 p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                                title="Edit Course"
                            >
                                <Pencil size={18} />
                        </button>

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
                                <div className="flex items-center gap-1.5">
                                    <Timer size={18} className="text-yellow-400 fill-yellow-400" />
                                    <span className="font-medium text-gray-600">
                                        {new Date(course.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                {/* 👉 ADD MATERIAL BUTTON */}
                                <button
                                    onClick={() => {
                                        setSelectedCourseId(course._id);
                                        setShowModal(true);
                                    }}
                                    className="ml-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                                    >
                                    + Add Material
                                </button>

                            </div>
                        </div>
                    </div>
                ))}

                {courses.length === 0 && !isLoading && (
                    <p className="text-gray-500 italic">No courses found.</p>
                )}
            </div>
            {/* UPDATE COURSE MODAL */}
            <UpdateCourseModal 
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                refreshCourses={() => setItemsLoaded(true)}
                course={courseToEdit}
            />
            <AddMaterial
                isOpen={showModal}
                courseId={selectedCourseId}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
}