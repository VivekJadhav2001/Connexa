import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BATCHES,
  CENTERS,
  COMMON_FIELDS,
  COURSES,
  NAME_FIELDS,
  PROFESSIONAL_FIELDS,
  STUDENT_FIELDS,
} from "../constants";
import { toast } from "react-toastify";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { getStrengthColor } from "../utils/passwordUtils";
import FormField from "../components/UI/FormField";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    roleType: "student", // default
    // Student fields
    batch: "",
    centerLocation: "",
    courseType: "",
    isOnline: false,
    // Professional / Instructor fields
    organisationName: "",
    currentRole: "",
  });

  const evaluatePassword = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setPasswordStrength(score);
  };

  const strengthColor = getStrengthColor(passwordStrength);

  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  async function signUp() {
    // ===== Role-based frontend validation =====
    if (userData.roleType === "student") {
      if (
        !userData.firstName ||
        !userData.email ||
        !userData.phoneNumber ||
        !userData.password
      ) {
        toast.warn("Please fill all required fields", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }

    if (
      userData.roleType === "professional" ||
      userData.roleType === "instructor"
    ) {
      if (
        !userData.firstName ||
        !userData.email ||
        !userData.phoneNumber ||
        !userData.password ||
        !userData.organisationName ||
        !userData.currentRole
      ) {
        toast.warn("Please fill all required fields", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    }

    // ===== API Call =====
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/auth/signUp",
        userData
      );

      if (!res.data.success) {
        toast.error("Signup failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
        setLoading(false);
        return;
      }

      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        roleType: "student",
        batch: "",
        centerLocation: "",
        courseType: "",
        isOnline: false,
        organisationName: "",
        currentRole: "",
      });

      setLoading(false);

      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (error) {
      console.log("Signup Error:", error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex text-white">
      {/* ===== Left Logo Section ===== */}
      <div className="hidden lg:flex w-1/2 items-center justify-center bg-none flex-col gap-6">
        <h1 className="text-5xl font-extrabold mb-6">Create your account</h1>
        {/* <h1 className="text-[250px] font-extrabold tracking-tight">C</h1> */}
        <img src="./logo.png" alt="" className="w-[58%] rounded-2xl " />
      </div>

      {/* ===== Right Signup Panel ===== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16">
        {/* Role Selector */}
        <select
          name="roleType"
          value={userData.roleType}
          onChange={handleChange}
          className="inputX mb-4"
        >
          <option value="student">Student</option>
          <option value="professional">Professional</option>
          <option value="instructor">Instructor</option>
        </select>

        {/* Common Fields */}

        <FormField
          name="email"
          placeholder="Email*"
          value={userData.email}
          onChange={handleChange}
        />

        <FormField
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password*"
          value={userData.password}
          onChange={(e) => {
            handleChange(e);
            evaluatePassword(e.target.value);
          }}
          rightIcon={showPassword ? <BiSolidHide /> : <BiSolidShow />}
          onRightIconClick={() => setShowPassword(!showPassword)}
        />

        {/* Strength Bar */}
        {userData.password && (
          <div className="w-full max-w-[380px] mb-4">
            <div className="h-1 w-full bg-gray-700 rounded">
              <div
                className={`h-1 rounded transition-all duration-300 ${strengthColor}`}
                style={{
                  width: `${(passwordStrength / 4) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-400">
              {passwordStrength <= 1 && "Weak password"}
              {passwordStrength === 2 && "Moderate password"}
              {passwordStrength >= 3 && "Strong password"}
            </p>
          </div>
        )}

        <div className="flex gap-3">
          {NAME_FIELDS.map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={userData[field.name]}
              onChange={handleChange}
              maxWidth={field.maxWidth}
            />
          ))}
        </div>

        <FormField
          name="phoneNumber"
          placeholder="Phone number*"
          value={userData.phoneNumber}
          onChange={handleChange}
        />

        {/* ===== Student Fields ===== */}
        {userData.roleType === "student" &&
          STUDENT_FIELDS.map((field) => (
            <FormField
              key={field.name}
              type="select"
              name={field.name}
              value={userData[field.name]}
              onChange={handleChange}
            >
              <option value="">{field.placeholder}</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </FormField>
          ))}

        {/* ===== Professional / Instructor Fields ===== */}
        {(userData.roleType === "professional" ||
          userData.roleType === "instructor") &&
          PROFESSIONAL_FIELDS.map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={userData[field.name]}
              onChange={handleChange}
            />
          ))}

        {/* Create Button */}
        <button
          onClick={signUp}
          disabled={loading}
          className="w-full max-w-sm bg-blue-500 py-6 rounded-full font-semibold hover:bg-blue-600 transition mt-4"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        {/* Signin redirect */}
        <p className="text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {/* Tailwind helper style */}
      <style>{`
      .inputX {
        width: 100%;
        max-width: 380px;
        margin-bottom: 14px;
        padding: 12px 14px;
        background: black;
        border: 1px solid #2f3336;
        border-radius: 6px;
        outline: none;
        color: white;
      }
      .inputX:focus {
        border-color: #1d9bf0;
      }
    `}</style>
    </div>
  );
}

export default Signup;

// /*
//   Based on TailwindCSS recommendations,
//   consider using classes instead of the `@apply` directive
//   @see https://tailwindcss.com/docs/reusing-styles#avoiding-premature-abstraction
// */
// .inputX {
//   @apply w-full max-w-[380px] border text-[white] mb-3.5 px-3.5 py-3 rounded-md border-solid border-[#2f3336] focus:border-[#1d9bf0];
//   background: black;
//   outline: none;
// }
