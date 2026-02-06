// import axios from 'axios'
// import React from 'react'
// import { useState } from 'react';
// import { useEffect } from 'react'
// import Navbar from '../components/Admin/Navbar';
// import Sidebar from '../components/Admin/Sidebar';
// import Hero from '../components/Admin/Hero';

// const AdminHome = () => {

//     const [data, setData] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/admin/users/getAllUsers');
//                 setData(response.data.data);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };

//         fetchData();
//     }, []);

//     // console.log(data)
//     // console.log(error)

//     return (
//         <>
//             <div className='text-black flex flex-col h-screen gap-2 m-2 fixed w-full pr-4'>
//                 <Navbar />
//                 <div className='flex h-full gap-2 mb-4'>
//                     <Sidebar />
//                     <Hero userData={data} />
//                 </div>
//             </div>
//         </>
//     )
// }

// export default AdminHome



import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/userApi";




export default function PeopleDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const filteredUsers = users.filter((user) => {
        const keyword = search.toLowerCase();
        return (
            user.fullName?.toLowerCase().includes(keyword) ||
            user.email?.toLowerCase().includes(keyword) ||
            user.roleType?.toLowerCase().includes(keyword)
        );
    });

    const fetchUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsers(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        await deleteUser(id);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">People</h1>

            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by name, email, role..."
                    className="px-4 py-2 border rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>


            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 text-sm text-gray-600">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Lifecycle</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-t hover:bg-yellow-50">
                                <td className="p-4 flex items-center gap-3">
                                    <img
                                        src={user.profilePicture}
                                        alt=""
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">
                                            {user.fullName || `${user.firstName} ${user.lastName}`}
                                        </p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </td>

                                <td>{user.jobRole || user.courseType || "-"}</td>
                                <td className="capitalize">{user.roleType}</td>
                                <td>{user.jobLocation || user.centerLocation || "-"}</td>

                                <td>
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full ${user.isOnline
                                            ? "bg-green-100 text-green-600"
                                            : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {user.isOnline ? "Online" : "Offline"}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full ${user.verificationStatus === "approved"
                                            ? "bg-green-100 text-green-600"
                                            : user.verificationStatus === "pending"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {user.verificationStatus}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="text-red-500 text-sm hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
