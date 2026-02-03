import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function RequestAccess({ contentId, isPaid, initialStatus }) {
  const [loading, setLoading] = useState(false);
  // Status can be 'none', 'pending', or 'approved'
  const [status, setStatus] = useState(initialStatus || 'none');

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleRequest = async (e) => {
    e.stopPropagation();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/requests/request-access`,
        { contentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus('pending');
      toast.success("Request send")
    } catch (err) {
      // If 400, it means it's already pending in the DB
      if (err.response?.status === 400) {
        setStatus('pending');
        toast.error("You have already requested this course.")
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      setLoading(false);
    }
  };

  // 1. FREE COURSE
  if (!isPaid) {
    return (
      <button className="w-full py-2 bg-green-600 text-white rounded-lg font-bold cursor-default">
        Free Content
      </button>
    );
  }

  // 2. ALREADY APPROVED
  if (status === 'approved') {
    return (
      <div className="w-full py-2 bg-blue-100 text-blue-700 rounded-lg font-bold text-center border border-blue-200">
        ✓ Purchased
      </div>
    );
  }

  // 3. PENDING OR NEW REQUEST
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleRequest}
        disabled={loading || status === 'pending'}
        className={`w-full py-2 rounded-lg font-bold transition ${
          status === 'pending'
            ? "bg-yellow-500 text-white cursor-not-allowed"
            : "bg-[#1e3a5f] text-white hover:bg-[#2d4b75]"
        }`}
      >
        {loading ? "Processing..." : status === 'pending' ? "Access Pending" : "Buy / Request Access"}
      </button>
      {status === 'pending' && (
        <p className="text-[10px] text-center text-gray-500 italic">
          Waiting for tutor approval
        </p>
      )}
    </div>
  );
}