
import { FeedHeader } from "../components/FeedHeader";
import { WhatsHappening } from "../components/WhatsHappening";
import { Post } from "../components/Post";
import { RightSidebar } from "../components/RightSidebar";
import { Sidebar } from "../components/Sidebar";
import { useSelector } from "react-redux";


export default function Home() {

  const state = useSelector((state)=>state)

  // console.log(state,"home page state")

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      {/* Layout wrapper */}
      <div className="flex w-full max-w-7xl">


        {/* Left Sidebar */}
        <aside className="w-64 hidden md:block border-r border-gray-800 sticky top-0 h-screen">
          <Sidebar />
        </aside>


        {/* Center Feed */}
        <main className="flex-1 max-w-xl border-r border-gray-800">
          <FeedHeader />
          <WhatsHappening />


          {/* Posts */}
          <div className="divide-y divide-gray-800">
            <Post />
            <Post />
            <Post />
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