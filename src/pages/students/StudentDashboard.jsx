import { useEffect, useState } from "react";
import axios from "axios";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentContents from "./StudentContents";

export default function StudentDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
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

  if (!userValidated) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <StudentSidebar
      currentUser={currentUser}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-6">
        
        <div>
            <Routes>
                <Route path="/" element={<StudentContents/>}></Route>
            </Routes>
        </div>
      </main>
    </div>
  );
}
