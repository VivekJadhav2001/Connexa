import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralPost from "../components/GeneralPost";
import ReferalPost from "../components/ReferalPost";
import CreatePostModal from "../components/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import { postServices } from "../services/postServices";
import Post from "../components/Post";

function Home() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";
  const navigate = useNavigate();

  // Modal state
  const [open, setOpen] = useState(false);

  // Posts state
  const [allPosts, setAllPosts] = useState([]);
  const [isReferalVisible, setIsReferalVisible] = useState(false);
  const [referalPosts, setReferalPosts] = useState([]);


  // Fetch all posts
  async function getAllPosts() {
    try {
      const res = await postServices.getAllPosts();
      const posts = res.data.data;
      const filteredReferalPosts = posts.filter((p) => p.type === "referral-post");

      setAllPosts(posts);
      setReferalPosts(filteredReferalPosts);
    } catch (error) {
      console.log("ERROR IN GET ALL POSTS:", error);
    }
  }


  useEffect(() => {
    getAllPosts();
  }, [])

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-[#f5f7fb] text-black"}`}>

      {/* TOP NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white flex items-center justify-between px-8 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-blue-600 font-bold text-xl">N</span>
          <span className="font-semibold text-gray-900 text-lg">NaukriSetu</span>
        </div>

        <div className="flex-1 mx-10">
          <div className="relative">
            <input
              placeholder="Search"
              className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 outline-none text-sm"
            />
            <span className="absolute left-4 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Toggle */}
          <div
            onClick={() => dispatch(toggleTheme())}
            className={`w-12 h-6 rounded-full flex items-center px-1 cursor-pointer ${isDark ? "bg-blue-600" : "bg-gray-300"}`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transition ${isDark ? "translate-x-6" : ""}`}
            />
          </div>

          {/* Clock */}
          <span className="text-xl">🕒</span>

          {/* Profile */}
          <img
            src="https://i.pravatar.cc/40?img=60"
            className="w-9 h-9 rounded-full cursor-pointer"
            onClick={() => navigate("/profile")}
          />
        </div>
      </header>

      {/* Modal */}
      <CreatePostModal
        open={open}
        onClose={() => { setOpen(false) }}

      />

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto flex gap-6 pt-20 px-6">

        {/* LEFT SIDEBAR */}
        <aside className="fixed top-21 left-6 w-60 bg-white rounded-2xl p-6 shadow-sm h-[calc(40vh-4rem)] overflow-auto">
          <ul className="space-y-6 text-gray-700 font-medium">
            <li className="flex items-center gap-3 cursor-pointer" onClick={() => setIsReferalVisible(false)}>
              📕 Feed
            </li>
            <li className="flex items-center gap-3 cursor-pointer" onClick={() => setIsReferalVisible(true)}>
              🎯 Referral Posts
            </li>
            <li
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {
                setOpen(true);
              }}
            >
              ✍️ Create Post
            </li>
            <li className="flex items-center gap-3 cursor-pointer">
              💬 Chat
            </li>
          </ul>
        </aside>

        {/* FEED */}
        <main className=" flex-1 ml-72 space-y-6">

          {/* {!isReferalVisible && allPosts.map((post) => {
            return post.type === "general-post" ? (
              <GeneralPost
                postDetails={post}
                key={post._id}
                setOpen={setOpen}
              />
            ) : (
              <ReferalPost
                postDetails={post}
                key={post._id}
                setOpen={setOpen}
              />
            )
          })} */}

          {!isReferalVisible && allPosts.map((post) => {
            return <Post postDetails={post} key={post._id} setOpen={setOpen} />
          })}

          {isReferalVisible &&
            referalPosts.map((post) => (
              <Post
                key={post._id}
                postDetails={post}
                setOpen={setOpen}
              />
            ))}

        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-80 sticky top-20 space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Recently Placed</h3>
            <div className="space-y-4">
              {[
                { name: "Mahira", role: "Software Engineer", company: "ABC Corp", time: "3h", img: 12 },
                { name: "Raj Patel", role: "Data Analyst", company: "XYZ", time: "5h", img: 22 },
                { name: "Sophia Lee", role: "Associate Designer", company: "STU", time: "2d", img: 45 },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/40?img=${p.img}`} className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{p.name}</p>
                    <p className="text-sm text-gray-500">{p.role} <br /> at {p.company}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {p.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Home;
