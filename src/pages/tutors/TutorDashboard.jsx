import React, { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Star,
  MessageSquare,
  Settings,
  TrendingUp,
  Plus,
} from "lucide-react";
import TutorSidebar from "./TutorSidebar";
import { useNavigate } from "react-router-dom";
import TutorCourses from "./TutorCourses";
import axios from "axios";
import Messages from "../../components/Messages";

export default function TutorDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  
  // NEW: State for navigation and specific chat selection
  const [activeTab, setActiveTab] = useState("dashboard"); 
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    rating: 0,
    reviews: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setCurrentUser(res.data))
    .catch(() => window.location.href = "/login");

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/tutor-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setStats(res.data))
    .catch((err) => console.error("Error fetching stats", err));
  }, []);

  // NEW: Function to handle jumping to a specific chat
  const handleOpenChat = (student) => {
    setSelectedStudent(student);
    setActiveTab("messages");
  };

  function handleAddCourse() {
    navigate("/tutor/add-course");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Pass setActiveTab to allow navigation */}
      <TutorSidebar 
        className="flex-shrink-0" 
        currentUser={currentUser} 
        setActiveTab={setActiveTab} 
      />

      <main className="flex-1 lg:ml-64 p-6 lg:p-10 transition-all duration-300">
        {/* CONDITIONAL RENDERING BASED ON TAB */}
        {activeTab === "dashboard" ? (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#1e3a5f] font-serif">
                  Tutor Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Welcome back, {currentUser?.firstName || "Tutor"}.
                </p>
              </div>
              <div className="flex gap-3">
                {/* Click message icon to go to messages tab */}
                <button 
                  onClick={() => setActiveTab("messages")}
                  className="p-2 bg-white border rounded-lg hover:bg-gray-50"
                >
                  <MessageSquare className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 bg-white border rounded-lg">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              {[
                { label: "Students", value: stats.students?.toLocaleString() || 0, icon: Users },
                { label: "Courses", value: stats.courses || 0, icon: BookOpen },
                { label: "Rating", value: stats.rating || 0, icon: Star },
                { label: "Reviews", value: stats.reviews || 0, icon: MessageSquare },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-500 uppercase">{item.label}</p>
                    <item.icon className="h-5 w-5 text-[#1e3a5f]" />
                  </div>
                  <p className="text-3xl font-bold text-[#1e3a5f]">{item.value}</p>
                  <div className="flex items-center text-green-600 text-xs mt-2">
                    <TrendingUp className="h-3 w-3 mr-1" /> +12% this month
                  </div>
                </div>
              ))}
            </div>

            {/* Courses - If you add a "Message" button in TutorCourses, pass handleOpenChat there */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-[#1e3a5f] font-serif">
                  My Courses
                </h2>
                <button 
                  className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2a5282]" 
                  onClick={handleAddCourse}
                >
                  <Plus className="h-4 w-4" /> Add Course
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <TutorCourses onMessageStudent={handleOpenChat} />
              </div>
            </div>
          </>
        ) : (
          /* MESSAGES TAB */
          <div className="mt-4">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-bold text-[#1e3a5f] font-serif">Messages</h2>
               <button 
                 onClick={() => { setActiveTab("dashboard"); setSelectedStudent(null); }}
                 className="text-sm text-blue-600 hover:underline"
               >
                 Back to Dashboard
               </button>
            </div>
            {/* Pass the selected student to the Messages component */}
            <Messages chatPartner={selectedStudent} />
          </div>
        )}
      </main>
    </div>
  );
}