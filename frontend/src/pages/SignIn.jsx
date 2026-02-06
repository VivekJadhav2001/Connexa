import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../features/authSlice.js";
import { toast } from "react-toastify";
import api from "../utils/api.js";

function SignIn() {
  const [tab, setTab] = useState("user"); // user | admin
  const [step, setStep] = useState(1); // admin steps

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [adminSecret, setAdminSecret] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ================= USER LOGIN ================= */
  async function userLogin(e) {
    e.preventDefault();
    try {
      await dispatch(signIn(credentials)).unwrap();
      navigate("/home");
    } catch {
      toast.error("Invalid email or password");
    }
  }

  /* ================= ADMIN STEP 1 ================= */
  async function sendAdminSecret() {
    console.log("WORKING FINE");
    try {
      // await axios.post("/admin/request-secret", credentials);
      await api.post("/auth/requestSecretKey", credentials);
      toast.success("Admin secret sent to email");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  /* ================= ADMIN STEP 2 ================= */
  async function verifyAdminSecret() {
    try {
      // await axios.post(
      //   "/auth/adminSignIn",
      //   { email: credentials.email, adminSecret },
      //   { withCredentials: true }
      // );
      await api.post("/auth/adminSignIn", {
        email: credentials.email,
        adminSecret,
      });
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  }

  return (
    <div className="min-h-screen bg-black flex text-white">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <img src="./logo.png" alt="" className="w-[58%] rounded-2xl" />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16">
        <h1 className="text-5xl font-extrabold mb-6">Sign in to Connexa</h1>

        {/* ===== Tabs ===== */}
        <div className="flex gap-6 mb-8">
          <button
            onClick={() => {
              setTab("user");
              setStep(1);
            }}
            className={`pb-2 ${
              tab === "user" ? "border-b-2 border-blue-500" : "text-gray-400"
            }`}
          >
            User Login
          </button>

          <button
            onClick={() => {
              setTab("admin");
              setStep(1);
            }}
            className={`pb-2 ${
              tab === "admin" ? "border-b-2 border-blue-500" : "text-gray-400"
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* ===== Common Inputs ===== */}
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          className="w-full max-w-sm mb-4 px-4 py-3 rounded-md bg-black border border-gray-700"
        />

        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="w-full max-w-sm mb-6 px-4 py-3 rounded-md bg-black border border-gray-700"
        />

        {/* ===== USER LOGIN ===== */}
        {tab === "user" && (
          <button
            onClick={userLogin}
            className="w-full max-w-sm bg-blue-500 py-3 rounded-full font-semibold"
          >
            Sign In
          </button>
        )}

        {/* ===== ADMIN LOGIN ===== */}
        {tab === "admin" && step === 1 && (
          <button
            onClick={sendAdminSecret}
            className="cursor-pointer w-full max-w-sm bg-blue-500 py-3 rounded-full font-semibold"
          >
            Send Admin Secret
          </button>
        )}

        {tab === "admin" && step === 2 && (
          <>
            <input
              placeholder="Enter Admin Secret"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              className="w-full max-w-sm mt-4 mb-4 px-4 py-3 rounded-md bg-black border border-gray-700"
            />
            <button
              onClick={verifyAdminSecret}
              className="w-full max-w-sm bg-green-500 py-3 rounded-full font-semibold"
            >
              Verify & Login
            </button>
          </>
        )}

        {tab === "user" && (
          <p className="text-sm text-gray-400 mt-4">
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Reset here
            </Link>
          </p>
        )}

        {/* Signup */}
        {tab === "user" && (
          <p className="text-gray-400 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Create account
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default SignIn;
