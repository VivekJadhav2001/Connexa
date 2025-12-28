import React, { useState } from 'react'
import PostCard from "./PostCard.jsx"
function ActivityPosts({ posts }) {
    console.log(posts, "THIS ARE MY POSTS")
    const [showAll, setShowAll] = useState(false)
    const [activeTab, setActiveTab] = useState("Posts")

    const visiblePosts = showAll ? posts : posts.slice(0, 2)
    return (
        <div className="bg-white rounded-xl border p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="font-semibold text-base">Activity</h2>
                    {/* <p className="text-sm text-blue-600">53 followers</p> */}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
                {["Posts", "Comments","Images/Videos"].map((tab, i) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-full text-sm border
      ${activeTab === tab
                                ? "bg-green-700 text-white"
                                : "bg-white"}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Posts" && (
                <div>
                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {visiblePosts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>

                    {/* Show More */}
                    {!showAll && posts.length > 2 && (
                        <button
                            onClick={() => setShowAll(true)}
                            className="mt-4 text-sm font-medium text-gray-600 hover:underline"
                        >
                            Show all posts →
                        </button>
                    )}
                </div>
            )}

            {activeTab === "Comments" && <p>Comments</p>}
            {activeTab === "Images/Videos" && <p>Media</p>}
        </div>
    )
}

export default ActivityPosts