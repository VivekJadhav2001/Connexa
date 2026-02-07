import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/api";

function AdminProtectedRoutes({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api.get("/admin/users/check")
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; 

  if (!authorized) return <Navigate to="/signin" replace />;

  return children;
}

export default AdminProtectedRoutes;
