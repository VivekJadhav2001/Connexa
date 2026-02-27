import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuggestedUsers } from "../features/suggestedUsersSlice";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const users = [
    {
        id: 1, profilePicture: "https://assets.lummi.ai/assets/Qmc9pP5jchF5hKRDsxSRbfbBV1AzeMzXuqGgEeXN7n11aK?auto=format&w=1500", firstName: "Sai", lastName: "Sirir", userName: "saisiri"
    },
    { id: 2, profilePicture: "https://assets.lummi.ai/assets/Qmc9pP5jchF5hKRDsxSRbfbBV1AzeMzXuqGgEeXN7n11aK?auto=format&w=1500", firstName: "Sai", lastName: "Sirir", userName: "saisiri" },
    {
        id: 3,
        profilePicture: "https://assets.lummi.ai/assets/Qmc9pP5jchF5hKRDsxSRbfbBV1AzeMzXuqGgEeXN7n11aK?auto=format&w=1500", firstName: "Sai", lastName: "Sirir", userName: "soro"
    },
    { id: 4, profilePicture: "https://assets.lummi.ai/assets/Qmc9pP5jchF5hKRDsxSRbfbBV1AzeMzXuqGgEeXN7n11aK?auto=format&w=1500", firstName: "Sai", lastName: "Sirir", userName: "lax" },
    { id: 5, profilePicture: "https://assets.lummi.ai/assets/Qmc9pP5jchF5hKRDsxSRbfbBV1AzeMzXuqGgEeXN7n11aK?auto=format&w=1500", firstName: "Sai", lastName: "Sirir", userName: "saiiaiai" },
    { id: 6, profilePicture: "https://assets.lummi.ai/assets/Qmc9pP5jchF5hKRDsxSRbfbBV1AzeMzXuqGgEeXN7n11aK?auto=format&w=1500", firstName: "Sai", lastName: "Sirir", userName: "Sdio" },]

export function SuggestedUsers() {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useState({});
    const currentUserId = useSelector((state) => state.user.currentUser?._id);
    const [followingIds, setFollowingIds] = useState(new Set());
    const [loadingFollowId, setLoadingFollowId] = useState(null);

    const suggestedPeople = useSelector((state)=>state.suggestedUsers.users)

    console.log(suggestedPeople,"PEOPLE")

    useEffect(() => {
        dispatch(fetchSuggestedUsers());
    }, [dispatch]);

    const handleFollowUser = async (userId) => {
        try {
            setLoadingFollowId(userId);
            await api.post(`/user/follow/${userId}`);
            setFollowingIds((prev) => new Set([...prev, userId]));
            toast.success("User followed!");
        } catch (error) {
            console.error("Error following user:", error);
            toast.error("Failed to follow user");
        } finally {
            setLoadingFollowId(null);
        }
    };

    const handleViewProfile = (userId) => {
        if (userId === currentUserId) {
            navigate("/profile");
        } else {
            navigate(`/profile/${userId}`);
        }
    };

    if (loading && users.length === 0) {
        return (
            <div className="bg-gray-900 rounded-xl p-4">
                <h2 className="font-bold text-lg mb-4">Suggested Users</h2>
                <div className="text-center text-gray-400 py-4">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900 rounded-xl p-4">
                <h2 className="font-bold text-lg mb-4">Suggested Users</h2>
                <div className="text-center text-gray-500 text-sm py-4">
                    Failed to load users
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 rounded-xl p-4">
  <h2 className="font-bold text-lg mb-4">Suggested Users</h2>

  {users && users.length > 0 ? (
    <div className="space-y-3">
      {suggestedPeople?.map((user) => (
        <div
          key={user._id}
          className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          {/* Left Section */}
          <div
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
            onClick={() => handleViewProfile(user._id)}
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden shrink-0">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.firstName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-sm">
                  {user.firstName?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            {/* Name + Username */}
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate text-white">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-xs text-gray-400 truncate">
                @{user.userName}
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <button
            onClick={() => handleFollowUser(user._id)}
            disabled={
              loadingFollowId === user._id || followingIds.has(user._id)
            }
            className={`px-3 py-1 rounded-full text-sm font-semibold transition whitespace-nowrap ml-2
              ${
                followingIds.has(user._id)
                  ? "bg-gray-700 text-gray-300 cursor-default"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }
              ${loadingFollowId === user._id ? "opacity-70" : ""}`}
          >
            {loadingFollowId === user._id
              ? "..."
              : followingIds.has(user._id)
              ? "Following"
              : "Follow"}
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center text-gray-500 text-sm py-4">
      No suggested users at this time
    </div>
  )}
</div>
    );
}
