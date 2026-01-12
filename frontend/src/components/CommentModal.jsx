import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createComment } from "../features/postSlice.js";
import { timeAgo } from "../constants";
import api from "../utils/api.js";

export default function CommentModal({ post, onClose }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (postId) => {
    if (!text.trim()) return;

    // Call api to update comments

    try {
      const responseFromApi = await api.post(`/post/comment/${postId}`,{comment: text})

      console.log(responseFromApi,"Response fdrom comment Api")

       onClose()
      
    } catch (error) {
      console.log(error, "Error in creating error")
    }

    // Take a reducer function from redux toolkit which will update the post 

    // dispatch(
    //   createComment({
    //     postId: post._id,
    //     commentData: { comment : text }
    //   })
    // );

   
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-start z-50" >

      {/* Modal Box */}
      <div className="bg-black border border-gray-800 rounded-2xl w-full max-w-xl mt-10 p-4">

        {/* Close */}
        <div className="flex justify-between mb-4">
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        {/* Original Post Preview */}
        <div className="flex gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {post.author.firstName} {post.author.lastName}
              </span>
              <span className="text-gray-500 text-sm">
                · {timeAgo(post.createdAt)}
              </span>
            </div>

            <p className="text-gray-300 mt-1">{post.caption}</p>
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 shrink-0" />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Post your reply"
            className="w-full bg-transparent text-white outline-none resize-none text-lg"
            rows={3}
          />
        </div>

        {/* Reply Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={()=>handleSubmit(post._Id)}
            className="bg-blue-500 px-4 py-1.5 rounded-full font-semibold disabled:opacity-50"
            disabled={!text.trim()}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
