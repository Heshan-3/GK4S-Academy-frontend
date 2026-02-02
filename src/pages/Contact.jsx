import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MailIcon,
  PhoneIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LocateIcon
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tutorId: '',
    questionId: '',
    message: ''
  });
  
  const [tutors, setTutors] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  // 1. Fetch Tutors and handle the specific firstName/lastName structure
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/tutors`);
        console.log("Tutors data received:", res.data);
        const data = Array.isArray(res.data) ? res.data : (res.data.tutors || []);
        setTutors(data);
      } catch (err) {
        console.error("Failed to load tutors list", err);
      }
    };
    fetchTutors();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';
    if (!formData.tutorId) newErrors.tutorId = 'Please select a tutor';
    if (!formData.message.trim()) newErrors.message = 'Description is required';
    else if (formData.message.trim().length < 20)
      newErrors.message = 'Please provide more detail (min 20 chars)';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setApiError('');

    const payload = {
      tutorId: formData.tutorId,
      questionId: formData.questionId || null,
      description: formData.message
    };

    console.log("Submitting payload:", payload); // Debug: Check this in console

    try {
      const token = localStorage.getItem("token"); 
      
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/complaints/add`, 
        payload,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      setIsSubmitting(false);
      // Catching the 500 error message from your backend
      setApiError(err.response?.data?.message || err.response?.data?.error || "Server Error (500). Please check backend logs.");
      console.error("Submission Error:", err.response?.data);
    }
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
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Need to report an issue? Select a tutor and provide details below.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl text-navy mb-6">File a Complaint</h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Complaint Received</h3>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-sage font-medium hover:text-sage-dark"
                  >
                    File another report
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {apiError && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center gap-2">
                      <AlertCircleIcon className="h-5 w-5" />
                      {apiError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 transition-colors ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 transition-colors ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                      />
                    </div>
                  </div>

                  {/* 2. Fixed Tutor Selection mapping to firstName and lastName */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Tutor to Report</label>
                    <select
                      name="tutorId"
                      value={formData.tutorId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 transition-colors ${errors.tutorId ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                    >
                      <option value="">Select a tutor</option>
                      {tutors.map((tutor) => (
                        <option key={tutor._id} value={tutor._id}>
                          {tutor.firstName} {tutor.lastName}
                        </option>
                      ))}
                    </select>
                    {errors.tutorId && <p className="mt-1 text-sm text-red-600">{errors.tutorId}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 transition-colors resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                      placeholder="Please describe the issue..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-sage text-white font-medium rounded-lg hover:bg-sage-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : "Submit Complaint"}
                  </button>
                </form>
              )}
            </div>

            {/* Info Section */}
            <div>
              <h2 className="font-serif text-2xl text-navy mb-6">Contact Info</h2>
              <div className="space-y-6">
                <ContactInfo icon={MailIcon} title="Email" value="GK4SAcademy@gmail.com" />
                <ContactInfo icon={PhoneIcon} title="Phone" value="077-123-4567" />
                <ContactInfo icon={LocateIcon} title="Location" value="Gampaha, Sri Lanka" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactInfo({ icon: Icon, title, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center">
        <Icon className="h-5 w-5 text-navy" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
}