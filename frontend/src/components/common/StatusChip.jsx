import React from "react";
import { Chip } from "@mui/material";

export default function StatusChip({ status }) {
    console.log("StatusChip received:", status, typeof status);

    const value = String(status).toLowerCase();

    let color = "default";
    let label = status;

    switch (value) {
        case "active":
            color = "success";
            label = "Active";
            break;

        case "inactive":
            color = "default";
            label = "Inactive";
            break;

        case "deleted":
            color = "error";
            label = "Deleted";
            break;

        case "draft":
            color = "warning";
            label = "Draft";
            break;

        case "disabled":
            color = "error";
            label = "Disabled";
            break;

        default:
            color = "default";
            label = status;
    }

    return (
        <Chip
            label={label}
            color={color}
            size="small"
            variant="filled"
        />
    );
}
