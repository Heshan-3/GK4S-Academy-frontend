import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, UsersIcon, BookOpenIcon } from 'lucide-react';

export default function TutorCard({ name, title, expertise, image, rating, students, courses, bio }) {

  return (
    <Link
      to="/tutors"
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:border-sage/30 transition-all duration-300 p-6"
    >
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg font-semibold text-navy group-hover:text-sage-dark transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{title}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{bio}</p>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {expertise.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-cream text-navy text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <BookOpenIcon className="h-4 w-4" />
          {courses} courses
        </span>
      </div>
    </Link>
  );
}
