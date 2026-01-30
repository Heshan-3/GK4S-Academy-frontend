import img2 from '../assets/images/img2.jpg';
import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  UsersIcon,
  AwardIcon,
  GlobeIcon,
  TargetIcon,
  HeartIcon,
  LightbulbIcon,
  ShieldIcon,
  ArrowRightIcon } from
'lucide-react';
import Navbar from '../components/Navbar';
const values = [
{
  icon: TargetIcon,
  title: 'Excellence',
  description:
  "We partner with the world's leading experts to deliver rigorous, high-quality educational content that meets the highest academic standards."
},
{
  icon: HeartIcon,
  title: 'Accessibility',
  description:
  'Education should be available to everyone. We strive to make world-class learning accessible regardless of location or background.'
},
{
  icon: UsersIcon,
  title: 'Community',
  description:
  'Learning is better together. We foster a supportive community where learners and instructors connect, collaborate, and grow.'
},
{
  icon: LightbulbIcon,
  title: 'Innovation',
  description:
  'We continuously evolve our platform and pedagogy, embracing new technologies and methods to enhance the learning experience.'
}];

const stats = [
{
  icon: BookOpenIcon,
  value: '2,500+',
  label: 'Expert-Led Courses'
},
{
  icon: UsersIcon,
  value: '850K+',
  label: 'Active Learners'
},
{
  icon: AwardIcon,
  value: '15,000+',
  label: 'Certificates Issued'
},
{
  icon: GlobeIcon,
  value: '120+',
  label: 'Countries Reached'
}];

const team = [
{
  name: 'Dr. Eleanor Hayes',
  role: 'Founder & CEO',
  image:
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
  bio: 'Former Stanford professor with a vision to democratize quality education.'
},
{
  name: 'Marcus Chen',
  role: 'Chief Technology Officer',
  image:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
  bio: 'Tech veteran who led engineering teams at Google and Coursera.'
},
{
  name: 'Dr. Amara Johnson',
  role: 'Chief Academic Officer',
  image:
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
  bio: 'Educational psychologist dedicated to evidence-based learning design.'
},
{
  name: 'David Park',
  role: 'Chief Operating Officer',
  image:
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
  bio: 'Operations expert who scaled multiple EdTech startups.'
},
{
  name: 'Sofia Martinez',
  role: 'VP of Content',
  image:
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
  bio: 'Award-winning curriculum designer and former BBC documentary producer.'
},
{
  name: 'James Wilson',
  role: 'VP of Community',
  image:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
  bio: 'Community builder who grew online learning communities to millions.'
}];

const milestones = [
{
  year: '2018',
  event:
  'Athenaeum founded with a mission to make quality education accessible'
},
{
  year: '2019',
  event: 'Launched first 100 courses with 50 distinguished instructors'
},
{
  year: '2020',
  event: 'Reached 100,000 learners during global shift to online education'
},
{
  year: '2021',
  event: 'Expanded to 500+ courses across 20 disciplines'
},
{
  year: '2022',
  event: 'Introduced Learning Paths and professional certificates'
},
{
  year: '2023',
  event: 'Surpassed 500,000 learners from 100+ countries'
},
{
  year: '2024',
  event: 'Launched mobile app and AI-powered learning recommendations'
},
{
  year: '2025',
  event: 'Reached 850,000+ learners with 2,500+ courses'
}];

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Empowering Lifelong Learners
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            At Athenaeum, we believe that education is the most powerful tool
            for personal and societal transformation. Our mission is to make
            world-class learning accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sage font-medium text-sm uppercase tracking-wider">
                Our Mission
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-navy mt-2 mb-6">
                Democratizing Quality Education
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2018, Athenaeum was born from a simple yet powerful
                idea: that the world's best educational content should not be
                confined to elite institutions. We partner with distinguished
                scholars, industry leaders, and creative professionals to bring
                their expertise to learners worldwide.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our name, inspired by the ancient Greek institution dedicated to
                the goddess of wisdom, reflects our commitment to fostering
                intellectual curiosity and lifelong learning. We believe that
                education is not just about acquiring knowledge—it's about
                developing the capacity to think critically, create
                meaningfully, and contribute positively to society.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we serve over 850,000 learners across 120+ countries,
                offering more than 2,500 courses spanning the humanities,
                sciences, technology, and creative arts.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream">
                <img
                  src={img2}
                  alt="Students learning together"
                  className="w-full h-full object-cover" />

              </div>
              <div className="absolute -bottom-6 -left-6 bg-sage text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">850K+</div>
                <div className="text-sm opacity-90">Learners Worldwide</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sage font-medium text-sm uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-primary mt-2">
              What Guides Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) =>
            <div
              key={value.title}
              className="bg-white rounded-xl p-8 shadow-sm">

                <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mb-5">
                  <value.icon className="h-6 w-6 text-navy" />
                </div>
                <h3 className="font-serif text-xl text-navy mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) =>
            <div key={stat.label} className="text-center">
                <stat.icon
                className="h-8 w-8 text-sage mx-auto mb-3"
                strokeWidth={1.5} />

                <div className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sage font-medium text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-navy mt-2 mb-4">
              Meet the Leadership
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our diverse team brings together expertise from academia,
              technology, and media to create exceptional learning experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) =>
            <div key={member.name} className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100">
                  <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover" />

                </div>
                <h3 className="font-serif text-xl text-navy mb-1">
                  {member.name}
                </h3>
                <p className="text-sage font-medium text-sm mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sage font-medium text-sm uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-navy mt-2">
              Milestones
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-navy/20 transform md:-translate-x-px" />

            <div className="space-y-8">
              {milestones.map((milestone, index) =>
              <div
                key={milestone.year}
                className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                  {/* Year bubble */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-sage rounded-full transform -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div
                  className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>

                    <span className="text-sage font-bold">
                      {milestone.year}
                    </span>
                    <p className="text-gray-700 mt-1">{milestone.event}</p>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Join Our Learning Community
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking to advance your career, explore new
            interests, or simply expand your mind, Athenaeum is here to guide
            your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="px-8 py-3 bg-sage text-white font-medium rounded-lg hover:bg-sage-dark transition-colors inline-flex items-center justify-center gap-2">

              Explore Courses
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors">

              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
    );

}