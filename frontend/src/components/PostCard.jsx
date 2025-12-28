

function PostCard({ post }) {
  return (
    <div className="border rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">
              {post.name} <span className="text-gray-500">• You</span>
            </p>
            <p className="text-xs text-gray-500">{post.time}</p>
          </div>
        </div>
        <button className="text-xl">⋯</button>
      </div>

      {/* Content */}
      <p className="mt-3 text-sm text-gray-800 leading-relaxed">
        <span className="font-bold">{post.caption}</span> {post.content}
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>👍 {post.reactions}</span>
        <div className="flex gap-6">
          <span>💬</span>
          <span>🔁</span> 
          <span>✈️</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard