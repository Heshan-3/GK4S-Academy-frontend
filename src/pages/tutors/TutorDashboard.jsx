import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Star,
  MessageSquare,
  Settings,
  TrendingUp,
} from "lucide-react";
import TutorSidebar from "./TutorSidebar";
import TutorCourses from "./TutorCourses";
import axios from "axios";
import Messages from "../../components/Messages";
import AddCourseModal from "./AddCourses"; // Your Modal component

export default function TutorDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // For reloading courses
  
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    rating: 0,
    reviews: 0,
  });

  // Function to trigger course list refresh
  const fetchCourses = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Fetch User Info
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setCurrentUser(res.data))
    .catch(() => window.location.href = "/login");

    // Fetch Stats
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/tutor-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setStats(res.data))
    .catch((err) => console.error("Error fetching stats", err));
  }, []);

  const handleOpenChat = (student) => {
    setSelectedStudent(student);
    setActiveTab("messages");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <TutorSidebar 
        className="flex-shrink-0" 
        currentUser={currentUser} 
        setActiveTab={setActiveTab} 
      />

      <main className="flex-1 lg:ml-64 p-6 lg:p-10 transition-all duration-300">
        {activeTab === "dashboard" ? (
          <>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#1e3a5f]">Tutor Dashboard</h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, <span className="font-semibold text-blue-600">{currentUser?.firstName || "Tutor"}</span>.
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setActiveTab("messages")}
                  className="p-2.5 bg-white border rounded-xl hover:bg-gray-50 shadow-sm transition-all"
                >
                  <MessageSquare className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2.5 bg-white border rounded-xl hover:bg-gray-50 shadow-sm transition-all">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { label: "Students", value: stats.students, icon: Users, color: "text-blue-600" },
                { label: "Courses", value: stats.courses, icon: BookOpen, color: "text-indigo-600" },
                { label: "Rating", value: `${stats.rating}/5`, icon: Star, color: "text-yellow-500" },
                { label: "Reviews", value: stats.reviews, icon: MessageSquare, color: "text-teal-600" },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                    <div className={`p-2 rounded-lg bg-gray-50 ${item.color}`}>
                      <item.icon size={20} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{item.value || 0}</p>
                  <div className="flex items-center text-green-600 text-[10px] font-bold mt-2 bg-green-50 w-fit px-2 py-0.5 rounded-full">
                    <TrendingUp size={12} className="mr-1" /> +12% GROWTH
                  </div>
                </div>
              ))}
            </div>

            {/* Courses Section */}
            <div className="mb-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-[#1e3a5f]">My Courses</h2>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 bg-[#1e3a5f] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#163050] transition-all shadow-lg shadow-blue-900/20"
                >
                  <BookOpen size={18} />
                  Create New Course
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {/* We pass refreshKey to force the component to update when it changes */}
                <TutorCourses key={refreshKey} onMessageStudent={handleOpenChat} />
              </div>
            </div>
          </>
        ) : (
          /* Messages Section */
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold text-[#1e3a5f]">Messages</h2>
               <button 
                 onClick={() => { setActiveTab("dashboard"); setSelectedStudent(null); }}
                 className="text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition"
               >
                 ← Dashboard
               </button>
            </div>
            <Messages chatPartner={selectedStudent} />
          </div>
        )}
      </main>

      {/* MODAL COMPONENT */}
      <AddCourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        refreshCourses={fetchCourses}
      />
    </div>
  );
}