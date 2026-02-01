// components/RequestAccess.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function RequestAccess({ contentId, isPaid }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleRequest = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/requests/request-access`,
        { contentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus('pending');
      alert("Request sent!");
    } catch (err) {
      if (err.response?.status === 400) setStatus('pending');
      else alert("Error sending request");
    } finally {
      setLoading(false);
    }
  };

  // --- CONDITION 1: IS FREE ---
  if (!isPaid) {
    return (
      <button 
        className="w-full py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
        onClick={() => window.location.href = `/watch/${contentId}`}
      >
        Watch Free
      </button>
    );
  }

  // --- CONDITION 2: IS PAID ---
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleRequest}
        disabled={loading || status === 'pending'}
        className={`w-full py-2 rounded-lg font-bold transition ${
          status === 'pending'
            ? "bg-yellow-500 text-white cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : status === 'pending' ? "Access Pending" : "Request Access to Buy"}
      </button>
      {status === 'pending' && (
        <p className="text-[10px] text-center text-gray-500 italic">
          Waiting for tutor approval
        </p>
      )}
    </div>
  );
}