import { FaRegComment, FaRegHeart, FaRetweet, FaShare } from "react-icons/fa";
import PostMenu from "./PostMenu";
import { timeAgo } from "../constants";
import CommentModal from "./CommentModal";
import { useState } from "react";

function Post({ post }) {
  const [openComment, setOpenComment] = useState(false);

  // console.log(post, "post in Post Component")
  return (
    <div className="border-b border-gray-800 p-4 hover:bg-gray-950 transition">
      {/* Top Section: Avatar + User Info */}
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center shrink-0">
          <img
            src={post?.author?.profilePicture || "/default-avatar.png"} // fallback if missing
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">
                {post.author.firstName + " " + post.author.lastName}
              </span>
              <span className="text-gray-500 text-sm">
                · {timeAgo(post.createdAt)}
              </span>
            </div>

            <PostMenu postDetails={post} />
          </div>

          {/* Text */}
          <p className="mt-1 text-gray-200">
            {post.caption.split(/(#[a-zA-Z0-9_]+)/g).map((word, i) =>
              word.startsWith("#") ? (
                <span
                  key={i}
                  className="text-blue-400 hover:underline cursor-pointer"
                >
                  {word}
                </span>
              ) : (
                word
              ),
            )}
          </p>

          {/* Image */}
          {/* Image */}
          {post.contentType === "image" && (
            <div className="mt-3 rounded-xl overflow-hidden border border-gray-800">
              <img
                src={post.content}
                alt="post"
                className="w-full object-cover max-h-[500px]"
              />
            </div>
          )}

          {/* Video */}
          {post.contentType === "video" && (
            <video
              src={post.content}
              controls
              className="w-full rounded-xl max-h-[500px]"
            />
          )}

          {/* Carousel */}
          {post.contentType === "carousel" && (
            <div className="mt-3 rounded-xl overflow-hidden border border-gray-800">
              <div className="flex overflow-x-auto scroll-smooth no-scrollbar">
                {post.content.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`post-${index}`}
                    className="w-full object-cover max-h-[500px] shrink-0"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Icons - Left Vertical */}
      <div className="mt-3 ml-14 flex gap-4 text-gray-400">
        <div
          onClick={() => setOpenComment(true)}
          className="flex items-center gap-3 hover:text-blue-400 cursor-pointer"
        >
          <FaRegComment />
          <span className="text-sm">{post.commentsCount}</span>
        </div>

        <div className="flex items-center gap-3 hover:text-red-500 cursor-pointer">
          <FaRegHeart />
          <span className="text-sm">{post.likesCount}</span>
        </div>
      </div>

      {openComment && (
        <CommentModal post={post} onClose={() => setOpenComment(false)} />
      )}
    </div>
  );
}

export default Post;
