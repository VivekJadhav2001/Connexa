'use client';

import { motion } from 'framer-motion'
import { TrendingUp, Activity, Users, MessageSquare, Clock, Target } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts'

const engagementData = [
    { day: 'Mon', engagement: 400, retention: 240, conversion: 80 },
    { day: 'Tue', engagement: 560, retention: 340, conversion: 120 },
    { day: 'Wed', engagement: 620, retention: 380, conversion: 150 },
    { day: 'Thu', engagement: 580, retention: 360, conversion: 130 },
    { day: 'Fri', engagement: 720, retention: 440, conversion: 180 },
    { day: 'Sat', engagement: 840, retention: 520, conversion: 210 },
    { day: 'Sun', engagement: 680, retention: 420, conversion: 160 },
]

const timeSeriesData = [
    { hour: '00:00', visits: 120 },
    { hour: '04:00', visits: 140 },
    { hour: '08:00', visits: 420 },
    { hour: '12:00', visits: 680 },
    { hour: '16:00', visits: 590 },
    { hour: '20:00', visits: 450 },
    { hour: '24:00', visits: 240 },
]

const metricsData = [
    { icon: Activity, label: 'Active Sessions', value: '2,847', change: '+15%', color: 'text-primary' },
    { icon: Users, label: 'Unique Visitors', value: '12,450', change: '+23%', color: 'text-accent' },
    { icon: MessageSquare, label: 'Interactions', value: '34.2K', change: '+18%', color: 'text-primary' },
    { icon: Clock, label: 'Avg. Duration', value: '4m 32s', change: '+8%', color: 'text-accent' },
]

export default function AnalyticsSection() {
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
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Analytics & Insights</h1>
                <p className="text-foreground/60">Comprehensive community metrics and performance data</p>
            </motion.div>

            {/* Key Metrics */}
            <motion.div
                variants={item}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                {metricsData.map((metric, idx) => {
                    const Icon = metric.icon
                    return (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -4 }}
                            className="bg-card border border-border rounded-xl p-6 backdrop-blur group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors`}>
                                    <Icon className={`w-5 h-5 ${metric.color}`} />
                                </div>
                                <span className="text-xs font-medium text-primary">{metric.change}</span>
                            </div>
                            <p className="text-foreground/60 text-sm mb-1">{metric.label}</p>
                            <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Main Charts */}
            <motion.div
                variants={item}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                {/* Engagement Overview */}
                <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Engagement</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={engagementData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#3a3530" />
                            <XAxis dataKey="day" stroke="#8b6239" />
                            <YAxis stroke="#8b6239" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#2a2520',
                                    border: '1px solid #3a3530',
                                    borderRadius: '8px',
                                }}
                                labelStyle={{ color: '#f5f1ed' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="engagement"
                                fill="#d4804a"
                                stroke="#d4804a"
                                opacity={0.2}
                            />
                            <Line
                                type="monotone"
                                dataKey="retention"
                                stroke="#2a9d8f"
                                strokeWidth={2}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                {/* Conversion Funnel */}
                <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Conversion Metrics</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={engagementData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#3a3530" />
                            <XAxis dataKey="day" stroke="#8b6239" />
                            <YAxis stroke="#8b6239" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#2a2520',
                                    border: '1px solid #3a3530',
                                    borderRadius: '8px',
                                }}
                                labelStyle={{ color: '#f5f1ed' }}
                            />
                            <Bar dataKey="conversion" fill="#2a9d8f" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Time Series */}
            <motion.div
                variants={item}
                className="bg-card border border-border rounded-xl p-6 backdrop-blur"
            >
                <h3 className="text-lg font-semibold text-foreground mb-4">Hourly Visits</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={timeSeriesData}>
                        <defs>
                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#d4804a" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#d4804a" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3a3530" />
                        <XAxis dataKey="hour" stroke="#8b6239" />
                        <YAxis stroke="#8b6239" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#2a2520',
                                border: '1px solid #3a3530',
                                borderRadius: '8px',
                            }}
                            labelStyle={{ color: '#f5f1ed' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="visits"
                            stroke="#d4804a"
                            fillOpacity={1}
                            fill="url(#colorVisits)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Insights Grid */}
            <motion.div
                variants={item}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* Peak Hours */}
                <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
                    <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">Peak Activity Times</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { time: '12:00 PM - 2:00 PM', activity: 'Lunch Break Browsing', percentage: 94 },
                            { time: '6:00 PM - 9:00 PM', activity: 'Evening Activity', percentage: 87 },
                            { time: '8:00 AM - 10:00 AM', activity: 'Morning Session', percentage: 76 },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium text-foreground">{item.activity}</span>
                                    <span className="text-sm text-foreground/60">{item.percentage}%</span>
                                </div>
                                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        transition={{ delay: idx * 0.1 + 0.5, duration: 0.8 }}
                                        className="h-full gradient-orange rounded-full"
                                    ></motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Top Referrers */}
                <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-accent" />
                        <h3 className="text-lg font-semibold text-foreground">Top Traffic Sources</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { source: 'Direct', visits: '3,450', percentage: 42 },
                            { source: 'Social Media', visits: '2,840', percentage: 35 },
                            { source: 'Search', visits: '1,560', percentage: 19 },
                            { source: 'Referral', visits: '400', percentage: 4 },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-sm font-medium text-foreground">{item.source}</p>
                                    <p className="text-xs text-foreground/60">{item.visits} visits</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-semibold text-accent">{item.percentage}%</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
