import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    axios
      .post(`${backendUrl}/api/users/login/`, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const user = res.data.user;
        const role = res.data.user.role?.toLowerCase().trim(); // <-- nested role
        console.log(user.role)
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "tutor") {
          navigate("/tutor");
        } else {
          navigate("/student");
        }

      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.error || "Login failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#faf9f6] px-4">
      
      {/* Heading */}
      <h1 className="text-4xl font-serif text-[#1f3a5f] mb-2">
        Welcome Back
      </h1>
      <p className="text-gray-500 mb-10">
        Sign in to continue your learning journey
      </p>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <form onSubmit={handleOnSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#8ea17c] focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#8ea17c] focus:outline-none"
              />
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#8ea17c] text-white py-3 rounded-lg font-medium hover:bg-[#7d8f6b] transition"
          >
            Sign In
          </button>
        </form>

        
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="text-[#8ea17c] font-medium hover:underline"
        >
          Sign up for free
        </Link>
      </p>
    </div>
  );
}
