import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  BarChart3,
  LogOut,
} from "lucide-react";


export default function TutorSidebar({
  activePage,
  onNavigate,
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
                Learnify
              </span>
            </div>
            <div className="mt-2 px-2 py-1 bg-[#2d4b75] rounded text-xs font-medium text-[#8b9a7d] uppercase">
              Tutor Portal
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            
          </nav>

          {/* User / Logout */}
          <div className="p-4 border-t border-[#2d4b75]">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-[#8b9a7d] flex items-center justify-center text-[#1e3a5f] font-bold font-serif">
                DR
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Dr. Sarah Miller
                </p>
                <p className="text-xs text-gray-400 truncate">
                  sarah@learnify.com
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
