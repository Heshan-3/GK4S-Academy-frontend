import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ClipboardList, 
  Trash2, 
  CheckCircle, 
  Clock, 
  User, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function GetComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/complaints/get`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(res.data.complaints || []);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch complaints");
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/complaints/update/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComplaints(); // Refresh list
    } catch (err) {
      toast.error("Only admins can update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/complaints/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Complaint deleted successfully")
      setComplaints(complaints.filter(c => c._id !== id));
    } catch (err) {
      toast.error("Only admins can delete complaints");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading complaints...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <ClipboardList className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-800">Complaints Management</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-2">
          <AlertCircle className="h-5 w-5" /> {error}
        </div>
      )}

      {complaints.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No complaints found.</p>
      ) : (
        <div className="grid gap-6">
          {complaints.map((item) => (
            <div key={item._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <StatusBadge status={item.status} />
                  <span className="text-xs text-gray-400 font-mono">ID: {item._id}</span>
                </div>
                
                <div className="flex gap-2">
                  <select 
                    className="text-sm border rounded px-2 py-1 bg-gray-50"
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Review">In Review</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <InfoItem icon={User} label="Student" value={item.student ? `${item.student.firstName} ${item.student.lastName || ''}` : "Unknown"} />
                <InfoItem icon={User} label="Tutor" value={item.tutor ? `${item.tutor.firstName} ${item.tutor.lastName || ''}` : "Unknown"} />
                <InfoItem icon={Clock} label="Submitted" value={new Date(item.createdAt).toLocaleDateString()} />
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
                  <MessageSquare className="h-4 w-4" /> Description:
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>

              {item.question && (
                <div className="mt-3 text-xs text-indigo-600 font-medium">
                  Linked to Question ID: {item.question._id}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Sub-components for cleaner code
function StatusBadge({ status }) {
  const styles = {
    'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
    'In Review': 'bg-blue-100 text-blue-700 border-blue-200',
    'Resolved': 'bg-emerald-100 text-emerald-700 border-emerald-200'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles['Pending']}`}>
      {status}
    </span>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Icon className="h-4 w-4 text-gray-600" />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}