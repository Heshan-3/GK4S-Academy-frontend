import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MailIcon,
  LockIcon,
  UserIcon,
  HomeIcon,
  IdCardIcon,
  CheckCircleIcon
} from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nic, setNic] = useState("");
  const [address, setAddress] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        email,
        password,
        firstName,
        lastName,
        nic,
        address
      })
      .then(() => {
        setIsSuccess(true);
        navigate("/login");
      })
      .catch(() => {
        alert("Error in user registration");
      });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12 px-4 bg-cream">
        <div className="max-w-md w-full">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl text-navy mb-3">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join and start your learning journey
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">
            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Registration Successful!
                </h3>
                <p className="text-gray-600">
                  Redirecting to login...
                </p>
              </div>
            ) : (
              <form onSubmit={handleOnSubmit} className="space-y-5">

                {/* First Name */}
                <Input
                  label="First Name"
                  icon={<UserIcon />}
                  value={firstName}
                  onChange={setFirstName}
                />

                {/* Last Name */}
                <Input
                  label="Last Name"
                  icon={<UserIcon />}
                  value={lastName}
                  onChange={setLastName}
                />

                {/* NIC */}
                <Input
                  label="NIC"
                  icon={<IdCardIcon />}
                  value={nic}
                  onChange={setNic}
                />

                {/* Email */}
                <Input
                  label="Email Address"
                  icon={<MailIcon />}
                  type="email"
                  value={email}
                  onChange={setEmail}
                />

                {/* Password */}
                <Input
                  label="Password"
                  icon={<LockIcon />}
                  type="password"
                  value={password}
                  onChange={setPassword}
                />

                {/* Address */}
                <Input
                  label="Address"
                  icon={<HomeIcon />}
                  value={address}
                  onChange={setAddress}
                />

                <button
                  type="submit"
                  className="w-full py-3 bg-sage text-white rounded-lg hover:opacity-90 transition"
                >
                  Register
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-sage font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* Reusable Input Component */
function Input({ label, icon, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-3 h-5 w-5 text-gray-400">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
          required
        />
      </div>
    </div>
  );
}
