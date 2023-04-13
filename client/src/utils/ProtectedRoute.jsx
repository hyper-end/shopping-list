import { UserContext } from "./UserContext";

const { useContext } = require("react");
const { useLocation, Navigate } = require("react-router-dom");

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    
    const { user, loading } = useContext(UserContext);
    const isAuth = user && user.username;
  
    if (loading) {
      return <h1>Loading...</h1>;
    }
  
    return isAuth ? (
      <>{children}</>
    //   <Layout>{children}</Layout>
    ) : (
      <Navigate to="/" replace state={{ path: location.pathname }} />
    );
  };

  export default ProtectedRoute;