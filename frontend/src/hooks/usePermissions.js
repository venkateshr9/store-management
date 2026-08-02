import { useEffect, useState } from "react";

import {
    getPermissions,
} from "../services/permissionService";

export default function usePermissions() {

    const [permissions, setPermissions] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadPermissions = async () => {

        setLoading(true);

        try {
	  
	   const response = await getPermissions();

	   console.log("Permission API Response:", response.data);

	   setPermissions(response.data);


        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadPermissions();
    }, []);

    return {
        permissions,
        loading,
        refresh: loadPermissions,
    };
}
