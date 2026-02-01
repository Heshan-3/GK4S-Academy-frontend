import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { StatsCard } from '../components/StatsCard';
import { CourseCard } from '../components/CourseCard';
import { VideoCard } from '../components/VideoCard';
import { MaterialCard } from '../components/MaterialCard';
import { ReviewModal } from '../components/ReviewModal';
import {
  Bell,
  Settings,
  Video,
  FileText,
  MessageSquare,
  Star,
  Menu,
  ChevronRight,
  Search
} from 'lucide-react';

export function StudentDashboard() {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const user = {
    name: 'Sarah Johnson',
    email: 'sarah@student.com',
    avatar: 'SJ'
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-10 max-w-[1600px] mx-auto w-full transition-all duration-300">
        
        {/* Header Section with Glass Effect */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2.5 text-slate-600 hover:bg-white hover:shadow-md rounded-xl transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Dashboard
              </h1>
              <p className="text-slate-500 font-medium mt-1.5 flex items-center gap-2">
                Welcome back, <span className="text-[#1e3a5f] font-bold">{user.name}</span> ✨
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Elegant Search Bar Design */}
            <div className="hidden lg:flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all w-64">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search courses..." className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full" />
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg transition-all active:scale-95">
                <Bell className="w-5 h-5" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm animate-pulse"></span>
              </button>
              <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:shadow-lg transition-all active:scale-95">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Stats Row - Enhanced with Gradients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Videos Watched', val: '24', trend: '+12% this month', icon: Video, color: 'text-blue-600 bg-blue-50' },
            { label: 'Materials', val: '12', trend: '+5% this month', icon: FileText, color: 'text-indigo-600 bg-indigo-50' },
            { label: 'Messages', val: '03', trend: 'New messages', icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50' },
            { label: 'Reviews Given', val: '08', trend: '+2 this month', icon: Star, color: 'text-amber-600 bg-amber-50' },
          ].map((stat, idx) => (
            <div key={idx} className="group hover:scale-[1.02] transition-transform duration-300">
              <StatsCard
                label={stat.label}
                value={stat.val}
                trend={stat.trend}
                icon={stat.icon}
                className="shadow-sm border-none bg-white rounded-2xl overflow-hidden"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Courses Section with Layout Polish */}
            <section className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                   My Enrolled Courses
                </h2>
                <button className="group flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                  View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="grid gap-5">
                <CourseCard title="Python for Data Science" tutor="John Vince" students={450} videos={12} rating={4.8} category="Programming" />
                <CourseCard title="Advanced Web Development" tutor="Sarah Smith" students={320} videos={24} rating={4.9} category="Web Dev" />
                <CourseCard title="Machine Learning Basics" tutor="Mike Ross" students={180} videos={8} rating={4.7} category="Data Science" />
              </div>
            </section>

            {/* Recent Videos Section with Chip Polish */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Recent Videos</h2>
                <div className="flex p-1 bg-slate-200/50 rounded-xl w-fit">
                  {['All', 'Purchased', 'Free'].map((tab) => (
                    <span 
                      key={tab}
                      className={`px-4 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                        tab === 'All' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                <VideoCard title="Intro to React Hooks" duration="12:45" isPurchased={true} thumbnailColor="bg-blue-100" />
                <VideoCard title="Understanding APIs" duration="08:30" isPurchased={true} thumbnailColor="bg-indigo-100" />
                <VideoCard title="CSS Grid Mastery" duration="15:20" isPurchased={false} thumbnailColor="bg-rose-100" />
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-10">
            
            {/* Quick Actions - High Contrast */}
            <section className="bg-[#1e3a5f] p-8 rounded-[2rem] shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
              <h2 className="text-xl font-bold text-white mb-6 relative z-10">Quick Actions</h2>
              <div className="space-y-4 relative z-10">
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="w-full flex items-center justify-center gap-3 bg-white text-[#1e3a5f] py-3.5 rounded-xl hover:bg-blue-50 transition-all font-bold shadow-lg active:scale-95"
                >
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  Write a Review
                </button>
                <button className="w-full flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white py-3.5 rounded-xl hover:bg-white/20 transition-all font-bold backdrop-blur-md active:scale-95">
                  <MessageSquare className="w-5 h-5" />
                  Chat with Tutor
                </button>
              </div>
            </section>

            {/* Study Materials - Clean List */}
            <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Materials</h2>
                <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
              </div>
              <div className="space-y-2">
                <MaterialCard title="Python Cheat Sheet" type="PDF" size="2.4 MB" date="Oct 24" />
                <MaterialCard title="Web Dev Resources" type="Link" date="Oct 22" />
                <MaterialCard title="Data Science Guide" type="PDF" size="5.1 MB" date="Oct 20" />
                <MaterialCard title="React Best Practices" type="PDF" size="1.2 MB" date="Oct 18" />
              </div>
            </section>

            {/* Messages - Interactive Feed */}
            <section className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Messages</h2>
                <span className="bg-rose-100 text-rose-600 text-[10px] uppercase tracking-widest font-black px-2.5 py-1 rounded-full">
                  3 New
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'John Vince', msg: "Don't forget to submit...", time: '2m ago', color: 'bg-blue-100' },
                  { name: 'Sarah Smith', msg: 'Great work on the...', time: '1h ago', color: 'bg-emerald-100' },
                  { name: 'Mike Ross', msg: 'Class starts in 10...', time: '3h ago', color: 'bg-amber-100' }
                ].map((msg, i) => (
                  <div key={i} className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-all group cursor-pointer border border-transparent hover:border-slate-100">
                    <div className={`w-12 h-12 rounded-xl ${msg.color} flex items-center justify-center text-sm font-bold text-slate-700 shadow-inner group-hover:scale-110 transition-transform`}>
                      {msg.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="text-sm font-bold text-slate-900 truncate tracking-tight">{msg.name}</h4>
                        <span className="text-[10px] font-medium text-slate-400">{msg.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate leading-relaxed font-medium">{msg.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} />
    </div>
  );
}