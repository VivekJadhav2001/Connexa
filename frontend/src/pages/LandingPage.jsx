import { Link } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black flex text-white">

      {/* ===== Left Section (Logo/Image) ===== */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-none flex-col gap-6">
        {/* <h1 className="text-[250px] font-extrabold tracking-tight">C</h1> */}
        <img src="./logo.png" alt="" className="w-[58%] rounded-2xl " />
      </div>

      {/* ===== Right Section (Auth Panel) ===== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16">

        <h1 className="text-5xl font-extrabold mb-4">
          Happening now
        </h1>

        <h2 className="text-2xl font-bold mb-8">
          Join Connexa today.
        </h2>




        {/* Create Account */}
        <Link
          to="/signup"
          className="w-full max-w-sm text-center bg-blue-500 py-3 rounded-full font-semibold hover:bg-blue-600 transition mb-4"
        >
          Create account
        </Link>

        <p className="text-xs text-gray-400 max-w-sm mb-10">
          By signing up, you agree to the Terms of Service and Privacy Policy.
        </p>

        {/* Divider */}
        <div className="flex items-center max-w-sm my-4">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Sign In */}
        <h3 className="font-bold mb-3">Already have an account?</h3>

        <Link
          to="/signin"
          className="w-full max-w-sm text-center border border-gray-600 py-3 rounded-full font-semibold hover:bg-gray-900 transition"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
