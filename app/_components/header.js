"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Header = () => {
  const { userData, isLoggedIn, login, logout, setUserData } = useAuth(); // Use context
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in by looking for a token in cookies
    const token = Cookies.get("token");
    if (token && !isLoggedIn) {
      // Fetch user data if token is present
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/v1/users/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }

          const data = await response.json();
          login(data.data); // Set user data using context
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      };

      fetchUserData();
    }
  }, [isLoggedIn, login]); // Depend on isLoggedIn and login

  const handleLogout = () => {
    Cookies.remove("token"); // Remove token from cookies
    setUserData(null); // Clear user data from context
    localStorage.removeItem("token"); // Ensure token is removed
    router.push("/login"); // Redirect to login page
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <nav className="flex flex-row gap-1.5">
          <Link href="/overview">All tours</Link>
          {!isLoggedIn && <Link href="/signup">Sign up</Link>}
        </nav>
        <Link href="/" className="text-2xl font-semibold">
          <img src="logo.jpeg" alt="logo" className="w-20 h-20 rounded-full" />
        </Link>

        <nav className="flex justify-between items-center gap-2">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Log out
              </button>
              <Link href="/account" className="flex items-center gap-2">
                {userData?.data?.photo && (
                  <Image
                    src={`http://localhost:8000/img/users/${userData?.data?.photo}`} // Use full URL
                    width={50}
                    height={50}
                    alt="User Photo"
                    className="rounded-full"
                  />
                )}
                <span>{userData?.data?.name || "User"}</span>
              </Link>
            </>
          ) : (
            <Link href="/login">Log in</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
