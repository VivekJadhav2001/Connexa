import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import ProjectedRoute from "./pages/ProjectedRoute";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./features/userSlice";
import { ToastContainer } from "react-toastify";
import { fetchAllPosts } from "./features/postSlice";
import AdminHome from "./admin/AdminHome";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AdminProtectedRoutes from "./routes/AdminProtectedRoutes";

function App() {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchAllPosts());
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode, dispatch]);
  return (
    <div className="mtdr bg-gray-900 h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoutes>
                <AdminHome />
              </AdminProtectedRoutes> 
            }
          />
          <Route
            path="/home"
            element={
              <ProjectedRoute>
                <Home />
              </ProjectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProjectedRoute>
                <Profile />
              </ProjectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
