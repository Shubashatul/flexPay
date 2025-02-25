import { Navigate } from "react-router-dom";

// This is a protected route that checks if the user is authenticated
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("authToken");

  // If the token doesn't exist, redirect to Signin
  if (!token) {
    return <Navigate to="/Signin" replace />;
  }

  return children; // If there's a token, render the protected route
};

export default ProtectedRoute;
