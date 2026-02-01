import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

const footerLinks = {
  explore: [
    { name: 'All Courses', href: '/course' },
    { name: 'Learning Paths', href: '/course' },
    { name: 'Tutors', href: '/instructors' },
    { name: 'Categories', href: '/course' }
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/about' },
    { name: 'Press', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ],
  support: [
    { name: 'Help Center', href: '/contact' },
    { name: 'FAQs', href: '/about' },
    { name: 'Community', href: '/about' },
    { name: 'Accessibility', href: '/about' }
  ]
};

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand / Contact Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BookOpenIcon className="h-7 w-7 text-sage" strokeWidth={1.5} />
              <span className="text-xl font-semibold tracking-tight">Learnify</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering lifelong learners with rigorous, expertly-crafted courses
              from distinguished scholars and industry leaders.
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <a
                href="mailto:hello@learnify.com"
                className="flex items-center gap-2 hover:text-sage transition-colors"
              >
                <MailIcon className="h-4 w-4" />
                hello@learnify.com
              </a>
              <a
                href="tel:+1-555-123-4567"
                className="flex items-center gap-2 hover:text-sage transition-colors"
              >
                <PhoneIcon className="h-4 w-4" />
                +1 (555) 123-4567
              </a>
              <span className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                San Francisco, CA 94102
              </span>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sage">Explore</h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sage">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sage">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2026 Learnify. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link to="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
