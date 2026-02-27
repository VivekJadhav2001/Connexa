import { FeedHeader } from "../components/FeedHeader";
import { WhatsHappening } from "../components/WhatsHappening";
import Post from "../components/Post";
import { RightSidebar } from "../components/RightSidebar";
import { Sidebar } from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllPosts } from "../features/postSlice";

export default function Home() {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const userInfo = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log(allPosts,"allposts")

  useEffect(() => {
    if (isAuthenticated && (!allPosts || allPosts.length === 0)) {
      console.log("Fetching posts on Home load...");
      dispatch(fetchAllPosts());
    }
  }, [isAuthenticated, dispatch, allPosts]);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-black to-gray-950 text-white flex justify-center">
      {/* Layout wrapper */}
      <div className="flex w-full max-w-7xl">
        {/* Left Sidebar */}
        <aside className="w-64 hidden md:block border-r border-gray-800/50 sticky top-0 h-screen">
          <Sidebar />
          <div className="p-4 border-t border-gray-800/50 absolute bottom-34 left-[25%]">
            <div className="text-sm text-gray-400">Logged in as</div>
            <div className="text-lg font-semibold text-white mt-1">{userInfo?.userName}</div>
          </div>
        </aside>

        {/* Center Feed */}
        <main className="flex-1 max-w-2xl border-r border-gray-800/50">
          <FeedHeader />
          <WhatsHappening />

          {/* Posts Section */}
          <div>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-400">Loading posts...</p>
                </div>
              </div>
            ) : allPosts && allPosts.length > 0 ? (
              <div className="divide-y divide-gray-800/30">
                {allPosts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-gray-500 text-lg">No posts yet</p>
                  <p className="text-gray-600 text-sm mt-2">Follow others to see their posts</p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 hidden lg:block sticky top-0 h-screen">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}
