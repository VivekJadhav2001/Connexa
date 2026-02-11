import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SuggestedUsers } from "./SuggestedUsers";

export function RightSidebar() {
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <div className="p-4 space-y-4 max-h-screen overflow-y-auto">
      {/* Search Bar */}
      <form className="relative">
        <input
          type="text"
          placeholder="Search users, posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 px-4 py-2 pl-10 rounded-full outline-none focus:bg-gray-700 text-sm transition"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
      </form>

      {/* What's happening section */}
      <div className="bg-gray-900 rounded-xl p-4">
        <h2 className="font-bold text-lg mb-3">What's happening</h2>
        <div className="space-y-4">
          <div className="hover:bg-gray-800 p-2 rounded cursor-pointer transition">
            <div className="text-xs text-gray-400 font-semibold">Tech · Trending</div>
            <div className="font-bold text-sm">React 19 Released</div>
            <div className="text-xs text-gray-500 mt-1">125K posts</div>
          </div>
          <div className="hover:bg-gray-800 p-2 rounded cursor-pointer transition border-t border-gray-800 pt-4">
            <div className="text-xs text-gray-400 font-semibold">Technology · Trending</div>
            <div className="font-bold text-sm">Web Development</div>
            <div className="text-xs text-gray-500 mt-1">89K posts</div>
          </div>
        </div>
      </div>

      {/* Suggested Users */}
      <SuggestedUsers />
    </div>
  );
}
