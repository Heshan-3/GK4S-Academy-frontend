import { useEffect, useState } from 'react';
import {
  SearchIcon,
} from 'lucide-react';

import CourseCard from '../components/CourseCard';
import axios from 'axios';

export default function Course() {
  const [searchQuery, setSearchQuery] = useState('');

  const [allCourses, setAllCourses] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
  axios
    .get(`${backendUrl}/api/contents/featured`) // 🔥 Change this from 'public' to 'featured'
    .then((res) => {
      setAllCourses(res.data);
    })
    .catch((err) => console.error("Error loading courses:", err));
  }, [backendUrl]);

  const filteredCourses = allCourses.filter((course) => {
    // 1. Search filter (checks title and description)
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch
  })


  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Explore Our Courses
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Discover over 2,500 expertly-crafted courses across diverse disciplines. Find the perfect course to advance your knowledge and career.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-cream py-6 border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
              <SearchIcon className="h-5 w-5 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredCourses.length}</span> courses
            </p>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((content) => (
              <CourseCard key={content._id} content={content} />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy-dark transition-colors">
              Load More Courses
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-600 mb-6">
            Our team is constantly adding new courses. Let us know what topics interest you.
          </p>
          <button className="px-6 py-3 bg-sage text-white font-medium rounded-lg hover:bg-sage-dark transition-colors">
            Request a Course
          </button>
        </div>
      </section>
    </div>
  );
}
