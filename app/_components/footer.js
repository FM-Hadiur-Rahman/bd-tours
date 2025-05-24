// components/Footer.js

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BD-HOUSE. All Rights Reserved.
        </p>
        <div className="mt-4">
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-gray-300 text-sm mx-3"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-gray-400 hover:text-gray-300 text-sm mx-3"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
