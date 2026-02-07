import { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import api from "../utils/api";

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
    <path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2" />
  </svg>
);

export default function UpdateProfilePictureModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Handle image pick
  const handleImagePick = (e) => {
    const selected = e.target.files[0];
    if (!selected || !selected.type.startsWith("image/")) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  //  NEW: Remove profile picture from backend
  async function removeProfilePicture() {
    try {
      setLoading(true);

      await api.delete("/user/remove/profile-picture");

      // reset local state
      setFile(null);
      setPreview(null);

      onClose();
    } catch (err) {
      console.error("Remove profile picture failed", err);
    }

    setLoading(false);
  }

  async function uploadProfilePicture() {
    try {
      setLoading(true);

      console.log(file, "File to upload");

      // Get signed URL
      const res = await api.post("/user/profile-picture/upload-url", {
        fileName: file.name,
        fileType: file.type,
      });

      const { uploadUrl, publicUrl } = res.data;

      // Upload to S3
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
          "Content-Disposition": "inline",
        },
      });

      // Save URL in DB
      await api.put("/user/profile-picture", {
        profilePicture: publicUrl,
      });

      onClose();
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.error("Profile picture upload failed", err);
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-start z-50">
      <div className="bg-black w-[400px] rounded-xl mt-24 p-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Update Profile Picture</h3>
          <IoClose size={22} className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Upload */}
        <div className="flex items-center gap-3 mt-3">
          <input
            type="file"
            accept="image/*"
            id="profileUpload"
            className="hidden"
            onChange={handleImagePick}
          />

          <label
            htmlFor="profileUpload"
            className="cursor-pointer text-blue-400 hover:text-blue-500"
          >
            <ImageIcon />
          </label>

          <span className="text-sm text-gray-400">
            Choose profile picture
          </span>
        </div>

        {/* Preview */}
        {preview && (
          <div className="mt-4 relative w-32 h-32 mx-auto">
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 rounded-full object-cover"
            />

            <button
              onClick={removeImage}
              className="absolute top-1 right-1 bg-black/70 rounded-full p-1"
            >
              <IoClose size={14} />
            </button>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 space-y-2">
          <button
            disabled={!file || loading}
            onClick={uploadProfilePicture}
            className={`w-full py-2 rounded-full font-semibold transition
              ${
                !file
                  ? "bg-blue-500/40 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {loading ? "Uploading..." : "Update"}
          </button>

          {/*Remove Button */}
          <button
            disabled={loading}
            onClick={removeProfilePicture}
            className="w-full py-2 rounded-full font-semibold border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition"
          >
            Remove Profile Picture
          </button>
        </div>
      </div>
    </div>
  );
}
