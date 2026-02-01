import { MessageSquare, User } from 'lucide-react';

export default function StudentList({ onSelectStudent }) {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/tutor-students`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStudents(res.data);
        };
        fetchStudents();
    }, []);

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-[#1e3a5f]">My Students</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {students.map(student => (
                    <div key={student._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{student.name}</p>
                                <p className="text-xs text-gray-500">{student.email}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => onSelectStudent(student)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                            <MessageSquare size={20} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}