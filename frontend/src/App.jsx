import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import SignIn from "./pages/SignIn"
import LandingPage from "./pages/LandingPage"
import Home from "./pages/Home"
import ProjectedRoute from "./pages/ProjectedRoute"
import Profile from "./pages/Profile"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchUser } from "./features/userSlice"


function App() {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);
  return (
    <div className="bg-gray-900 h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={
            <ProjectedRoute>
              <Home />
            </ProjectedRoute>
          } />

          <Route path="/profile" element={
            <ProjectedRoute>
              <Profile />
            </ProjectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
