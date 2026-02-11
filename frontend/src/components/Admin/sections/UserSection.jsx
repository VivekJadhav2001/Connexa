'use client';

import { motion } from 'framer-motion'
import { Users, TrendingUp } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useSelector } from 'react-redux'

export default function UserSection() {
    const allusers = useSelector((state) => state.adminUsers)

    const totalUsers = allusers?.allUsers?.length || 0
    const activeUsers = allusers?.activeUsers?.length || 0

    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const currentMonthIndex = new Date().getMonth()

    const userData = months.slice(0, currentMonthIndex + 1).map((month, index) => {
        const usersTillMonth = allusers?.allUsers?.filter(user => {
            if (!user.createdAt) return false
            const userMonth = new Date(user.createdAt).getMonth()
            return userMonth <= index
        }).length || 0

        const activeTillMonth = allusers?.activeUsers?.filter(user => {
            if (!user.createdAt) return false
            const userMonth = new Date(user.createdAt).getMonth()
            return userMonth <= index
        }).length || 0

        return {
            month,
            users: usersTillMonth,
            active: activeTillMonth
        }
    })

    const topUsers = allusers?.allUsers?.slice(0, 5) || []

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            {/* Header */}
            <motion.div variants={item}>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    Community Users
                </h1>
                <p className="text-foreground/60">
                    Manage and track your community members
                </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                variants={item}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {[
                    { label: 'Total Users', value: totalUsers, change: '+', color: 'primary' },
                    { label: 'Active Today', value: activeUsers, change: '+', color: 'accent' },
                    { label: 'New This Week', value: Math.floor(totalUsers * 0.05), change: '+', color: 'primary' },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -4 }}
                        className="bg-card border border-border rounded-xl p-6 backdrop-blur"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-foreground/60 text-sm">{stat.label}</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                                    {stat.value}
                                </h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className={`w-5 h-5 text-${stat.color}`} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts */}
            <motion.div
                variants={item}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                {/* User Growth Chart */}
                <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        User's Growth
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={userData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#3a3530" />
                            <XAxis dataKey="month" stroke="#8b6239" />
                            <YAxis stroke="#8b6239" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#2a2520',
                                    border: '1px solid #3a3530',
                                    borderRadius: '8px',
                                }}
                                labelStyle={{ color: '#f5f1ed' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="#d4804a"
                                strokeWidth={2}
                                dot={{ fill: '#d4804a', r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="active"
                                stroke="#2a9d8f"
                                strokeWidth={2}
                                dot={{ fill: '#2a9d8f', r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* User Engagement */}
                <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        User's Engagement
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={userData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#3a3530" />
                            <XAxis dataKey="month" stroke="#8b6239" />
                            <YAxis stroke="#8b6239" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#2a2520',
                                    border: '1px solid #3a3530',
                                    borderRadius: '8px',
                                }}
                                labelStyle={{ color: '#f5f1ed' }}
                            />
                            <Bar dataKey="active" fill="#d4804a" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Top Users */}
            <motion.div
                variants={item}
                className="bg-card border border-border rounded-xl p-6 backdrop-blur"
            >
                <div className="flex items-center gap-2 mb-6">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                        Top Community Members
                    </h3>
                </div>

                <div className="space-y-4">
                    {topUsers.map((user, idx) => (
                        <motion.div
                            key={user._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-lg hover:bg-background/50 transition-colors"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 rounded-lg gradient-orange flex items-center justify-center">
                                    <span className="text-white font-bold">
                                        {user.firstName?.charAt(0)}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-foreground">
                                        {user.firstName} {user.lastName}
                                    </h4>
                                    <p className="text-sm text-foreground/60">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
