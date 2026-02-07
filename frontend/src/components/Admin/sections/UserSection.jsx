'use client';

import { motion } from 'framer-motion'
import { Users, TrendingUp } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const userData = [
    { month: 'Jan', users: 2400, active: 1400 },
    { month: 'Feb', users: 3210, active: 2210 },
    { month: 'Mar', users: 2290, active: 2000 },
    { month: 'Apr', users: 2000, active: 1900 },
    { month: 'May', users: 2181, active: 2100 },
    { month: 'Jun', users: 2500, active: 2400 },
]

const topUsers = [
    { id: 1, name: 'Sarah Chen', handle: '@sarahchen', followers: '24.5K', posts: 342, verified: true },
    { id: 2, name: 'Marcus Johnson', handle: '@mjohnson', followers: '18.2K', posts: 256, verified: true },
    { id: 3, name: 'Emily Davis', handle: '@emilydavis', followers: '15.8K', posts: 198, verified: false },
    { id: 4, name: 'Alex Rivera', handle: '@alexrivera', followers: '12.3K', posts: 167, verified: false },
    { id: 5, name: 'Jordan Smith', handle: '@jsmith', followers: '9.7K', posts: 145, verified: false },
]

export default function UserSection() {
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
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Community Users</h1>
                <p className="text-foreground/60">Manage and track your community members</p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
                variants={item}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {[
                    { label: 'Total Users', value: '12,450', change: '+23%', color: 'primary' },
                    { label: 'Active Today', value: '3,847', change: '+12%', color: 'accent' },
                    { label: 'New This Week', value: '486', change: '+5%', color: 'primary' },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -4 }}
                        className="bg-card border border-border rounded-xl p-6 backdrop-blur"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-foreground/60 text-sm">{stat.label}</p>
                                <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2">{stat.value}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <TrendingUp className={`w-5 h-5 text-${stat.color}`} />
                                <span className="text-sm font-medium text-primary">{stat.change}</span>
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
                    <h3 className="text-lg font-semibold text-foreground mb-4">User Growth</h3>
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
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="active"
                                stroke="#2a9d8f"
                                strokeWidth={2}
                                dot={{ fill: '#2a9d8f', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* User Engagement */}
                <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
                    <h3 className="text-lg font-semibold text-foreground mb-4">User Engagement</h3>
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
                    <h3 className="text-lg font-semibold text-foreground">Top Community Members</h3>
                </div>

                <div className="space-y-4">
                    {topUsers.map((user, idx) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center justify-between p-4 rounded-lg hover:bg-background/50 transition-colors"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-12 h-12 rounded-lg gradient-orange flex items-center justify-center">
                                    <span className="text-white font-bold">{user.name.charAt(0)}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-foreground">{user.name}</h4>
                                        {user.verified && <span className="text-primary text-xs">✓</span>}
                                    </div>
                                    <p className="text-sm text-foreground/60">{user.handle}</p>
                                </div>
                            </div>
                            <div className="hidden md:flex items-center gap-8 text-right">
                                <div>
                                    <p className="text-sm text-foreground/60">Followers</p>
                                    <p className="font-semibold text-foreground">{user.followers}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/60">Posts</p>
                                    <p className="font-semibold text-foreground">{user.posts}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
