import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [checkingAuth, setCheckingAuth] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if there's a logged-in user
      setCheckingAuth(false); // Auth check complete
    });
    return unsubscribe; // Cleanup listener on component unmount
  }, []);

  if (checkingAuth) {
    return null; // Optionally render a loading spinner here
  }

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
