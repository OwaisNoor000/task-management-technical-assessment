import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

type ProtectedRoutesProp = {
    children:React.ReactNode;
}

export default function ProtectedRoutes({children}:ProtectedRoutesProp){
    const token = useAuth();

    if(!token){
        return <Navigate to="/welcome" replace/>
    }
    
    return children
}