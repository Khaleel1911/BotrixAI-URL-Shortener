import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authService";
import { FaUser } from "react-icons/fa";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/profile")
      .then(res => setProfile(res.data))
      .catch(() => navigate("/", { replace: true }));
  }, []);

  const handleLogout = () => {
    logout();
    sessionStorage.clear();
    window.location.replace("/");
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border p-6">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Profile
        </h1>

        {/* Profile Details */}
        <div className="space-y-5 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Email</p>
            <p className="font-medium text-gray-800 break-all">
              {profile.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500 mb-1">Authentication Provider</p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {profile.provider}
            </span>
          </div>

          <div>
            <p className="text-gray-500 mb-1">Account Created</p>
            <p className="text-gray-700">
              {new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/generate")}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            ← Back
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
