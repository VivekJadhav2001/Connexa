import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-700 via-black to-blue-900 flex items-center justify-center p-6">
      <div className="text-center text-white max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
          Welcome to <span className="text-purple-300">AccioConnect</span>
        </h1>

        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          A modern platform built for seamless authentication, smooth UI, and a
          futuristic experience. Fast, simple, and designed with love.
        </p>

        <div className="flex items-center justify-center gap-6">
          <Link
            to="/signup"
            className="px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-blue-500 hover:opacity-90 transition font-medium"
          >
            Create Account
          </Link>

          <Link
            to="/signin"
            className="px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-blue-500 hover:opacity-90 transition font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}