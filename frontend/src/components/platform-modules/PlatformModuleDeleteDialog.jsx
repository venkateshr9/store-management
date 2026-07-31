import React from "react";
import ConfirmDialog from "../common/ConfirmDialog";

export default function PlatformModuleDeleteDialog({
    open,
    loading = false,
    module = null,
    onClose,
    onConfirm,
}) {
    return (
        <ConfirmDialog
            open={open}
            loading={loading}
            title="Delete Platform Module"
            message={
                module
                    ? `Are you sure you want to delete "${module.display_name || module.module_name}"? This action cannot be undone.`
                    : "Are you sure you want to delete this platform module?"
            }
            confirmText="Delete"
            confirmColor="error"
            onClose={onClose}
            onConfirm={onConfirm}
        />
    );
}
