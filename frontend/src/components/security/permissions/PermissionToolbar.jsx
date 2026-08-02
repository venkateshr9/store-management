import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

export default function PermissionToolbar({

    search,
    setSearch,

    module,
    setModule,

    modules = [],

    onRefresh,

    onAdd,

}) {

    return (

        <Box
            display="flex"
            gap={2}
            mb={2}
        >

            <TextField
                label="Search"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
                fullWidth
            />

            <FormControl sx={{ minWidth: 220 }}>

                <InputLabel>
                    Module
                </InputLabel>

                <Select
                    value={module}
                    label="Module"
                    onChange={(e) =>
                        setModule(e.target.value)
                    }
                >

                    <MenuItem value="">
                        All
                    </MenuItem>

                    {modules.map((m) => (

                        <MenuItem
                            key={m}
                            value={m}
                        >
                            {m}
                        </MenuItem>

                    ))}

                </Select>

            </FormControl>

            <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={onRefresh}
            >
                Refresh
            </Button>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={onAdd}
            >
                Add Permission
            </Button>

        </Box>

    );

}
