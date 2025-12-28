import React, { useState } from "react";
import { timeAgo } from "../constants";
import PostOptions from "./PostOptions";
import axios from "axios";
import { useSelector } from "react-redux";
import { postServices } from "../services/postServices";

function GeneralPost({ postDetails, setOpen, currentUser }) {
  const userName =
    postDetails.userId.firstName + postDetails.userId.lastName;

  const isOwner = currentUser?._id === postDetails.userId._id;
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingMenu, setLoadingMenu] = useState(false);

  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  async function likePost(postId) {
    try {
      await postServices.likePost(postId)
    } catch (error) {
      console.log("ERROR IN LIKE GENERAL POST", error);
    }
  }

  function toggleContent() {
    setIsExpanded(!isExpanded);
  }

  function handleMenuClick() {
    if (loadingMenu) return;

    setLoadingMenu(true);
    setTimeout(() => {
      setIsOpen((prev) => !prev);
      setLoadingMenu(false);
    }, 300);
  }

  const MAX_LINES = 3;
  const content = `${postDetails.caption} ${postDetails.content}`;
  const isLongContent =
    content.split("\n").length > MAX_LINES || content.length > 200;

  return (
    <div
      className={`rounded-xl shadow-sm border
      ${isDark
          ? "bg-[#141414] border-white/10 text-white"
          : "bg-white border-gray-100 text-black"
        }`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between p-6">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
            ${isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-black"}`}
          >
            {(userName || "VJ")[0]}
          </div>

          <div>
            <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
              {userName || "Vivek Jadhav"}
            </h3>
            <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {timeAgo(postDetails.createdAt)}
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="relative">
          <button
            onClick={handleMenuClick}
            className={`font-bold cursor-pointer
              ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
          >
            {loadingMenu ? (
              <span className="animate-spin">⏳</span>
            ) : (
              "⋮"
            )}
          </button>

          {isOpen && (
            <PostOptions
              isDark={isDark}
              post={postDetails}
              onClose={() => setIsOpen(false)}
              setOpen={setOpen}
            />
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 pb-4">
        <p
          className={`mt-4 leading-relaxed
          ${isDark ? "text-gray-300" : "text-gray-800"}`}
        >
          <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
            {postDetails.caption}
          </span>{" "}
          {isExpanded
            ? postDetails.content
            : `${postDetails.content.slice(0, 200)}`}
          {isLongContent && (
            <button
              onClick={toggleContent}
              className="text-blue-600 font-medium ml-1 hover:underline cursor-pointer"
            >
              {isExpanded ? "less" : "more"}
            </button>
          )}
        </p>
      </div>

      {/* STATS */}
      <div className={`px-6 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {postDetails.likes.length} likes • {postDetails.comments.length} comments
      </div>

      {/* ACTIONS */}
      <div
        className={`flex justify-around items-center mt-3 py-3 border-t
        ${isDark ? "border-white/10 text-gray-400" : "border-gray-100 text-gray-600"}`}
      >
        <button
          className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
          onClick={() => likePost(postDetails._id)}
        >
          👍 Like
        </button>

        <button className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
          💬 Comment
        </button>
      </div>
    </div>
  );
}

export default GeneralPost;
