// Fixed components/Navbar.tsx - Removes duplicate login/register issue
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { user, loading } = useAuth();
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-blue-600">NaviCate</a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>

          {/* Single Auth Section - Desktop */}
          {!loading && !user ? (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Login / Register
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Welcome, {user?.email?.split('@')[0]}</span>
              <button 
                onClick={handleLogout} 
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-blue-600 p-2"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-2 shadow-inner">
          <div className="flex flex-col items-center space-y-2">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600">Pricing</Link>

            {/* Mobile Auth Section */}
            {!loading && !user ? (
              <button
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Login / Register
              </button>
            ) : (
              <div className="w-full text-center space-y-2">
                <span className="block text-gray-700">Welcome, {user?.email?.split('@')[0]}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </nav>
  );
}

