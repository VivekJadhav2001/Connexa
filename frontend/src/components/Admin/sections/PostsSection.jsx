'use client';

import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, PieChart, CircleEllipsis } from 'lucide-react'
import { useSelector } from 'react-redux';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const postsData = [
    { name: 'Text Posts', value: 45, color: '#d4804a' },
    { name: 'Images', value: 30, color: '#8b6239' },
    { name: 'Videos', value: 20, color: '#2a9d8f' },
    { name: 'Links', value: 5, color: '#6b5b4d' },
]

const recentPosts = [
    {
        id: 1,
        author: 'Sarah Chen',
        handle: '@sarahchen',
        content: 'Just launched our new community initiative! Excited to see what everyone builds.',
        likes: 2340,
        comments: 156,
        shares: 89,
        timestamp: '2 hours ago',
        category: 'announcement',
    },
    {
        id: 2,
        author: 'Marcus Johnson',
        handle: '@mjohnson',
        content: 'Working on something cool with React. Who else loves building with Vite?',
        likes: 1840,
        comments: 234,
        shares: 67,
        timestamp: '4 hours ago',
        category: 'discussion',
    },
    {
        id: 3,
        author: 'Emily Davis',
        handle: '@emilydavis',
        content: 'Check out this amazing tutorial on Framer Motion animations!',
        likes: 1620,
        comments: 98,
        shares: 145,
        timestamp: '6 hours ago',
        category: 'tutorial',
    },
    {
        id: 4,
        author: 'Alex Rivera',
        handle: '@alexrivera',
        content: 'Anyone interested in collaborating on open source projects?',
        likes: 934,
        comments: 187,
        shares: 54,
        timestamp: '8 hours ago',
        category: 'opportunity',
    },
]

export default function PostsSection() {

    const posts = useSelector(s => s)

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
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Community Posts</h1>
                <p className="text-foreground/60">Monitor and manage community discussions</p>
            </motion.div>

            {/* Stats */}
            <motion.div
                variants={item}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
                {[
                    { label: 'Total Posts', value: '8,547', change: '+18%' },
                    { label: 'Avg Engagement', value: '1.2K', change: '+8%' },
                    { label: 'New Today', value: '342', change: '+12%' },
                    { label: 'Trending', value: '23', change: '+5%' },
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -4 }}
                        className="bg-card border border-border rounded-xl p-6 backdrop-blur"
                    >
                        <p className="text-foreground/60 text-sm">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-foreground mt-2">{stat.value}</h3>
                        <span className="text-xs font-medium text-primary mt-2">{stat.change}</span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts */}
            <motion.div
                variants={item}
                className="bg-card border border-border rounded-xl p-6 backdrop-blur"
            >
                <div className="flex items-center gap-2 mb-6">
                    <PieChart className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">Content Distribution</h3>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <RechartsPie data={postsData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} dataKey="value">
                        {postsData.map((entry, index) => (
                            <CircleEllipsis key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#2a2520',
                                border: '1px solid #3a3530',
                                borderRadius: '8px',
                            }}
                            labelStyle={{ color: '#f5f1ed' }}
                        />
                        <Legend />
                    </RechartsPie>
                </ResponsiveContainer>
            </motion.div>

            {/* Recent Posts */}
            <motion.div
                variants={item}
                className="bg-card border border-border rounded-xl p-6 backdrop-blur"
            >
                <h3 className="text-lg font-semibold text-foreground mb-6">Recent Posts</h3>

                <div className="space-y-4">
                    {recentPosts.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="border border-border/50 rounded-lg p-6 hover:bg-background/30 transition-colors"
                        >
                            {/* Post Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">{post.author.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">{post.author}</h4>
                                        <p className="text-xs text-foreground/60">{post.handle} · {post.timestamp}</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary capitalize">
                                    {post.category}
                                </span>
                            </div>

                            {/* Post Content */}
                            <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

                            {/* Post Actions */}
                            <div className="flex items-center gap-8 text-foreground/60">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center gap-2 hover:text-primary transition-colors"
                                >
                                    <Heart className="w-4 h-4" />
                                    <span className="text-sm">{post.likes.toLocaleString()}</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center gap-2 hover:text-primary transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="text-sm">{post.comments}</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    className="flex items-center gap-2 hover:text-primary transition-colors"
                                >
                                    <Share2 className="w-4 h-4" />
                                    <span className="text-sm">{post.shares}</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}
