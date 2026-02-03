import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ApproveRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/requests/pending-requests`, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Ensure we target the 'requests' array inside the response object
      setRequests(response.data.requests || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Error fetching requests")
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, status) => {
    try {
      // Using your handleRequestStatus logic: status is 'approved' or 'rejected'
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/requests/approve/${requestId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`Request ${status} successfully`);
      fetchRequests(); // Refresh list
    } catch (error) {
      console.error(`Error updating request:`, error);
      toast.success("Action failed. Check console for details.");
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading requests...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-navy">Access Requests</h1>
        <span className="bg-sage/20 text-sage px-4 py-1 rounded-full text-sm font-medium">
          {requests.length} Pending
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No pending access requests at this time.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">NIC / Email</th>
                <th className="px-6 py-4">Course Title</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {req.student?.firstName} {req.student?.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div>{req.student?.nic}</div>
                    <div className="text-xs">{req.student?.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                    {req.content?.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleAction(req._id, "approved")}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition shadow-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req._id, "rejected")}
                        className="bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm transition"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}