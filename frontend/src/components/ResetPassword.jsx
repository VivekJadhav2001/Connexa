import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../utils/api";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  async function resetPassword() {
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      await api.post(`/user/reset-password/${token}`, {
        newPassword: password,
      });

      toast.success("Password reset successful");
      navigate("/signin");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Reset link expired or invalid"
      );
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-md p-8">
        <h2 className="text-3xl font-bold mb-6">Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-md bg-black border border-gray-700"
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-md bg-black border border-gray-700"
        />

        <button
          type="button"
          className="w-full bg-green-500 py-3 rounded-full font-semibold"
          onClick={resetPassword}
        >
          Reset Password
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

export default ResetPassword;
