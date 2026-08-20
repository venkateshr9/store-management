import { useState } from "react";

import {
    Box,
    Card,
    CardContent,
} from "@mui/material";

import usePermissions from "../../../hooks/usePermissions";

import PermissionToolbar from "../../../components/security/permissions/PermissionToolbar";

import PermissionTable from "../../../components/security/permissions/PermissionTable";

import PermissionDialog from "../../../components/security/permissions/PermissionDialog";

import PermissionDeleteDialog from "../../../components/security/permissions/PermissionDeleteDialog";

export default function PermissionList() {

    const {

    	permissions,

    	loading,

    	refresh,

    	createPermission,

    	updatePermission,

    	deletePermission,

    } = usePermissions();

    const [search, setSearch] = useState("");

    const [module, setModule] = useState("");

    const [dialogOpen, setDialogOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [selectedPermission, setSelectedPermission] = useState(null);
	
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
    
    const openCreateDialog = () => {
    	setSelectedPermission(null);
    	setDialogOpen(true);
    };

    const openEditDialog = (permission) => {
    	setSelectedPermission(permission);
    	setDialogOpen(true);
    };

    const openViewDialog = (permission) => {
    	// For now View uses the same dialog.
    	setSelectedPermission(permission);
    	setDialogOpen(true);
    };

    const closeDialog = () => {
    	setDialogOpen(false);
    	setSelectedPermission(null);
    };

    const openDeleteDialog = (permission) => {
    	setSelectedPermission(permission);
    	setDeleteOpen(true);
    };

    const closeDeleteDialog = () => {
    	setDeleteOpen(false);
    	setSelectedPermission(null);
    };

    const handleSave = async (data) => {


    try {

        if (selectedPermission) {

            await updatePermission(
                selectedPermission.id,
                data
            );

        } else {

            await createPermission(data);

        }

        closeDialog();

        await refresh();

    } catch (error) {



        console.error(error);

    }

};
/*    const handleSave = async (data) => {

    try {

        if (selectedPermission) {

            await updatePermission(
                selectedPermission.id,
                data
            );

        } else {

            await createPermission(data);

        }

        closeDialog();

        await refresh();

    } catch (error) {

        console.error(error);

    }

}; */

const handleDelete = async () => {

    if (!selectedPermission) {
        return;
    }

    try {

        await deletePermission(
            selectedPermission.id
        );

        closeDeleteDialog();

        await refresh();

    } catch (error) {

        console.error(error);

    }

};
    return (

        <Box>

            <Card>

                <CardContent>

                    <PermissionToolbar

                        search={search}
                        setSearch={setSearch}

                        module={module}
                        setModule={setModule}

                        modules={modules}

                        onRefresh={refresh}

                        onAdd={openCreateDialog}

                    />

                    <PermissionTable

                        permissions={filtered}

                        loading={loading}

			onView={openViewDialog}

			onEdit={openEditDialog}

			onDelete={openDeleteDialog}

                    />
	            <PermissionDialog
    			open={dialogOpen}
    			mode={selectedPermission ? "edit" : "create"}
    			permission={selectedPermission}
    			loading={loading}
    			onClose={closeDialog}
    			onSave={handleSave}
		   />

		   <PermissionDeleteDialog
    			open={deleteOpen}
    			permission={selectedPermission}
    			loading={loading}
    			onClose={closeDeleteDialog}
    			onConfirm={handleDelete}
                   />

                </CardContent>

            </Card>

        </Box>

    );

}
