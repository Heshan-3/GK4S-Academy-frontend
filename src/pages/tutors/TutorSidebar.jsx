import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  BarChart3,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";


export default function TutorSidebar({
  currentUser,
  isMobileOpen,
  onCloseMobile,
}) {
  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-[#1e3a5f] text-white
          transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-[#2d4b75]">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-[#8b9a7d]" />
              <span className="text-2xl font-bold font-serif tracking-tight">
                GK4S Academy
              </span>
            </div>
            <div className="mt-2 px-2 py-1 bg-[#2d4b75] rounded text-xs font-medium text-[#8b9a7d] uppercase">
              Tutor Portal
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            <div>
                <Link 
                  to="/tutor/requested-courses" 
                  className="group flex items-center px-4 py-3 text-gray-400 font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#2d4b75] hover:to-[#1e3a5f] hover:text-white hover:shadow-lg hover:shadow-blue-900/20 active:scale-95"
                >
                  {/* Icon Container */}
                  <div className="mr-3 p-2 rounded-lg bg-gray-800 transition-colors group-hover:bg-[#3d5e8c]">
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>

                  {/* Label */}
                  <span className="tracking-wide">Requests</span>

                  {/* Hover Indicator */}
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_#60a5fa]"></div>
                </Link>
              </div>

            <div>
                <Link 
                  to="/contact" 
                  className="group flex items-center px-4 py-3 text-gray-400 font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#2d4b75] hover:to-[#1e3a5f] hover:text-white hover:shadow-lg hover:shadow-blue-900/20 active:scale-95"
                >
                  {/* Icon Container */}
                  <div className="mr-3 p-2 rounded-lg bg-gray-800 transition-colors group-hover:bg-[#3d5e8c]">
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>

                  {/* Label */}
                  <span className="tracking-wide">Contact</span>

                  {/* Hover Indicator */}
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_#60a5fa]"></div>
                </Link>
              </div>

           <div>
                <Link 
                  to="/" 
                  className="group flex items-center px-4 py-3 text-gray-400 font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#2d4b75] hover:to-[#1e3a5f] hover:text-white hover:shadow-lg hover:shadow-blue-900/20 active:scale-95"
                >
                  {/* Icon Container */}
                  <div className="mr-3 p-2 rounded-lg bg-gray-800 transition-colors group-hover:bg-[#3d5e8c]">
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>

                  {/* Label */}
                  <span className="tracking-wide">Home</span>

                  {/* Hover Indicator */}
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_#60a5fa]"></div>
                </Link>
              </div>
            
            <div>
                <Link 
                  to="/get-complaints" 
                  className="group flex items-center px-4 py-3 text-gray-400 font-medium transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#2d4b75] hover:to-[#1e3a5f] hover:text-white hover:shadow-lg hover:shadow-blue-900/20 active:scale-95"
                >
                  {/* Icon Container */}
                  <div className="mr-3 p-2 rounded-lg bg-gray-800 transition-colors group-hover:bg-[#3d5e8c]">
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>

                  {/* Label */}
                  <span className="tracking-wide">Complaints</span>

                  {/* Hover Indicator */}
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_#60a5fa]"></div>
                </Link>
              </div>

          </nav>

          {/* User / Logout */}
          <div className="p-4 border-t border-[#2d4b75]">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-[#8b9a7d] flex items-center justify-center text-[#1e3a5f] font-bold font-serif">
                {currentUser?.firstName?.charAt(0)}
                {currentUser?.lastName?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {currentUser?.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="w-full flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
