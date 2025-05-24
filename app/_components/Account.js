"use client"; // ✅ Ensures it's a Client Component

import Link from "next/link";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; // To get the token

export default function Account() {
  const { userData, setUserData } = useAuth(); // Get user data from Auth Context

  const [formData, setFormData] = useState({
    name: userData?.data?.name || "", // ✅ Safe access with optional chaining
    email: userData?.data?.email || "", // ✅ Prevents crashes
    photo: null,
  });

  const [preview, setPreview] = useState("/default.jpg");

  useEffect(() => {
    if (userData?.data?.photo) {
      setPreview(`http://localhost:8000/img/users/${userData.data.photo}`);
    }
  }, [userData]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    if (e.target.name === "photo") {
      const file = e.target.files[0];
      setFormData({ ...formData, photo: file });

      // Show preview of selected image
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    if (formData.photo) {
      formDataToSend.append("photo", formData.photo);
    }
    const token = Cookies.get("token"); // Get token from cookies
    if (!token) {
      console.error("No token found! User might be logged out.");
      setLoading(false); // Fix
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/users/updateMe",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`, // Include token
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user.");
      }

      setUserData(data.data.user);

      setPreview(
        `http://localhost:8000/img/users/${
          data.data.user.photo
        }?t=${Date.now()}`
      );

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const [passwordData, setPasswordData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.password !== passwordData.passwordConfirm) {
      setMessage("Passwords do not match.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      setMessage("You need to log in first.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/users/updateMyPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            passwordCurrent: passwordData.passwordCurrent,
            password: passwordData.password,
            passwordConfirm: passwordData.passwordConfirm,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password.");
      }

      setMessage("Password updated successfully!");
      setPasswordData({
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-fit mx-auto">
      <nav className="w-64 bg-white shadow-md p-6">
        <ul>
          <li className="p-2 bg-blue-500 text-white rounded mb-2">
            <Link href="/settings">Settings</Link>
          </li>
          <li className="p-2 hover:bg-gray-200 rounded mb-2">
            <Link href="/my-tours">My Bookings</Link>
          </li>
          <li className="p-2 hover:bg-gray-200 rounded mb-2">
            <Link href="#">My Reviews</Link>
          </li>
          <li className="p-2 hover:bg-gray-200 rounded mb-2">
            <Link href="#">Billing</Link>
          </li>
        </ul>
        {userData?.data?.role === "admin" && (
          <div className="mt-6">
            <h5 className="text-gray-600 font-semibold">Admin</h5>
            <ul>
              <li className="p-2 hover:bg-gray-200 rounded mb-2">
                <Link href="#">Manage Tours</Link>
              </li>
              <li className="p-2 hover:bg-gray-200 rounded mb-2">
                <Link href="#">Manage Users</Link>
              </li>
              <li className="p-2 hover:bg-gray-200 rounded mb-2">
                <Link href="#">Manage Reviews</Link>
              </li>
              <li className="p-2 hover:bg-gray-200 rounded mb-2">
                <Link href="#">Manage Bookings</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <main className="flex-1 p-8">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Your Account Settings</h2>

          {message && <p className="text-red-500 mb-4">{message}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Profile Picture</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <img
                src={preview}
                alt="Profile Preview"
                className="w-24 h-24 mt-2 rounded-full object-cover"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
        <hr className="my-6"></hr>
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <form className="space-y-4" onSubmit={handlePasswordChange}>
            <div>
              <label className="block font-medium">Current Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="••••••••"
                value={passwordData.passwordCurrent}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    passwordCurrent: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="••••••••"
                value={passwordData.password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    password: e.target.value,
                  })
                }
              ></input>
            </div>
            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="••••••••"
                value={passwordData.passwordConfirm}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    passwordConfirm: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
