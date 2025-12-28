import axios from "axios";
import React, { useEffect, useState } from "react";
import ActivityPosts from "../components/ActivityPosts";
import {postServices} from "../services/postServices"

function Profile() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        profilePicture: "https://i.pravatar.cc/150?img=60",
        batch: "",
        isInstructor: false,
        centerLocation: "",
        courseType: "",
        isOnline: true,
        lastSeen: "2 hours ago",
    })

    const [posts,setPosts] = useState([])

    async function getUserDetails() {

        try {
            const res = await axios.post("http://localhost:3000/api/user/profile", {}, { withCredentials: true })
            const user = res.data.data

            setUser({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profilePicture: "https://i.pravatar.cc/150?img=60",
                batch: user.batch,
                isInstructor: user.isInstructor,
                centerLocation: user.centerLocation,
                courseType: user.courseType,
                isOnline: user.isOnline,
                lastSeen: "2 hours ago",
            })

            console.log(user, "USER DETAILS FROM BACKEND")


        } catch (error) {
            console.log(error, "Error in profile user details")
        }
    }


    async function getMyPosts() {
        try {
            const res = await postServices.getMyPosts()
            setPosts(res.data.data)
        } catch (error) {
            console.log(error,"FAILED TO FETCH USER POSTS FOR PROFILE")
        }
    }

    useEffect(() => {
        getUserDetails()
        getMyPosts()
    }, [])


    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* MAIN PROFILE */}
                <div className="md:col-span-2 space-y-6">

                    {/* HEADER */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                        <div className="h-32 bg-linear-to-r from-blue-600 to-purple-600"></div>

                        <div className="p-6 relative">
                            <img
                                src={user.profilePicture}
                                className="w-28 h-28 rounded-full border-4 border-white absolute -top-14"
                                alt=""
                            />

                            <div className="ml-32">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {user.firstName} {user.lastName}
                                </h1>

                                <p className="text-gray-600">
                                    {user.courseType} Developer • Batch {user.batch}
                                </p>

                                <p className="text-sm text-gray-500 mt-1">
                                    {user.centerLocation}
                                </p>

                                <div className="mt-4 flex gap-3">
                                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full">
                                        Edit
                                    </button>
                                    <button className="border px-4 py-1.5 rounded-full">
                                        Message
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ABOUT */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-2">About</h2>
                        <p className="text-gray-600">
                            {user.isInstructor
                                ? "Instructor at AccioJob"
                                : `Student of ${user.courseType} at AccioJob (${user.batch})`}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <ActivityPosts posts={posts} />
                    </div>

                    {/* EXPERIENCE / COURSE */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Course Details</h2>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-bold">
                                {user?.courseType[0]}
                            </div>

                            <div>
                                <p className="font-medium">
                                    {user.courseType} Program
                                </p>
                                <p className="text-sm text-gray-500">
                                    Center: {user.centerLocation}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT SIDEBAR */}
                <aside className="space-y-6">

                    {/* STATUS */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <h3 className="font-semibold mb-3">Status</h3>

                        <div className="flex items-center gap-2">
                            <span
                                className={`w-3 h-3 rounded-full ${user.isOnline ? "bg-green-500" : "bg-gray-400"
                                    }`}
                            ></span>
                            <p className="text-gray-700">
                                {user.isOnline ? "Online" : "Offline"}
                            </p>
                        </div>

                        {!user.isOnline && (
                            <p className="text-sm text-gray-500 mt-2">
                                Last seen {user.lastSeen}
                            </p>
                        )}
                    </div>

                    {/* CONTACT INFO */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm">
                        <h3 className="font-semibold mb-3">Contact Info</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-600">{user.phoneNumber}</p>
                    </div>

                </aside>

            </div>
        </div>
    );
}

export default Profile;
