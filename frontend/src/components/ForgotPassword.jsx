import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  async function sendRequestCode(){
    try {
        const res = await api.post("/user/forgot-password",{email:email})
        toast.success("If this email exists, a reset link has been sent");
    } catch (error) {
        toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-md bg-black border border-gray-700"
        />

        <button
          className="w-full bg-blue-500 py-3 rounded-full font-semibold"
          onClick={sendRequestCode}
        >
          Send Reset Link
        </button>

        <p className="text-gray-400 text-sm mt-6">
          Back to{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
