import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BATCHES, CENTERS, COURSES } from "../constants";
import { toast } from "react-toastify";

function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

    function handleChange(e) {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    async function signUp() {

        // ===== Role-based frontend validation =====
        if (userData.roleType === "student") {
            if (!userData.firstName || !userData.email || !userData.phoneNumber || !userData.password) {
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

        if (userData.roleType === "professional" || userData.roleType === "instructor") {
            if (!userData.firstName || !userData.email || !userData.phoneNumber || !userData.password ||
                !userData.organisationName || !userData.currentRole) {
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
                return
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
            <h1 className="text-5xl font-extrabold mb-6">
                    Create your account
                </h1>
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
                <input
                    name="email"
                    placeholder="Email*"
                    value={userData.email}
                    onChange={handleChange}
                    className="inputX"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password*"
                    value={userData.password}
                    onChange={handleChange}
                    className="inputX"
                />

                <div className="flex gap-3">
                    <input
                        name="firstName"
                        placeholder="First name*"
                        value={userData.firstName}
                        onChange={handleChange}
                        className="w-full max-w-[185px] border text-[white] mb-3.5 px-3.5 py-3 rounded-md border-solid border-[#2f3336] focus:border-[#1d9bf0]"
                    />
                    <input
                        name="lastName"
                        placeholder="Last name"
                        value={userData.lastName}
                        onChange={handleChange}
                        className="w-full max-w-[185px] border text-[white] mb-3.5 px-3.5 py-3 rounded-md border-solid border-[#2f3336] focus:border-[#1d9bf0]"
                    />
                </div>

                <input
                    name="phoneNumber"
                    placeholder="Phone number*"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    className="inputX"
                />

                {/* ===== Student Fields ===== */}
                {userData.roleType === "student" && (
                    <>
                        <select
                            name="batch"
                            value={userData.batch}
                            onChange={handleChange}
                            className="inputX"
                        >
                            <option value="">Select Batch *</option>
                            {BATCHES.map((b) => (
                                <option key={b} value={b}>{b}</option>
                            ))}
                        </select>

                        <select
                            name="courseType"
                            value={userData.courseType}
                            onChange={handleChange}
                            className="inputX"
                        >
                            <option value="">Select Course *</option>
                            {COURSES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>

                        <select
                            name="centerLocation"
                            value={userData.centerLocation}
                            onChange={handleChange}
                            className="inputX"
                        >
                            <option value="">Select Center *</option>
                            {CENTERS.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </>
                )}

                {/* ===== Professional / Instructor Fields ===== */}
                {(userData.roleType === "professional" ||
                    userData.roleType === "instructor") && (
                        <>
                            <input
                                name="organisationName"
                                placeholder="Organisation Name*"
                                value={userData.organisationName}
                                onChange={handleChange}
                                className="inputX"
                            />

                            <input
                                name="currentRole"
                                placeholder="Current Role*"
                                value={userData.currentRole}
                                onChange={handleChange}
                                className="inputX"
                            />
                        </>
                    )}

                {/* Create Button */}
                <button
                    onClick={signUp}
                    disabled={loading}
                    className="w-full max-w-sm bg-blue-500 py-3 rounded-full font-semibold hover:bg-blue-600 transition mt-4"
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
