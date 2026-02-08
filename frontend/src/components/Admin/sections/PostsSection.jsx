'use client';

import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, PieChart } from 'lucide-react'
import { useSelector } from 'react-redux';
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts'

export default function PostsSection() {

  const { posts, loading } = useSelector(state => state.adminUsersPosts)

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

  // content distribution
  const postsData = [
    {
      name: 'Images',
      value: posts?.filter(p => p.contentType === 'image').length || 0,
      color: '#d4804a'
    },
    {
      name: 'Carousels',
      value: posts?.filter(p => p.contentType === 'carousel').length || 0,
      color: '#8b6239'
    },
  ]

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
          Community Posts
        </h1>
        <p className="text-foreground/60">
          Monitor and manage community discussions
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
          <p className="text-foreground/60 text-sm">Total Posts</p>
          <h3 className="text-2xl font-bold text-foreground mt-2">
            {posts?.length || 0}
          </h3>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
          <p className="text-foreground/60 text-sm">Total Likes</p>
          <h3 className="text-2xl font-bold text-foreground mt-2">
            {posts?.reduce((acc, p) => acc + (p.likesCount || 0), 0)}
          </h3>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
          <p className="text-foreground/60 text-sm">Total Comments</p>
          <h3 className="text-2xl font-bold text-foreground mt-2">
            {posts?.reduce((acc, p) => acc + (p.commentsCount || 0), 0)}
          </h3>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 backdrop-blur">
          <p className="text-foreground/60 text-sm">Public Posts</p>
          <h3 className="text-2xl font-bold text-foreground mt-2">
            {posts?.filter(p => p.visibility === 'public').length || 0}
          </h3>
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div
        variants={item}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur"
      >
        <div className="flex items-center gap-2 mb-6">
          <PieChart className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Content Distribution
          </h3>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <RechartsPie
            data={postsData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            dataKey="value"
          >
            {postsData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
            <Tooltip />
            <Legend />
          </RechartsPie>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        variants={item}
        className="bg-card border border-border rounded-xl p-6 backdrop-blur"
      >
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Recent Posts
        </h3>

        <div className="space-y-4">
          {loading && <p className="text-foreground/60">Loading...</p>}

          {posts?.map((post, idx) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="border border-border/50 rounded-lg p-6 hover:bg-background/30 transition-colors"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {post.author?.firstName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {post.author?.firstName} {post.author?.lastName}
                    </h4>
                    <p className="text-xs text-foreground/60">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary capitalize">
                  {post.postCategory}
                </span>
              </div>

              {/* Content + Image */}
              <div className="flex gap-4 mb-4">
                {post.content?.[0] && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                    <img
                      src={post.content[0]}
                      alt="post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <p className="text-foreground leading-relaxed line-clamp-3">
                  {post.caption}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-8 text-foreground/60">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{post.likesCount}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{post.commentsCount}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
