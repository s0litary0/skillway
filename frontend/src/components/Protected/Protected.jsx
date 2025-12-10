import { useAuth } from "../../hooks";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
    const { token, loading } = useAuth()

    console.log("Loading", loading)

    if (!token && !loading) {
        console.log("User not logged in")
        return <Navigate to="/login" />
    }
    return children
}