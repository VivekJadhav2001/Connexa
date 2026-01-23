import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import api from "../utils/api";
import { createPost } from "../features/postSlice";
import axios from "axios";

/* Image Icon */
const ImageIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2m0-2v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V19h-14ZM19 5v5.59L16.71 8.3a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14Z"></path>
    <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"></path>
  </svg>
);

export default function CreatePostModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [postCategory, setPostCategory] = useState("general");
  const [content, setContent] = useState("");
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);

  const [referralDetails, setReferralDetails] = useState({
    company: "",
    jobRole: "",
    applyLink: "",
  });

  // Media State
  const [mediaFiles, setMediaFiles] = useState([]);

  if (!isOpen) return null;

  // Handle Media Pick
  const handleImagePick = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") || file.type.startsWith("video/"),
    );

    const mapped = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setMediaFiles((prev) => [...prev, ...mapped]);
  };

  // Remove Media
  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  async function uploadPost() {
  try {
    setLoading(true);

    const payload = {
      files: mediaFiles.map((m) => ({
        fileName: m.file.name,
        fileType: m.file.type,
      })),
    };

    const res = await api.post("/post/uploadFile", payload);

    const urls = res.data.urls;
    // urls now contain:
    // { uploadUrl, publicUrl, key }

    // Upload each file to S3
    for (let i = 0; i < urls.length; i++) {
      await axios.put(urls[i].uploadUrl, mediaFiles[i].file, {
        headers: {
          "Content-Type": mediaFiles[i].file.type,
          "Content-Disposition": "inline",
        },
      });
    }

    const createPost = await api.post("/post/createPost", {
      postCategory: "general",
      contentType:
        urls.length > 1 ? "carousel" : mediaFiles[0].file.type.split("/")[0],
      content: urls.map((u) => u.publicUrl),
      caption: caption,
      visibility: "public",
    });

    console.log(createPost, "Post created");

  } catch (error) {
    console.log("Upload error:", error);
  }

  setLoading(false);
}


  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-start z-50">
      <div className="bg-black w-[600px] rounded-xl mt-20 p-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <IoClose size={22} className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Text Area */}
        <textarea
          placeholder="What’s happening?"
          className="w-full bg-transparent text-lg outline-none resize-none"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Media Upload */}
        <div className="mt-3 flex items-center gap-3">
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            id="mediaUpload"
            className="hidden"
            onChange={handleImagePick}
          />

          <label
            htmlFor="mediaUpload"
            className="cursor-pointer text-blue-400 hover:text-blue-500"
          >
            <ImageIcon />
          </label>

          <span className="text-sm text-gray-400">Add images or videos</span>
        </div>

        {/* Media Preview */}
        {mediaFiles.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {mediaFiles.map((media, index) => (
              <div key={index} className="relative rounded overflow-hidden">
                {media.type === "image" ? (
                  <img
                    src={media.preview}
                    alt="preview"
                    className="w-full h-24 object-cover rounded"
                  />
                ) : (
                  <video
                    src={media.preview}
                    className="w-full h-24 object-cover rounded"
                  />
                )}

                {/* Remove Button */}
                <button
                  onClick={() => removeMedia(index)}
                  className="absolute top-1 right-1 bg-black/70 rounded-full p-1"
                >
                  <IoClose size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Category */}
        <div className="mt-4">
          <select
            value={postCategory}
            onChange={(e) => setPostCategory(e.target.value)}
            className="bg-gray-900 px-3 py-1 rounded"
          >
            <option value="general">General</option>
            <option value="project">Project</option>
            <option value="poll">Poll</option>
            <option value="referral">Referral</option>
          </select>
        </div>

        {/* Referral Fields */}
        {postCategory === "referral" && (
          <div className="mt-3 space-y-2">
            <input
              className="w-full bg-gray-900 px-3 py-2 rounded"
              placeholder="Company Name"
              onChange={(e) =>
                setReferralDetails({
                  ...referralDetails,
                  company: e.target.value,
                })
              }
            />
            <input
              className="w-full bg-gray-900 px-3 py-2 rounded"
              placeholder="Job Role"
              onChange={(e) =>
                setReferralDetails({
                  ...referralDetails,
                  jobRole: e.target.value,
                })
              }
            />
            <input
              className="w-full bg-gray-900 px-3 py-2 rounded"
              placeholder="Apply Link"
              onChange={(e) =>
                setReferralDetails({
                  ...referralDetails,
                  applyLink: e.target.value,
                })
              }
            />
          </div>
        )}

        {/* Caption */}
        <input
          className="w-full bg-gray-900 px-3 py-2 rounded mt-3"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {/* Visibility */}
        <div className="mt-3">
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="bg-gray-900 px-3 py-1 rounded"
          >
            <option value="public">Public</option>
            <option value="connections">Connections</option>
          </select>
        </div>

        <button
          className={`px-6 py-2 rounded-full font-semibold  transition
              ${
                content.trim().length === 0 && mediaFiles.length === 0
                  ? "bg-blue-500/40 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
          onClick={uploadPost}
        >
          {loading ? "Uploading ...." : "Upload"}
        </button>
      </div>
    </div>
  );
}
