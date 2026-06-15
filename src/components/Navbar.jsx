import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setIsLoggedIn(!!token);
    setRole(storedUser?.role || null);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setRole(null);

    navigate("/login");
  };

  const getDashboardPath = () => {
    if (role === "admin") return "/admin/dashboard";
    if (role === "tutor") return "/tutor";
    return "/student";
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-[#1e3a5f] font-bold text-xl md:text-2xl"
          >
            GK4S Academy
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/course"
                className="hover:text-blue-600 transition-colors"
              >
                Courses
              </Link>
            </li>

            <li>
              <Link
                to="/tutors"
                className="hover:text-blue-600 transition-colors"
              >
                Tutors
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
            </li>
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  title={`${role} Dashboard`}
                >
                  <LayoutDashboard size={22} />
                </Link>

                <button
                  onClick={handleSignOut}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut size={22} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#1e3a5f] hover:text-blue-700 transition-colors"
                >
                  <LogIn size={22} />
                </Link>

                <Link
                  to="/login"
                  className="px-5 py-2 bg-[#1e3a5f] text-white rounded-md hover:bg-[#163050] transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1e3a5f]"
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
          >
            {isMobileMenuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 border-t pt-4 pb-2">
            <div className="flex flex-col gap-4 text-gray-700 font-medium">

              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Home
              </Link>

              <Link
                to="/course"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Courses
              </Link>

              <Link
                to="/tutors"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Tutors
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-blue-600"
              >
                Contact
              </Link>

              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-blue-600"
              >
                About Us
              </Link>

              <div className="border-t pt-4">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-blue-600 font-medium"
                    >
                      <LayoutDashboard size={20} />
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-red-600 font-medium"
                    >
                      <LogOut size={20} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-[#1e3a5f] font-medium"
                    >
                      <LogIn size={20} />
                      Login
                    </Link>

                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-[#1e3a5f] text-white py-3 rounded-lg text-center font-medium hover:bg-[#163050]"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}