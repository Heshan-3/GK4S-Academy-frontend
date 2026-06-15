import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SearchIcon,
  BookOpenIcon,
  UsersIcon,
  AwardIcon,
  GlobeIcon,
  PlayCircleIcon,
  ArrowRightIcon
} from 'lucide-react';
import CourseCard from '../components/CourseCard';
import axios from 'axios';

const stats = [
  { icon: BookOpenIcon, label: 'Expert-Led Courses' },
  { icon: UsersIcon, label: 'Active Learners' },
  { icon: AwardIcon, label: 'Certificates Issued' },
  { icon: GlobeIcon, label: 'Countries Reached' }
];

const categories = [
  { name: 'Philosophy', icon: '🏛️' },
  { name: 'Data Science', icon: '📊' },
  { name: 'Creative Writing', icon: '✍️' },
  { name: 'Art History', icon: '🎨' },
  { name: 'Psychology', icon: '🧠' },
  { name: 'Business', icon: '💼' }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredCourses, setFeaturedCourses] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const filteredCourses = featuredCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Limit to 4 courses only
  const displayedCourses = filteredCourses.slice(0, 4);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/contents/featured`)
      .then((res) => {
        setFeaturedCourses(res.data);
      })
      .catch((err) => console.error(err));
  }, [backendUrl]);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-2 leading-tight">
            Expand Your Mind,
          </h1>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-sage italic mb-8 leading-tight">
            Elevate Your Knowledge
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Join a community of lifelong learners. Access rigorous, expertly-crafted courses from distinguished scholars.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="flex-1 flex items-center px-4">
                <SearchIcon className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, topics, or instructors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                />
              </div>
              <button className="px-6 py-4 bg-white text-gray font-medium hover:bg-sage-dark transition-colors">
                <SearchIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-8 w-8 text-navy mx-auto mb-3" strokeWidth={1.5} />
                <div className="text-3xl font-bold text-navy mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
                Featured Courses
              </h2>
              <p className="text-gray-600 max-w-xl">
                Handpicked courses from our most distinguished instructors, designed to transform your understanding.
              </p>
            </div>

            <Link
              to="/course"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sage font-medium hover:text-sage-dark transition-colors"
            >
              View All Courses
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {/* ✅ Only 4 courses shown here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCourses.map((content) => (
              <CourseCard key={content._id} content={content} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-navy mb-3">
              Explore by Category
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Discover courses across diverse disciplines, from ancient wisdom to cutting-edge technology.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to="/course"
                className="group p-6 bg-cream rounded-xl text-center hover:bg-navy transition-colors duration-300"
              >
                <span className="text-3xl mb-3 block">{category.icon}</span>
                <h3 className="font-medium text-navy group-hover:text-white transition-colors mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                  {category.count} courses
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Begin Your GK4S Academy Journey Today
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join over 850,000 learners who have transformed their careers and expanded their horizons with GK4S Academy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/course"
              className="px-8 py-3 bg-sage text-white font-medium rounded-lg hover:bg-sage-dark transition-colors"
            >
              Browse Courses
            </Link>

            <Link
              to="/about"
              className="px-8 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircleIcon className="h-5 w-5" />
              Watch How It Works
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}