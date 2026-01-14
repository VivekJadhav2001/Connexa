export function RightSidebar() {
  return (
    <div className="p-4 space-y-4">
      <input
        placeholder="Search"
        className="w-full bg-gray-900 px-4 py-2 rounded-full outline-none"
      />

      <div className="bg-gray-900 rounded-xl p-4">
        <h2 className="font-bold mb-3">What's happening</h2>
        <div className="text-sm text-gray-400">Tech · Trending</div>
        <div className="font-semibold">React 19 Released</div>
      </div>
    </div>
  );
}
