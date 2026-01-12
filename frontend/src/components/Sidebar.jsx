import { MdHomeFilled } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreatePostModal from "./CreatePostModal";

const icons = [
  {
    icon: <MdHomeFilled size={24} />,
    label: "Home",
  },
  {
    icon: <IoIosSearch size={24} />,
    label: "Explore",
  },
  {
    icon: <IoNotificationsOutline size={24} />,
    label: "Notifications",
  },
  {
    icon: <CiMail size={24} />,
    label: "Messages",
  },
  {
    icon: <CgProfile size={24} />,
    label: "Profile",
  },
];

export function Sidebar() {

  const [modalOpen, setModalOpen] = useState(false)

    const navigate = useNavigate()
  return (
    <>
    
    <aside className="w-64 h-screen p-4 flex flex-col justify-between fixed">
      
      {/* Top Section */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold px-3">Connexa</h1>

        {icons.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-4 text-lg font-medium hover:bg-gray-900 px-4 py-3 rounded-full cursor-pointer transition"
          >
            {item.icon}
            {item.label === "Profile" ? <span onClick={()=>navigate("/profile")}>{item.label}</span> :<span>{item.label}</span>}
          </div>
        ))}

        <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 w-full py-3 rounded-full font-semibold mt-4"
          >
            Post
          </button>
      </div>

      {/* Bottom User Menu placeholder */}
      <div className="mt-6">
        {/* UserMenu component will go here */}
      </div>

    </aside>

    <CreatePostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
