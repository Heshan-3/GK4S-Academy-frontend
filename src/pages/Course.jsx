import { useEffect, useState } from 'react';
import {
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  GridIcon,
  ListIcon
} from 'lucide-react';

import CourseCard from '../components/CourseCard';
import axios from 'axios';

const allCourses = [
  {
    id: '1',
    title: 'Introduction to Ancient Philosophy',
    instructor: 'Dr. Sarah Chen',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
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
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    rating: 4.7,
    students: 6780,
    duration: '10 weeks',
    price: 89,
    category: 'Art History',
    level: 'Intermediate'
  },
  {
    id: '5',
    title: 'Modern Physics: Quantum Mechanics',
    instructor: 'Dr. Robert Kim',
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
    rating: 4.8,
    students: 5420,
    duration: '14 weeks',
    price: 149,
    category: 'Physics',
    level: 'Advanced'
  },
  {
    id: '6',
    title: 'Full-Stack Web Development',
    instructor: 'Alex Rivera',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    rating: 4.9,
    students: 34500,
    duration: '16 weeks',
    price: 199,
    category: 'Technology',
    level: 'Intermediate'
  },
  {
    id: '7',
    title: 'Business Strategy & Leadership',
    instructor: 'Dr. Amanda Foster',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    rating: 4.7,
    students: 15800,
    duration: '8 weeks',
    price: 119,
    category: 'Business',
    level: 'Intermediate'
  },
  {
    id: '8',
    title: 'Psychology 101: Understanding the Mind',
    instructor: 'Dr. Lisa Park',
    image:
      'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&h=400&fit=crop',
    rating: 4.8,
    students: 22100,
    duration: '10 weeks',
    price: 89,
    category: 'Psychology',
    level: 'Beginner'
  }
];

const categories = [
  'All Categories',
  'Philosophy',
  'Data Science',
  'Writing',
  'Art History',
  'Physics',
  'Technology',
  'Business',
  'Psychology'
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const durations = ['Any Duration', '1-4 weeks', '5-8 weeks', '9-12 weeks', '12+ weeks'];
const priceRanges = ['Any Price', 'Free', 'Under $50', '$50-$100', '$100-$150', '$150+'];

export default function Course() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [showFilters, setShowFilters] = useState(false);

  const [allCourses, setAllCourses] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
      axios
        .get(`${backendUrl}/api/contents/public`)
        .then((res) => {
          setAllCourses(res.data);
        })
        .catch((err) => console.error(err));
    }, []);


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

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sage/50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sage/50"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 flex items-center gap-2"
              >
                <FilterIcon className="h-4 w-4" />
                More Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{allCourses.length}</span> courses
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Sort by:</span>
              <select className="bg-transparent font-medium text-navy focus:outline-none cursor-pointer">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCourses.map((content) => (
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
