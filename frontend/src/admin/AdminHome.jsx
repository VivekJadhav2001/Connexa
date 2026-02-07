import { useEffect, useState } from 'react'
import Header from '../components/Admin/Header'
import Sidebar from '../components/Admin/Sidebar'
import UserSection from '../components/Admin/sections/UserSection'
import PostsSection from '../components/Admin/sections/PostsSection'
import AnalyticsSection from '../components/Admin/sections/AnalyticsSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActiveUsers, fetchAllUsers } from '../features/AdminSlices/adminUsersSlice.js'
import { fetchAllUsersPosts } from '../features/AdminSlices/adminPostsSlice.js'

export default function AdminHome() {
    const [activeTab, setActiveTab] = useState('users')
    const allusers = useSelector((state)=>state.adminUsers)
    const allUsersPosts = useSelector(state=>state.adminUsersPosts)

    console.log(allusers,"Users DATA ADMIN")
    console.log(allUsersPosts,"POSTS DATA ADMIN")

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchAllUsers())
        dispatch(fetchActiveUsers())
        dispatch(fetchAllUsersPosts())
    },[])

    return (
        <div className="flex h-screen bg-background  ">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {activeTab === 'users' && <UserSection />}
                    {activeTab === 'posts' && <PostsSection />}
                    {activeTab === 'other' && <AnalyticsSection />}
                </main>
            </div>
        </div>
    )
}
