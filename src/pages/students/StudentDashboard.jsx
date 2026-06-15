import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { Menu } from "lucide-react";

import StudentSidebar from "./StudentSidebar";
import StudentContents from "./StudentContents";

export default function StudentDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [userValidated, setUserValidated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const user = res.data;

        if (user.role !== "student") {
          window.location.href = "/login";
        } else {
          setUserValidated(true);
          setCurrentUser(user);
        }
      })
      .catch((err) => {
        console.error(err);
        window.location.href = "/login";
      });
  }, []);

  if (!userValidated) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <StudentSidebar
        currentUser={currentUser}
        activePage={activePage}
        onNavigate={setActivePage}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:ml-64 min-h-screen">

        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            
            <button
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>

            <h1 className="font-bold text-[#1e3a5f]">
              GK4S Academy
            </h1>

            <div className="w-10"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          <Routes>
            <Route path="/" element={<StudentContents />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}