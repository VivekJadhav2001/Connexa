export function Post() {
    return (
        <div className="p-4 hover:bg-gray-950 cursor-pointer">
            <div className="flex gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full" />
                <div>
                    <div className="font-semibold">Vivek Jadhav <span className="text-gray-400">@vivek</span></div>
                    <p className="mt-1 text-gray-200">Building Connexa 🚀</p>
                    <div className="flex justify-between mt-3 text-gray-400 max-w-xs">
                        <span>💬</span>
                        <span>❤️</span>
                        <span>🔁</span>
                        <span>📤</span>
                    </div>
                </div>
            </div>
        </div>
    );
}