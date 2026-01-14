export function WhatsHappening() {
  return (
    <div className="p-4 border-b border-gray-800">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-gray-700 rounded-full" />
        <textarea
          placeholder="What's happening?"
          className="flex-1 text-2xl bg-transparent outline-none resize-none"
        />
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex gap-3 text-blue-500">
          <ImageIcon /> 🖼️ 📝
        </div>
        <button className="bg-blue-500 px-5 py-2 rounded-full font-semibold">
          Post
        </button>
      </div>
    </div>
  );
}

const ImageIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill={"currentColor"}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M5 21h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2m0-2v-1.59l3-3 1.29 1.29c.39.39 1.02.39 1.41 0l5.29-5.29 3 3V19h-14ZM19 5v5.59L16.71 8.3a.996.996 0 0 0-1.41 0l-5.29 5.29-1.29-1.29a.996.996 0 0 0-1.41 0l-2.29 2.29V5h14Z"></path>
    <path d="M8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"></path>
  </svg>
);
