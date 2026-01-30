import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import TutorCard from '../components/TutorCard';

const instructors = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'Professor of Philosophy',
    expertise: ['Ancient Philosophy', 'Ethics', 'Metaphysics'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 4.9,
    students: 12450,
    courses: 8,
    bio: 'Dr. Chen is a renowned philosopher specializing in ancient Greek thought and its modern applications.',
  },
  {
    id: '2',
    name: 'Prof. Michael Torres',
    title: 'Data Science Lead',
    expertise: ['Machine Learning', 'Statistics', 'Python'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    rating: 4.8,
    students: 28300,
    courses: 12,
    bio: 'Former Google engineer with 15+ years of experience in data science and machine learning.',
  },
  // ... add the rest of your instructors
];

const expertiseAreas = [
  'All Areas',
  'Philosophy',
  'Data Science',
  'Writing',
  'Art',
  'Physics',
  'Technology',
  'Business',
  'Psychology',
];

export default function Tutor() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All Areas');

  // Filter instructors based on search and expertise
  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExpertise =
      selectedExpertise === 'All Areas' || instructor.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Meet Our Instructors
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Learn from world-class experts, distinguished scholars, and industry leaders who are
            passionate about sharing their knowledge.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-cream py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
              <SearchIcon className="h-5 w-5 text-gray-400 ml-4" />
              <input
                type="text"
                placeholder="Search instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Expertise Filter */}
            <select
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-sage/50"
            >
              {expertiseAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Showing <span className="font-medium">{filteredInstructors.length}</span> instructors
          </p>
        </div>
      </section>

      {/* Instructor Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructors.map((instructor) => (
              <TutorCard key={instructor.id} {...instructor} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA: Become an Instructor */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
            Share Your Expertise with the World
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our community of distinguished instructors and help shape the next generation of
            learners. We're always looking for passionate experts.
          </p>
          <button className="px-6 py-3 bg-sage text-white font-medium rounded-lg hover:bg-sage-dark transition-colors">
            Become an Instructor
          </button>
        </div>
      </section>
    </div>
  );
}
