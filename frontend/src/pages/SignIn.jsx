import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../features/authSlice.js";
import { FaGoogle, FaApple } from "react-icons/fa";

function SignIn() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        try {
            const user = await dispatch(signIn(credentials)).unwrap();
            console.log(user, "Login User");
            navigate("/home");
        } catch (error) {
            console.log(error, "Login Not Successful");
            toast.error("Invalid email or password", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className="min-h-screen bg-black flex text-white">

            {/* ===== Left Logo Section ===== */}
            <div className="hidden lg:flex w-1/2 items-center justify-center bg-none flex-col gap-6">
                {/* <h1 className="text-5xl font-extrabold mb-6">
                    Create your account
                </h1> */}
                {/* <h1 className="text-[250px] font-extrabold tracking-tight">C</h1> */}
                <img src="./logo.png" alt="" className="w-[58%] rounded-2xl " />
            </div>

            {/* ===== Right SignIn Panel ===== */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16">

                <h1 className="text-5xl font-extrabold mb-6 pb-5">
                    Sign in to Connexa
                </h1>



                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) =>
                        setCredentials({ ...credentials, email: e.target.value })
                    }
                    className="w-full max-w-sm mb-4 px-4 py-3 rounded-md bg-black border border-gray-700 focus:border-blue-500 outline-none"
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) =>
                        setCredentials({ ...credentials, password: e.target.value })
                    }
                    className="w-full max-w-sm mb-6 px-4 py-3 rounded-md bg-black border border-gray-700 focus:border-blue-500 outline-none"
                />

                {/* Sign In Button */}
                <button
                    onClick={login}
                    className="w-full max-w-sm bg-blue-500 py-3 rounded-full font-semibold hover:bg-blue-600 transition mb-6"
                >
                    Sign In
                </button>

                {/* Signup Redirect */}
                <p className="text-gray-400">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
