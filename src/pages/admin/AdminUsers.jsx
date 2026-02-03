import axios from "axios";
import { useEffect, useState } from "react";
import { Trash2, UserCheck, UserX } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            const token = localStorage.getItem("token");

            setUsers(users.filter((user) => user._id !== id));

            axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/delete/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                toast.success(res.data.message)
                setLoading(false)
            })
            .catch((err) => {
                console.error(err);
                toast.success("Error deleting this user")
                setLoading(true); 
            });
        }
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-navy">Users Management</h1>
                        <p className="text-gray-500 text-sm">Manage student access, roles, and account status.</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                        <span className="text-navy font-semibold">{users.length}</span>
                        <span className="text-gray-500 text-sm ml-2">Total Users</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">User Details</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">NIC</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Address</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Access</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {users.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                            {/* Name & Email Combo */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-navy">{user.firstName} {user.lastName}</span>
                                                    <span className="text-xs text-gray-400">{user.email}</span>
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4 text-sm text-gray-600">{user.nic}</td>

                                            {/* Role Badge */}
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{user.address}</td>

                                            {/* Access Toggle Visual */}
                                            <td className="px-6 py-4 text-center">
                                                {user.gotAccess ? (
                                                    <span className="inline-flex items-center text-green-600 text-sm font-medium">
                                                        <UserCheck className="w-4 h-4 mr-1" /> Granted
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center text-gray-400 text-sm font-medium">
                                                        <UserX className="w-4 h-4 mr-1" /> Pending
                                                    </span>
                                                )}
                                            </td>

                                            {/* Blocked Status Badge */}
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                                                    user.isBlocked 
                                                    ? 'bg-red-50 text-red-600 border border-red-100' 
                                                    : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                                }`}>
                                                    {user.isBlocked ? "BLOCKED" : "ACTIVE"}
                                                </span>
                                            </td>

                                            <td className="relative px-6 py-4 text-center">
                                                <button 
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevents clicking the card background
                                                        handleDelete(user._id);
                                                    }}
                                                    className="absolute top-3 right-3 p-2 bg-red-50 text-red-500 rounded-full opacity-100 group-hover:opacity-100 transition-opacity hover:bg-red-100 z-10"
                                                    title="Delete Course"
                                                    >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}