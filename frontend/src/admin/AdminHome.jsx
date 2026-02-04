import axios from 'axios'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import Navbar from '../components/Admin/Navbar';
import Sidebar from '../components/Admin/Sidebar';
import Hero from '../components/Admin/Hero';

const AdminHome = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/admin/users/getAllUsers');
                setData(response.data.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    console.log(data)
    console.log(error)

    return (
        <>
            <div className='text-black flex flex-col h-screen gap-2 m-2 fixed w-full pr-4'>
                <Navbar />
                <div className='flex h-full gap-2 mb-4'>
                    <Sidebar />
                    <Hero userData={data} />
                </div>
            </div>
        </>
    )
}

export default AdminHome