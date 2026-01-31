import axios from "axios";
import { useEffect, useState } from "react";

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
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
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

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin – Users Management</h1>

            {loading ? (
                <p>Loading users...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">First Name</th>
                                <th className="border p-2">Last Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">NIC</th>
                                <th className="border p-2">Role</th>
                                <th className="border p-2">Address</th>
                                <th className="border p-2">Access</th>
                                <th className="border p-2">Blocked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="text-center">
                                    <td className="border p-2">{user.firstName}</td>
                                    <td className="border p-2">{user.lastName}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">{user.nic}</td>
                                    <td className="border p-2 capitalize">{user.role}</td>
                                    <td className="border p-2">{user.address}</td>
                                    <td className="border p-2">
                                        {user.gotAccess ? "✅ Yes" : "❌ No"}
                                    </td>
                                    <td className="border p-2">
                                        {user.isBlocked ? "🚫 Blocked" : "✅ Active"}
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
