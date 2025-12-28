import React from "react";
import { postServices } from "../services/postServices";

function PostOptions({ isDark, post, onClose, setOpen }) {
  // console.log(post)
  const handleEdit = () => {
    setOpen(true); // open modal
    onClose();
  };

  async function deletePost(postId){
    try {
      const res = await postServices.deletePost(post._id)
      console.log(res,"POST DELETED")
    } catch (error) {
      console.log(error,"ERROR IN DELETE POST")
    }
    onClose(true)
  }

  return (
    <div className={`absolute right-0 mt-2 w-52 rounded-lg shadow-lg z-50 border ${isDark ? "bg-[#1f1f1f] text-gray-200 border-white/10" : "bg-white text-gray-800 border-gray-200"}`}>
      <Option text="✏️ Edit Post" onClick={handleEdit} />
      <div className={`my-1 border-t ${isDark ? "border-white/10" : "border-gray-200"}`} />
      <Option text="🗑️ Delete Post" danger onClick={()=>deletePost(post._id)} />
    </div>
  );
}

function Option({ text, danger, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm transition
        ${danger ? "text-red-500 hover:bg-red-500/10" : "hover:bg-black/5 dark:hover:bg-white/10"}`}
    >
      {text}
    </button>
  );
}

export default PostOptions;
