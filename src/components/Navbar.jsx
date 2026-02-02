import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user")); // Assuming you store user object
    
    setIsLoggedIn(!!token);
    setRole(storedUser?.role || null); 
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token"); // Clear the token
    localStorage.removeItem("user");  // Clear user info if stored
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  const getDashboardPath = () => {
    if (role === "admin") return "/admin/dashboard";
    if (role === "tutor") return "/tutor";
    return "/student/dashboard"; // Default to student
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-[#1e3a5f] font-bold text-xl">
          <Link to="/">GK4S Academy</Link>
        </div>

        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
          <li><Link to="/course" className="hover:text-blue-600 transition">Courses</Link></li>
          <li><Link to="/tutors" className="hover:text-blue-600 transition">Tutors</Link></li>
          <li><Link to="/contact" className="hover:text-blue-600 transition">Contact</Link></li>
          <li><Link to="/about" className="hover:text-blue-600 transition">About Us</Link></li>
        </ul>

        <div className="flex gap-4 items-center">
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* Dynamic Dashboard Link based on Role */}
                <Link 
                  to={getDashboardPath()} 
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title={`${role} Dashboard`}
                >
                  <LayoutDashboard size={22} />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-5 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-md hover:bg-red-100 transition-colors border border-red-200"
                >
                  <LogOut/>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-blue-700 transition-colors"
                >
                  <LogIn/>
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-2 bg-[#1e3a5f] text-white text-sm font-medium rounded-md hover:bg-[#163050] transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}