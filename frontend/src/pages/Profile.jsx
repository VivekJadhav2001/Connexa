import { FaArrowLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getJoinedDate } from "../constants";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();
  const getAllPosts = useSelector((state) => state.posts.posts);
  console.log(getAllPosts);
  const userData = useSelector((state) => state.user.currentUser);
  // console.log(userData, "User Data in profile");
  const JoinedDate = userData?.createdAt
    ? getJoinedDate(userData.createdAt)
    : "";

  return (
    <div className="border-x border-gray-800 min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 sticky top-0 bg-black/80 backdrop-blur z-10 border-b border-gray-800">
        {/* Home / Back */}
        <button
          onClick={() => navigate("/home")}
          className="hover:bg-gray-900 p-2 rounded-full transition"
        >
          <FaArrowLeft size={20} />
        </button>

        <div>
          <h2 className="font-bold text-lg leading-none">
            {userData?.fullName}
          </h2>
          <p className="text-xs text-gray-400">4 posts</p>
        </div>
      </div>

      {/* Cover */}
      <div className="h-52 bg-linear-to-r from-gray-700 to-gray-800">
        <img className="h-full" src="https://njvawavweamzvvakmsgn.supabase.co/storage/v1/object/public/accioconnect/Blue%20White%20Aesthetic%20Welcome%20to%20My%20Profile%20Twitter%20Header.png" alt="sai" />
      </div>

      {/* Profile Section */}
      <div className="px-4 relative">
        {/* Avatar */}

        {userData?.profilePicture ? (
          <img
            src={userData?.profilePicture}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-black shadow-lg absolute -top-16 bg-gray-900"
          />
        ) : (
          <img
            src="/avatar.png"
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-black shadow-lg absolute -top-16 bg-gray-900"
          />
        )}
        <img
          src="/avatar.png"
          alt="profile"
          className="w-32 h-32 rounded-full border-4 border-black shadow-lg absolute -top-16 bg-gray-900"
        />

        {/* Edit Button */}
        <div className="flex gap-2 justify-end mt-4">
          <button className="border border-gray-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-900 transition cursor-pointer">
            Edit profile
          </button>
          {userData?.subscriptionPlan === "free" && (
            <button className="border border-gray-600 px-4 py-1.5 rounded-full text-sm bg-amber-400 text-black  font-semibold hover:bg-amber-500 transition cursor-pointer">
              Switch to Pro
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-14 space-y-3">
          <div>
            <h1 className="text-xl font-bold">{userData?.fullName}</h1>
            <div className=" flex gap-2 items-center mt-2">
              <p className="text-gray-400 text-sm">{userData?.userName}</p> |
              <p className="text-gray-400 text-sm">{userData?.email}</p>
            </div>
          </div>

          {/* <p className="text-sm leading-relaxed text-gray-200 max-w-md">
                        A Passionate & Self-taught Frontend developer from India.
                    </p> */}

          <div className="flex gap-4 text-gray-400 text-sm">
            <span>📍 {userData?.centerLocation}</span>
            <span>📅 Joined {JoinedDate}</span>
            {userData?.roleType === "student" ? (
              <span className="flex gap-1.5 items-center justify-center">
                <PiStudentBold size={22} /> Student
              </span>
            ) : (
              <span className="flex gap-1.5 items-center justify-center">
                <FaChalkboardTeacher size={22} /> Instructor
              </span>
            )}
            <span>{userData?.courseType}</span>
          </div>

          <div className="flex gap-6 text-sm">
            <span>
              <b className="text-white">193</b>{" "}
              <span className="text-gray-400">Connected</span>
            </span>
            <span>
              <b className="text-white">2</b>{" "}
              <span className="text-gray-400">Connections</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between mt-6 border-b border-gray-800 text-sm">
        {["Posts", "Replies", "Highlights", "Media", "Likes"].map((tab, i) => (
          <button
            key={tab}
            className={`py-3 w-full text-center hover:bg-gray-900 transition
              ${i === 0
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-400"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="p-6 text-gray-500 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {getAllPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-600"
            >
              <div className="flex items-center p-2">
                <img
                  src={post.author.profilePicture}
                  alt={post.author.firstName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-white font-semibold">
                  {post.author.firstName}
                </span>
              </div>

              <img
                src={post.content}
                alt={post.caption}
                className="w-full h-120 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
