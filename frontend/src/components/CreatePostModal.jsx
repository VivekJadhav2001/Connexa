import React, { useState } from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { POST_TYPE_MAP } from "../utils/postTypeMap";
import { postServices } from "../services/postServices";


export default function CreatePostModal({ open, onClose }) {
  if (!open) return null;


  const [postType, setPostType] = useState("image-video");

  const [content, setContent] = useState("");
  const [caption, setCaption] = useState("");
  const [isLikeDisabled, setIsLikeDisabled] = useState(false);
  const [isCommentDisabled, setIsCommentDisabled] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  async function handlePost() {
    const { contentType, type } = POST_TYPE_MAP[postType];

    const payload = {
      content,
      caption,
      contentType,
      type,
      isLikeDisabled,
      isCommentDisabled,
    }

    try {
      const createdPost = await postServices.createPost(payload)
      console.log(createdPost, "CREATED POST")
      onClose();
    } catch (err) {
      console.log("POST ERROR", err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="w-[720px] rounded-xl bg-[#141414] text-white shadow-2xl border border-white/10" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Create Post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 px-5 py-4">
          <img src="https://i.pravatar.cc/40" className="h-10 w-10 rounded-full" />
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <select className="mt-1 bg-[#1f1f1f] border border-white/10 rounded-md text-xs px-2 py-1 text-gray-300">
              <option>Public</option>
              <option>Connections</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 px-5 mt-2">
          {[
            { label: "Image / Video", value: "image-video" },
            { label: "Blog", value: "blog" },
            { label: "Referral", value: "referral" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setPostType(tab.value)}
              className={`flex-1 rounded-lg py-2 text-sm border transition
                ${postType === tab.value
                  ? "bg-blue-600/20 text-blue-400 border-blue-500/30"
                  : "bg-[#1f1f1f] text-gray-400 border-white/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Caption */}
        <div className="px-5 mt-4">
          <input
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full rounded-lg bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 px-5 mt-3 relative">
          <textarea
            placeholder="What’s on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-20 resize-none rounded-lg bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
          />

          {/* Action Bar */}
          <div className="flex items-center gap-4 text-xl text-gray-400">
            <button
              onClick={() => setShowEmoji((prev) => !prev)}
              className="hover:text-white"
              type="button"
            >
              😊
            </button>
          </div>

          {/* Emoji Picker */}
          {showEmoji && (
            <div
              className="absolute bottom-16 left-5 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <EmojiPicker
                onEmojiClick={(emojiData) => {
                  setContent((prev) => prev + emojiData.emoji);
                  setShowEmoji(false)
                }}
                theme="dark"
              />
            </div>
          )}
        </div>


        {/* Upload (only for image/video) */}
        {postType === "image-video" && (
          <div className="px-5 mt-4">
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🖼️</div>
              <p className="text-sm text-gray-300">
                Drag and drop or upload image/Video
              </p>
              <input type="file" className="mt-3 text-center bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md text-sm" />
            </div>
          </div>
        )}

        {/* Options */}
        <div className="px-5 mt-4 space-y-2 text-sm text-gray-300">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isCommentDisabled}
              onChange={(e) => setIsCommentDisabled(e.target.checked)}
              className="accent-blue-600"
            />
            Disable Comments Section
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isLikeDisabled}
              onChange={(e) => setIsLikeDisabled(e.target.checked)}
              className="accent-blue-600"
            />
            Disable Like Section
          </label>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-white/10 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]"
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            className="px-5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
