import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import AuthContext from "./AuthContext";

export default function PrivateRoute() {

    const { authenticated, loading } =
        useContext(AuthContext);

    if (loading) {
        return null;
    }

    if (!authenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
}
