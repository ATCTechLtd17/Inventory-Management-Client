import { useContext} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoginContext } from "../LoginContext/LoginContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(LoginContext);
  const location=useLocation();
  

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
    // return <Navigate to="/login" replace />;
  }

  return children; // Render the protected component
};

export default PrivateRoute;
