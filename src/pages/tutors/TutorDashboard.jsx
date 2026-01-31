import React from "react";
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

export default function TutorDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 lg:p-10 flex">
      {/* Sidebar */}
      <TutorSidebar className="flex-shrink-0" />
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
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1e3a5f] text-white rounded-lg">
              <Plus className="h-4 w-4" /> Add Course
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border shadow-sm"
              >
                <div className="flex gap-6">
                  <div className="w-40 h-24 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1e3a5f]">
                      Introduction to Philosophy
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Explore ancient and modern philosophical thought.
                    </p>

                    <div className="flex gap-6 text-sm text-gray-500 mt-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> 450 students
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="h-4 w-4" /> 12 videos
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        4.8
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white rounded-xl border shadow-sm h-[500px] flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm"
                />
              </div>
            </div>

            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="p-4 hover:bg-gray-50 cursor-pointer border-b"
              >
                <p className="font-bold text-sm text-[#1e3a5f]">
                  Alex Johnson
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Thanks for the clarification!
                </p>
              </div>
            ))}
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b font-bold text-[#1e3a5f]">
              Alex Johnson
            </div>

            <div className="flex-1 p-4 bg-gray-50 space-y-4">
              <div className="max-w-xs bg-white p-3 rounded-xl shadow text-sm">
                Hi Professor, I had a question.
              </div>
              <div className="max-w-xs ml-auto bg-[#1e3a5f] text-white p-3 rounded-xl text-sm">
                Sure! Go ahead 😊
              </div>
            </div>

            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm"
              />
              <button className="p-2 bg-[#1e3a5f] text-white rounded-full">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
