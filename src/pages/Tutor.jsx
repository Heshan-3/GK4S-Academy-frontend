import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchIcon } from 'lucide-react';
import TutorCard from '../components/TutorCard';

export default function Tutor() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState('All Areas');

  // 1. Fetch Real Tutors from Backend
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/tutors`);
        
        const formattedTutors = res.data.map(tutor => ({
          id: tutor._id,
          name: `${tutor.firstName} ${tutor.lastName}`,
          title: "Expert Instructor",
          expertise: ["Education", "Academic"], 
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', 
          courses: tutor.courseCount,
          bio: `Professional instructor located in ${tutor.address}`,
        }));
        
        setInstructors(formattedTutors);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

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

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExpertise =
      selectedExpertise === 'All Areas' || instructor.expertise.includes(selectedExpertise);
    return matchesSearch && matchesExpertise;
  });

  if (loading) return <div className="py-20 text-center">Loading Experts...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Design sections remain exactly the same */}
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

      <section className="bg-cream py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
              <span className="ml-4"><SearchIcon className="h-5 w-5 text-gray-400" /></span>
              <input
                type="text"
                placeholder="Search instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>

            <select
              value={selectedExpertise}
              onChange={(e) => setSelectedExpertise(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:outline-none"
            >
              {expertiseAreas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Showing <span className="font-medium">{filteredInstructors.length}</span> instructors
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructors.map((instructor) => (
              <TutorCard key={instructor.id} {...instructor} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
            Share Your Expertise with the World
          </h2>
          <button className="px-6 py-3 bg-sage text-white font-medium rounded-lg hover:bg-sage-dark transition-colors">
            Become an Instructor
          </button>
        </div>
      </section>
    </div>
  );
}