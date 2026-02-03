import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import AdminUsers from "./AdminUsers";
import AdminContents from "./AdminContents";
import { BookOpen, DollarSign, GraduationCap, MessageSquare, Star, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userValidated, setUserValidated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [stats, setStats] = useState({
      students: 0,
      tutors: 0,
      courses: 0,
      revenue: 0,
    });

    const fetchStats = async (token) => {
    try {
      // Make sure this route matches your backend route definition
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/admin-stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

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
          fetchStats(token);
        }
      })
      .catch((err) => {
        console.error(err);
        window.location.href = "/login";
      });

      const intervalId = setInterval(() => {
        fetchStats(token); 
    }, 10000); // 10000ms = 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

  }, []);


  if (!userValidated) return null;

  const statCards = [
    { label: "Total Students", value: stats.students, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Tutors", value: stats.tutors, icon: GraduationCap, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Active Courses", value: stats.courses, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: ( <>Total Revenue <br /> (From Courses)</> ), value: `LKR${stats.revenue}`, icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
  ];

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
        <div>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {statCards.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                  <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">{item.value}</p>
                <div className="flex items-center text-green-600 text-[10px] font-bold mt-2 bg-green-50 w-fit px-2 py-0.5 rounded-full">
                  <TrendingUp size={12} className="mr-1" /> LIVE
                </div>
              </div>
            ))}
          </div>


            <Routes>
                <Route path="users" element={<AdminUsers/>}></Route>
                <Route path="contents" element={<AdminContents/>}></Route>
            </Routes>
        </div>
      </main>
    </div>
  );
}
