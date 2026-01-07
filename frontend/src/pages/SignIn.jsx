import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { signIn } from '../features/authSlice.js'

function SignIn() {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();


    // async function signIn(){
    //     try {
    //         setLoading(true)
    //         /*
    //         if we want access cookies in client side we need to pass {withCredentials:true} by default its true
    //         */
    //         const user = await axios.post("http://localhost:3000/api/auth/signIn",credentials,{withCredentials:true})


    //         console.log(user,"userfrom backend")
    //         if(!user.data.success){
    //             alert("Invalid email or password");
    //             setLoading(false);
    //             return;
    //         }

    //         if(user.data.success){
    //             setCredentials({ email: "", password: "" });
    //             navigate("/home")
    //         }

    //         setLoading(false);


    //     } catch (error) {
    //     console.log(error,"ERROR IN SIGN_IN") 
    //     setLoading(false)
    //     }
    // }

    async function login(e) {
        e.preventDefault()

        try {
            const user = await dispatch(signIn(credentials)).unwrap()
            console.log(user, "Login User")
            navigate("/home")
            /*
            👉 .unwrap() converts:

                fulfilled → resolved promise

                rejected → thrown error
            */
        } catch (error) {
            console.log(error, "Login Not Successful")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-700 via-black to-blue-900 p-4">
            <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl">

                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    Sign In
                </h1>

                <form className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-300">Email</label>
                        <input
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            className="w-full mt-1 p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400 transition"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-300">Password</label>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            className="w-full mt-1 p-3 bg-white/10 text-white border border-white/20 rounded-lg outline-none focus:border-purple-400 transition"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="button"
                        onClick={login}
                        className="cursor-pointer w-full py-3 mt-4 text-white font-medium rounded-lg bg-linear-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default SignIn