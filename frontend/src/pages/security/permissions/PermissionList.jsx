import { useState } from "react";

import {
    Box,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

import usePermissions from "../../../hooks/usePermissions";

import PermissionToolbar from "../../../components/security/permissions/PermissionToolbar";

import PermissionTable from "../../../components/security/permissions/PermissionTable";

export default function PermissionList() {

    const {

        permissions,

        loading,

        refresh,

    } = usePermissions();

    const [search, setSearch] = useState("");

    const [module, setModule] = useState("");

    const filtered = permissions.filter((p) => {

        const matchesSearch =

            p.module
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            p.action
                .toLowerCase()
                .includes(search.toLowerCase())

            ||

            (p.description || "")
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesModule =

            module === ""

            ||

            p.module === module;

        return (

            matchesSearch

            &&

            matchesModule

        );

    });

    const modules = [

        ...new Set(

            permissions.map(
                p => p.module
            )

        ),

    ];

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={1}
            >
                Permission Management
            </Typography>

            <Typography
                color="text.secondary"
                mb={3}
            >
                Manage application permissions
            </Typography>

            <Card>

                <CardContent>

                    <PermissionToolbar

                        search={search}
                        setSearch={setSearch}

                        module={module}
                        setModule={setModule}

                        modules={modules}

                        onRefresh={refresh}

                        onAdd={() => {}}

                    />

                    <PermissionTable

                        permissions={filtered}

                        loading={loading}

                        onView={(row) =>
                            console.log(row)
                        }

                        onEdit={(row) =>
                            console.log(row)
                        }

                        onDelete={(row) =>
                            console.log(row)
                        }

                    />

                </CardContent>

            </Card>

        </Box>

    );

}
