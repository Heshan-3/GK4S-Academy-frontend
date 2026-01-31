import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import AdminUsers from "./AdminUsers";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userValidated, setUserValidated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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

        if (user.role !== "admin") {
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

  if (!userValidated) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
      currentUser={currentUser}
        activePage={activePage}
        onNavigate={setActivePage}
        isMobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-6">
        {/* Mobile menu */}
        {/* <button
          className="lg:hidden mb-4 px-4 py-2 bg-[#1e3a5f] text-white rounded"
          onClick={() => setMobileOpen(true)}
        >
          Open Menu
        </button>

        {activePage === "dashboard" && (
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        )}

        {activePage === "students" && (
          <h1 className="text-2xl font-bold">My Students</h1>
        )}

        {activePage === "schedule" && (
          <h1 className="text-2xl font-bold">Schedule</h1>
        )}

        {activePage === "courses" && (
          <h1 className="text-2xl font-bold">Course Content</h1>
        )}

        {activePage === "earnings" && (
          <h1 className="text-2xl font-bold">Earnings</h1>
        )} */}
        <div>
            <Routes>
                <Route path="users" element={<AdminUsers/>}></Route>
            </Routes>
        </div>
      </main>
    </div>
  );
}
