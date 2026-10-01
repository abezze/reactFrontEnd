import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

    const { isLogged, isAdmin } = useAuth();

    if (!isLogged) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin) {
        return <Navigate to="/dash/home" replace />;
    }

    return children;
}

export default AdminRoute;