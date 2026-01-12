import { useState, useRef, useEffect } from "react";
import {
    FaUserPlus,
    FaVolumeMute,
    FaBan,
    FaFlag,
    FaLink,
    FaChartBar,
    FaRegSadTear,
    FaEdit,
    FaTrash
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../features/postSlice";

export default function PostMenu({ postDetails }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    const currentUserId = useSelector(
        (state) => state.user.currentUser._id
    );
    const dispatch = useDispatch()

    const isOwner = currentUserId === postDetails.author._id;

    function deletePostById(postId) {
        dispatch(deletePost(postId));
        setOpen(false);
    }


    // Close menu on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="relative " ref={menuRef}>

            {/* Three Dots Button */}
            <button
                onClick={() => setOpen(!open)}
                className="text-gray-400 hover:bg-gray-800 p-2 rounded-full"
            >
                ⋯
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 top-10 w-64 bg-black border border-gray-800 rounded-xl shadow-xl z-50 overflow-hidden">

                    {isOwner ? (
                        <>
                            <MenuItem icon={<FaEdit />} text="Edit post" />
                            <button onClick={() => deletePostById(postDetails._id)}>
                                <MenuItem icon={<FaTrash />} text="Delete post" danger />
                            </button>
                        </>
                    ) : (
                        <>
                            <MenuItem icon={<FaRegSadTear />} text="Not interested in this post" />
                            <MenuItem icon={<FaUserPlus />} text="Follow user" />
                            <MenuItem icon={<FaLink />} text="Add/remove from Lists" />
                            <MenuItem icon={<FaVolumeMute />} text="Mute user" />
                            <MenuItem icon={<FaBan />} text="Block user" />
                            <MenuItem icon={<FaChartBar />} text="View post engagements" />
                            <MenuItem icon={<FaLink />} text="Embed post" />
                            <MenuItem icon={<FaFlag />} text="Report post" />
                        </>
                    )}

                </div>
            )}
        </div>
    );
}

function MenuItem({ icon, text, danger }) {
    return (
        <div
            className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer 
      ${danger ? "text-red-500 hover:bg-red-950" : "text-gray-200 hover:bg-gray-900"}`}
        >
            {icon}
            <span>{text}</span>
        </div>
    );
}
