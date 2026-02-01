import React, { use, useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  Star,
  MessageSquare,
  Settings,
  TrendingUp,
  Video,
  FileText,
  Send,
  Search,
  Plus,
} from "lucide-react";
import TutorSidebar from "./TutorSidebar";
import { useNavigate } from "react-router-dom";
import TutorCourses from "./TutorCourses";
import axios from "axios";
import Messages from "../../components/Messages";

export default function TutorDashboard() {
  const navigate = useNavigate();
  const [userValidated, setUserValidated] = useState(true); // Placeholder for actual validation
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const user = res.data;
      setUserValidated(true);
      setCurrentUser(user);
    })
    .catch((error) => {
      console.error("Error validating user:", error);
      window.location.href = "/login";
    });
  }, []);

  function handleAddCourse() {
    navigate("/tutor/add-course");
  }

  return (
    <div className="flex min-h-screen bg-gray-50 lg:p-10 flex">
      {/* Sidebar */}
      <TutorSidebar className="flex-shrink-0" 
        currentUser={currentUser}
      />
      {/* Header */}
        {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-10 transition-all duration-300">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1e3a5f] font-serif">
              Tutor Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back, Sarah. You have 3 upcoming sessions today.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="p-2 bg-white border rounded-lg">
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
            { label: "Students", value: "1,240", icon: Users },
            { label: "Courses", value: "8", icon: BookOpen },
            { label: "Rating", value: "4.8", icon: Star },
            { label: "Reviews", value: "132", icon: MessageSquare },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500 uppercase">{item.label}</p>
                <item.icon className="h-5 w-5 text-[#1e3a5f]" />
              </div>
              <p className="text-3xl font-bold text-[#1e3a5f]">
                {item.value}
              </p>
              <div className="flex items-center text-green-600 text-xs mt-2">
                <TrendingUp className="h-3 w-3 mr-1" /> +12% this month
              </div>
            </div>
          ))}
        </div>

        {/* Courses */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#1e3a5f] font-serif">
              My Courses
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg" onClick={handleAddCourse}>
              <Plus className="h-4 w-4" /> Add Course
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <TutorCourses />
          </div>
        </div>

        {/* Messages */}
        <div>
          <Messages />
        </div>
      </main>
    </div>
  );
}
