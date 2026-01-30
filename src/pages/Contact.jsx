import React, { useState } from 'react';
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  SendIcon,
  CheckCircleIcon
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 20)
      newErrors.message = 'Message must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Have questions about our courses or need assistance? We're here to
            help. Reach out and our team will respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl text-navy mb-6">
                Send Us a Message
              </h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                      });
                    }}
                    className="text-sage font-medium hover:text-sage-dark transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 transition-colors ${
                        errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 transition-colors ${
                        errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 transition-colors ${
                        errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="courses">Course Information</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="partnership">Partnership Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 transition-colors resize-none ${
                        errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="How can we help you?"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-sage text-white font-medium rounded-lg hover:bg-sage-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <SendIcon className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-2xl text-navy mb-6">
                Contact Information
              </h2>

              <div className="space-y-6 mb-10">
                <ContactInfo icon={MailIcon} title="Email" value="hello@athenaeum.edu" info="For general inquiries" link="mailto:hello@athenaeum.edu"/>
                <ContactInfo icon={PhoneIcon} title="Phone" value="+1 (555) 123-4567" info="Mon-Fri, 9am-6pm EST" link="tel:+15551234567"/>
                <ContactInfo icon={MapPinIcon} title="Address" value="123 Academic Way, Cambridge, MA 02138, United States"/>
                <ContactInfo icon={ClockIcon} title="Office Hours" value="Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 2 PM, Sun: Closed"/>
              </div>

              {/* Map Placeholder */}
              <div className="bg-cream rounded-xl overflow-hidden h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="h-12 w-12 text-navy/30 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Interactive map coming soon</p>
                  <p className="text-gray-400 text-xs mt-1">Cambridge, MA 02138</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-navy mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="text-gray-600 mb-6">
            Check out our frequently asked questions for instant help with common inquiries.
          </p>
          <button className="px-6 py-3 bg-navy text-white font-medium rounded-lg hover:bg-navy-dark transition-colors">
            Visit Help Center
          </button>
        </div>
      </section>

    </div>
  );
}

// Reusable Contact Info component
function ContactInfo({ icon: Icon, title, value, info, link }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="h-5 w-5 text-navy" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        {link ? (
          <a href={link} className="text-gray-600 hover:text-sage transition-colors">{value}</a>
        ) : (
          <p className="text-gray-600">{value}</p>
        )}
        {info && <p className="text-sm text-gray-500 mt-1">{info}</p>}
      </div>
    </div>
  );
}
