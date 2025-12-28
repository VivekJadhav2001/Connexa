import React from 'react'

function Likes({ isDark, likes = [], setShowLikes }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setShowLikes(false)}
            />

            {/* Modal */}
            <div
                className={`relative w-[420px] max-h-[70vh] rounded-xl shadow-lg overflow-hidden
      ${isDark ? "bg-[#1b1b1b] text-white" : "bg-white text-black"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/10">
                    <h3 className="font-semibold text-sm">
                        Reactions
                    </h3>
                    <button
                        onClick={() => setShowLikes(false)}
                        className="text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Reaction Tabs */}
                <div className="flex gap-4 px-4 py-2 text-sm border-b border-gray-200 dark:border-white/10">
                    <span className="font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">
                        All {likes.length}
                    </span>
                    {/* <span>👍</span>
                            <span>❤️</span>
                            <span>👏</span>
                            <span>🎉</span> */}
                </div>

                {/* Users List */}
                <div className="overflow-y-auto max-h-[55vh]">
                    {likes.map((user) => (
                        <div
                            key={user.userId}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                            <img
                                src={user.profilePic || "https://i.pravatar.cc/40"}
                                className="w-10 h-10 rounded-full"
                                alt="user"
                            />
                            <div className="text-sm">
                                <p className="font-medium">{user.userName}</p>
                                {/* <p className="text-xs text-gray-500">3rd+</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Likes