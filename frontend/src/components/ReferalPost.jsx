import React, { useState } from "react";
import { timeAgo } from "../constants";
import axios from "axios";
import { useSelector } from "react-redux";
import PostOptions from "./PostOptions";

function ReferalPost({ postDetails, setOpen }) {
    console.log(postDetails,"Referral posts")
  const userName =
    postDetails.userId.firstName + postDetails.userId.lastName;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);

  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  async function likePost(postId) {
    try {
      await axios.post(
        `http://localhost:3000/api/post/likePost/${postId}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log("ERROR IN LIKE REFERRAL POST", error);
    }
  }

  function handleMenuClick() {
    if (menuLoading) return;

    setMenuLoading(true);
    setTimeout(() => {
      setIsMenuOpen((prev) => !prev);
      setMenuLoading(false);
    }, 300);
  }

  const toggleContent = () => setIsExpanded(!isExpanded);

  const MAX_LINES = 3;
  const content = `${postDetails.caption} ${postDetails.content}`;
  const isLongContent =
    content.split("\n").length > MAX_LINES || content.length > 200;

  return (
    <div
      className={`rounded-xl shadow-sm border overflow-hidden
      ${isDark
        ? "bg-[#141414] text-white border-white/10"
        : "bg-white text-black border-gray-100"
      }`}
    >
      {/* TOP STRIP */}
      <div
        className={`flex items-center gap-3 px-6 py-4 border-l-4 border-blue-600
        ${isDark ? "bg-blue-500/10" : "bg-blue-50/40"}`}
      >
        <span className="text-xl">🎯</span>
        <p className={`text-sm font-semibold ${isDark ? "text-blue-400" : "text-blue-600"}`}>
          Referral Opportunity
        </p>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* HEADER */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
              ${isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}
            >
              {(userName || "VG")[0]}
            </div>

            <div>
              <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                {userName}
              </h3>
              <p className="text-xs text-gray-500">
                {timeAgo(postDetails.createdAt)}
              </p>
            </div>
          </div>

          {/* MENU */}
          <div className="relative">
            <button
              onClick={handleMenuClick}
              className="cursor-pointer font-bold text-gray-600 dark:text-gray-300"
            >
              {menuLoading ? <span className="animate-spin">⏳</span> : "⋮"}
            </button>

            {isMenuOpen && (
              <PostOptions
                isDark={isDark}
                post={postDetails}  
                onClose={() => setIsMenuOpen(false)}
                setOpen={setOpen} 
              />
            )}
          </div>
        </div>

        {/* BODY */}
        <p className={`mt-4 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-800"}`}>
          <span className="font-bold">{postDetails.caption}</span>{" "}
          {isExpanded
            ? postDetails.content
            : `${postDetails.content.slice(0, 200)}`}
          {isLongContent && (
            <button
              onClick={toggleContent}
              className="text-blue-600 font-medium ml-1 hover:underline"
            >
              {isExpanded ? "less" : "more"}
            </button>
          )}
        </p>

        {/* STATS */}
        <div className="mt-3 text-xs text-gray-500">
          {postDetails.likes.length} likes • {postDetails.comments.length} comments
        </div>

        {/* ACTIONS */}
        <div className="flex justify-around items-center mt-3 py-3 border-t text-gray-600">
          <button
            className="flex items-center gap-2 hover:text-blue-600"
            onClick={() => likePost(postDetails._id)}
          >
            👍 Like
          </button>

          <button className="flex items-center gap-2 hover:text-blue-600">
            💬 Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReferalPost;
