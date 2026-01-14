export function FeedHeader() {
  return (
    <div className="sticky top-0 bg-black/80 backdrop-blur border-b border-gray-800">
      <div className="flex">
        <button className="flex-1 py-4 hover:bg-gray-900">For you</button>
        <button className="flex-1 py-4 hover:bg-gray-900">Following</button>
      </div>
    </div>
  );
}
