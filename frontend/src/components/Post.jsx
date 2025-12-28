import React, { useState } from "react";
import { timeAgo } from "../constants";
import PostOptions from "./PostOptions";
import { useSelector } from "react-redux";
import { postServices } from "../services/postServices";
import EmojiPicker from "emoji-picker-react";
import Comments from "./Comments";
import Likes from "./Likes";

function Post({ postDetails, setOpen, currentUser }) {
    // console.log(postDetails, "POST DETAILS")
    const isReferral = postDetails.type === "referral-post";

    const userName =
        postDetails?.userId?.firstName + " " + postDetails?.userId?.lastName;

    const isOwner = currentUser?._id === postDetails?.userId?._id;

    const [isExpanded, setIsExpanded] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuLoading, setMenuLoading] = useState(false);
    const [isCommentOn, setIsCommentOn] = useState(false)
    const [commentText, setCommentText] = useState("");
    const [showEmoji, setShowEmoji] = useState(false)
    const isDark = useSelector((state) => state.theme.mode === "dark")
    const [showComments, setShowComments] = useState(false)
    const [showLikes, setShowLikes] = useState(false)

    async function likePost() {
        try {
            await postServices.likePost(postDetails._id);
        } catch (err) {
            console.log("LIKE ERROR", err);
        }
    }

    function toggleContent() {
        setIsExpanded((prev) => !prev);
    }

    function handleMenuClick() {
        if (menuLoading) return;
        setMenuLoading(true);
        setTimeout(() => {
            setMenuOpen((prev) => !prev);
            setMenuLoading(false);
        }, 200);
    }

    async function handleComment(e, postId) {
        console.log(typeof postId, postId, "POST ID IN HANDLE COMMENT")
        if (e.key === "Enter") {
            if (!commentText.trim()) return

            const payload = { comment: commentText };

            try {
                const res = await postServices.createComment(postId, payload)
                console.log(res, "AFTER SUCCESSFUL COMMENT SUBMISSION, RESPONSE")
                setCommentText("")
            } catch (error) {
                console.log(error, "CREATING COMMENT ERROR")
            }
        }
    }

    const content = `${postDetails.caption} ${postDetails.content}`;
    const isLongContent =
        content.split("\n").length > 3 || content.length > 200;

    return (
        <div
            className={`rounded-xl shadow-sm border
        ${isDark
                    ? "bg-[#141414] border-white/10 text-white"
                    : "bg-white border-gray-100 text-black"}
      `}
        >
            {/* REFERRAL STRIP */}
            {isReferral && (
                <div
                    className={`flex items-center gap-3 px-6 py-4 border-l-4 border-blue-600
          ${isDark ? "bg-blue-500/10" : "bg-blue-50/40"}`}
                >
                    <span className="text-xl">🎯</span>
                    <p className={`text-sm font-semibold ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                        Referral Opportunity
                    </p>
                </div>
            )}

            {/* HEADER */}
            <div className="flex items-start justify-between px-6 pt-4">
                <div className="flex items-center gap-3">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
            ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
                    >
                        {userName?.[0] || "U"}
                    </div>

                    <div>
                        <h3 className="font-semibold">{userName || "Unknown User"}</h3>
                        <p className="text-xs text-gray-500">
                            {timeAgo(postDetails.createdAt)}
                        </p>
                    </div>
                </div>

                {/* MENU */}
                <div className="relative">
                    <button
                        onClick={handleMenuClick}
                        className="font-bold cursor-pointer"
                    >
                        {menuLoading ? "⏳" : "⋮"}
                    </button>

                    {menuOpen && (
                        <PostOptions
                            isDark={isDark}
                            post={postDetails}
                            onClose={() => setMenuOpen(false)}
                            setOpen={setOpen}
                            isOwner={isOwner}
                        />
                    )}
                </div>
            </div>

            {/* CONTENT */}
            <div className="px-6 pb-4">
                <p className={`mt-4 leading-relaxed ${isDark ? "text-gray-300" : "text-gray-800"}`}>
                    <span className="font-bold">{postDetails.caption}</span>{" "}
                    {isExpanded
                        ? postDetails.content
                        : postDetails.content.slice(0, 200)}
                    {isLongContent && (
                        <button
                            onClick={toggleContent}
                            className="text-blue-600 font-medium ml-1 hover:underline"
                        >
                            {isExpanded ? "less" : "more"}
                        </button>
                    )}
                </p>
            </div>

            {/* STATS */}
            <div className="px-6 text-xs">
                {!postDetails.isLikeDisabled && (
                    <>
                        {postDetails.likes.length}{" "}
                        <button className="hover:text-blue-600 hover:underline cursor-pointer" onClick={() => setShowLikes(prev => !prev)}>likes</button>
                    </>
                )}

                {!postDetails.isCommentDisabled && (
                    <>
                        {" • "}
                        {postDetails.comments.length}{" "}
                        <button className="hover:text-blue-600 hover:underline cursor-pointer" onClick={() => setShowComments(prev => !prev)}>
                            comments
                        </button>
                    </>
                )}
            </div>


            {/* ACTIONS */}
            <div
                className={`flex justify-around items-center mt-3 py-3 border-t
        ${isDark ? "border-white/10" : "border-gray-100"}`}
            >
                {!postDetails.isLikeDisabled && (<button
                    className=" cursor-pointer flex items-center gap-2 hover:text-blue-600"
                    onClick={likePost}
                >
                    👍 Like
                </button>)}

                {!postDetails.isCommentDisabled && (<button className=" cursor-pointer flex items-center gap-2 hover:text-blue-600" onClick={() => setIsCommentOn(prev => !prev)}>
                    💬 Comment
                </button>)}
            </div>


            {/* INPUT */}
            {!postDetails.isCommentDisabled && isCommentOn && (
                <div
                    className={`px-6 py-3 border-t relative ${isDark ? "border-white/10 bg-[#141414]" : "border-gray-100 bg-white"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/40?img=60"
                            alt="user"
                            className="w-9 h-9 rounded-full"
                        />

                        <div
                            className={`flex items-center gap-3 flex-1 rounded-full px-4 py-2 ${isDark ? "bg-[#1f1f1f]" : "bg-gray-100"
                                }`}
                        >
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                value={commentText}
                                onKeyDown={(e) => handleComment(e, postDetails._id)}
                                onChange={(e) => setCommentText(e.target.value)}
                                className={`flex-1 bg-transparent outline-none text-sm ${isDark
                                    ? "text-white placeholder-gray-400"
                                    : "text-black placeholder-gray-500"
                                    }`}
                            />

                            <button
                                onClick={() => setShowEmoji((prev) => !prev)}
                                type="button"
                            >
                                😊
                            </button>

                            {showEmoji && (
                                <div className="absolute bottom-14 right-16 z-50">
                                    <EmojiPicker
                                        onEmojiClick={(emojiData) => {
                                            setCommentText((prev) => prev + emojiData.emoji);
                                            setShowEmoji(false);
                                        }}
                                        theme={isDark ? "dark" : "light"}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}


            {/* TO SHOW COMMENTS */}
            {!postDetails.isCommentDisabled &&
                showComments &&
                postDetails.comments.length > 0 && (
                    <Comments
                        isDark={isDark}
                        comments={postDetails.comments}
                    />
                )}


            {/* TO SHOW LIKES */}
            {!postDetails.isLikeDisabled && showLikes && (
                <Likes
                    isDark={isDark}
                    likes={postDetails.likes}
                    setShowLikes={setShowLikes}
                />
            )}



        </div>
    );
}

export default Post;
