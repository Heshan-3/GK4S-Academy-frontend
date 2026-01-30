import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SearchIcon,
  ChevronDownIcon,
  BookOpenIcon,
  UsersIcon,
  AwardIcon,
  GlobeIcon,
  PlayCircleIcon,
  ArrowRightIcon
} from 'lucide-react';
import CourseCard  from '../components/CourseCard';
import axios from 'axios';

const popularTags = [
  'Ancient Philosophy',
  'Data Science',
  'Creative Writing',
  'Art History'
];

const stats = [
  { icon: BookOpenIcon, value: '2,500+', label: 'Expert-Led Courses' },
  { icon: UsersIcon, value: '850K+', label: 'Active Learners' },
  { icon: AwardIcon, value: '15,000+', label: 'Certificates Issued' },
  { icon: GlobeIcon, value: '120+', label: 'Countries Reached' }
];

const featuredCourses = [
  {
    id: '1',
    title: 'Introduction to Ancient Philosophy',
    instructor: 'Dr. Sarah Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    rating: 4.9,
    students: 12450,
    duration: '8 weeks',
    price: 79,
    category: 'Philosophy',
    level: 'Beginner'
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    instructor: 'Prof. Michael Torres',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    rating: 4.8,
    students: 28300,
    duration: '12 weeks',
    price: 129,
    category: 'Data Science',
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'Creative Writing Workshop',
    instructor: 'Dr. Emily Watson',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
    rating: 4.9,
    students: 8920,
    duration: '6 weeks',
    price: 59,
    category: 'Writing',
    level: 'Beginner'
  },
  {
    id: '4',
    title: 'Art History: Renaissance to Modern',
    instructor: 'Prof. James Mitchell',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    rating: 4.7,
    students: 6780,
    duration: '10 weeks',
    price: 89,
    category: 'Art History',
    level: 'Intermediate'
  }
];

const categories = [
  { name: 'Philosophy', count: 124, icon: '🏛️' },
  { name: 'Data Science', count: 256, icon: '📊' },
  { name: 'Creative Writing', count: 89, icon: '✍️' },
  { name: 'Art History', count: 67, icon: '🎨' },
  { name: 'Psychology', count: 143, icon: '🧠' },
  { name: 'Business', count: 198, icon: '💼' }
];


export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const [featuredCourses, setFeaturedCourses] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/contents/featured`)
      .then((res) => {
        setFeaturedCourses(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

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
              <div className="hidden sm:flex items-center border-l border-gray-200">
                <button className="flex items-center gap-2 px-4 py-4 text-gray-600 hover:text-gray-800">
                  {selectedCategory}
                  <ChevronDownIcon className="h-4 w-4" />
                </button>
              </div>
              <button className="px-6 py-4 bg-sage text-white font-medium hover:bg-sage-dark transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-gray-400 text-sm">Popular:</span>
            {popularTags.map((tag) => (
              <Link
                key={tag}
                to="/courses"
                className="px-4 py-2 bg-white/10 text-white text-sm rounded-full hover:bg-white/20 transition-colors"
              >
                {tag}
              </Link>
            ))}
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
              to="/courses"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sage font-medium hover:text-sage-dark transition-colors"
            >
              View All Courses
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((content) => (
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
                to="/courses"
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
            Begin Your Learning Journey Today
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join over 850,000 learners who have transformed their careers and expanded their horizons with Learnify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
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
