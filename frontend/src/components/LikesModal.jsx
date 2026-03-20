import React from 'react'

function LikesModal({ likes, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-4 rounded-xl w-[320px] max-h-[400px] overflow-y-auto">
        <h2 className="text-white mb-3 font-semibold">Likes</h2>

        {likes.length === 0 ? (
          <p className="text-gray-400 text-sm">No likes yet</p>
        ) : (
          likes.map((like) => (
            <div key={like._id} className="flex items-center gap-3 mb-3">
              <img
                src={like.user.profilePicture || "/default-avatar.png"}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-300 text-sm">
                {like.user.firstName} {like.user.lastName}
              </span>
            </div>
          ))
        )}

        <button
          onClick={onClose}
          className="mt-3 text-sm text-gray-400 hover:text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LikesModal