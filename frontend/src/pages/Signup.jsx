import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BATCHES } from "../constants";

function Signup() {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        batch: "",
        isInstructor: false,
        centerLocation: "",
        courseType: "",
        isOnline: false,
        isPlaced: false
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function signUp() {
        try {
            setLoading(true);

            const userRegistration = await axios.post(
                "http://localhost:3000/api/auth/signUp",
                userData
            );

            if (!userRegistration.data.success) {
                alert("Something went wrong. Try again");
                setLoading(false);
                return;
            }

            setUserData({
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                batch: "",
                isInstructor: false,
                centerLocation: "",
                courseType: "",
                isOnline: false,
                isPlaced: false
            });

            navigate("/");
            setLoading(false);
        } catch (error) {
            console.log(error, "ERROR IN SIGNUP FUNCTION");
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-700 via-black to-blue-900 p-4">
            <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">

                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    Create Account
                </h1>

                <form className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-300">Email</label>
                        <input
                            type="email"
                            value={userData.email}
                            onChange={(e) =>
                                setUserData({ ...userData, email: e.target.value })
                            }
                            className="w-full mt-1 p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400 transition"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-300">Password</label>
                        <input
                            type="password"
                            value={userData.password}
                            onChange={(e) =>
                                setUserData({ ...userData, password: e.target.value })
                            }
                            className="w-full mt-1 p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400 transition"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Names */}
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="text-sm text-gray-300">First Name</label>
                            <input
                                type="text"
                                value={userData.firstName}
                                onChange={(e) =>
                                    setUserData({ ...userData, firstName: e.target.value })
                                }
                                className="w-full mt-1 p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400 transition"
                                placeholder="First Name"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="text-sm text-gray-300">Last Name</label>
                            <input
                                type="text"
                                value={userData.lastName}
                                onChange={(e) =>
                                    setUserData({ ...userData, lastName: e.target.value })
                                }
                                className="w-full mt-1 p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400 transition"
                                placeholder="Last Name"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm text-gray-300">Phone Number</label>
                        <input
                            type="tel"
                            value={userData.phoneNumber}
                            onChange={(e) =>
                                setUserData({ ...userData, phoneNumber: e.target.value })
                            }
                            className="w-full mt-1 p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400 transition"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Batch */}
                    <div>
                        <label className="text-sm text-gray-300">Batch</label>
                        <select
                            value={userData.batch}
                            onChange={(e) =>
                                setUserData({ ...userData, batch: e.target.value })
                            }
                            className="w-full mt-1 p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none"
                        >
                            <option value="" className="text-black bg-white">
                                Select Batch
                            </option>

                            {BATCHES.map((batch) => (
                                <option
                                    key={batch}
                                    value={batch}
                                    className="text-black bg-white"
                                >
                                    {batch}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Course Type */}
                    <div>
                        <label className="text-sm text-gray-300">Course Type</label>
                        <select
                            value={userData.courseType}
                            onChange={(e) =>
                                setUserData({ ...userData, courseType: e.target.value })
                            }
                            className="w-full mt-1 p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none"
                        >
                            <option value="" className="text-black bg-white">Select</option>
                            <option value="MERN" className="text-black bg-white">MERN</option>
                            <option value="JAVA" className="text-black bg-white">JAVA</option>
                            <option value="DA" className="text-black bg-white">DA</option>
                        </select>

                    </div>

                    {/* Center Location */}
                    <div>
                        <label className="text-sm text-gray-300">Center Location</label>
                        <select
                            value={userData.centerLocation}
                            onChange={(e) =>
                                setUserData({ ...userData, centerLocation: e.target.value })
                            }
                            className="w-full mt-1 p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none"
                        >
                            <option value="" className="text-black bg-white">Select</option>
                            <option value="Hyd" className="text-black bg-white">Hyderabad</option>
                            <option value="Noida" className="text-black bg-white">Noida</option>
                            <option value="Pune" className="text-black bg-white">Pune</option>
                            <option value="Banglore" className="text-black bg-white">Bangalore</option>
                            <option value="Chennai" className="text-black bg-white">Chennai</option>
                        </select>
                    </div>

                    {/* Checkboxes */}
                    <div className="flex items-center gap-6 text-gray-300">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={userData.isInstructor}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        isInstructor: e.target.checked,
                                    })
                                }
                            />
                            Instructor
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={userData.isOnline}
                                onChange={(e) =>
                                    setUserData({ ...userData, isOnline: e.target.checked })
                                }
                            />
                            Online
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={userData.isPlaced}
                                onChange={(e) =>
                                    setUserData({ ...userData, isPlaced: e.target.checked })
                                }
                            />
                            Placed
                        </label>
                    </div>

                    {/* Button */}
                    <button
                        type="button"
                        onClick={signUp}
                        className="cursor-pointer w-full py-3 mt-4 text-white font-medium rounded-lg bg-linear-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Signup;
