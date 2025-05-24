"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // For animation
  const { login } = useAuth(); // Use context to login
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/overview"); // Redirect to overview if already logged in
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      console.log("Login successful", data);
      if (data.token) {
        // Store token in cookies
        Cookies.set("token", data.token, { expires: 1, path: "/" });

        // Set user data in context
        login(data.data);
        setSuccessMessage("🎉 Logged in successfully!");
        setShowSuccess(true);

        // Auto-hide the success message and then navigate
        setTimeout(() => {
          setShowSuccess(false);
          setTimeout(() => {
            setSuccessMessage("");
            router.push("/overview");
          }, 500); // Extra delay to allow animation
        }, 1500);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        {successMessage && (
          <div
            className={`${
              showSuccess ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-500 text-green-600 bg-green-100 p-3 rounded-md text-center mb-4 flex justify-between items-center`}
          >
            <span>{successMessage}</span>
            <button onClick={() => setShowSuccess(false)} className="text-lg">
              ❌
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
