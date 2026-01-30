import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
            Learnify
        </div>

        <ul className="hidden md:flex gap-8 text-gray-700">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/course">Courses</Link></li>
          <li><Link to="/tutors">Tutors</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About Us</Link></li>
       </ul>

        <div className="flex gap-4 items-center">
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-navy hover:text-navy-dark transition-colors">

              Sign In
            </Link>
            <Link
              to="/login"
              className="px-5 py-2 bg-navy text-white text-sm font-medium rounded-md hover:bg-navy-dark transition-colors">

              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}