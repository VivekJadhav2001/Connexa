import { useState } from "react";
import { timeAgo } from "../constants";

function Comments({ isDark, comments = [] }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);


  return (
    <div
      className={`px-6 py-2 border-t
        ${isDark ? "border-white/10 bg-[#141414]" : "border-gray-100 bg-white"}
      `}
    >
      {comments.map((item, index) => (
        <div key={index} className="flex gap-3 py-3 relative">
          {/* Avatar */}
          <img
            src={item.profilePic || "https://i.pravatar.cc/40"}
            alt={item.userName}
            className="w-9 h-9 rounded-full object-cover"
          />

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {item.userName}
                  </span>
                  <span
                    className={`text-xs ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    • {timeAgo(item.createdAt)}
                  </span>
                </div>

                <p
                  className={`text-sm mt-1 ${
                    isDark ? "text-gray-300" : "text-gray-800"
                  }`}
                >
                  {item.comment}
                </p>
              </div>

              {/* MENU */}
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenuIndex(
                      openMenuIndex === index ? null : index
                    )
                  }
                  className="font-bold cursor-pointer px-2"
                >
                  ⋮
                </button>

                {openMenuIndex === index && (
                  <div
                    className={`absolute right-0 mt-2 w-32 rounded-lg shadow-lg text-sm z-50
                      ${
                        isDark
                          ? "bg-[#1f1f1f] text-gray-200 border border-white/10"
                          : "bg-white text-gray-800 border border-gray-200"
                      }
                    `}
                  >
                    <button className="block w-full text-left px-4 py-2 hover:bg-black/10">
                      Edit
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-red-500 hover:bg-black/10">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div
              className={`flex gap-4 text-xs mt-1 cursor-pointer
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              <span className="hover:underline">Like</span>
              <span className="hover:underline">Reply</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
