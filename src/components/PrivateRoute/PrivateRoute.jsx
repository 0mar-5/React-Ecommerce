import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isLoggedIn = userData?.isLoggedIn;
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
