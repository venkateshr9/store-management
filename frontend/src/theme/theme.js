import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#1E3A5F",
      light: "#2F5D8A",
      dark: "#132A43",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#0F766E",
      light: "#14B8A6",
      dark: "#115E59",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#172033",
      secondary: "#667085",
      disabled: "#98A2B3",
    },

    divider: "#E4E7EC",

    success: {
      main: "#16A34A",
    },

    warning: {
      main: "#D97706",
    },

    error: {
      main: "#DC2626",
    },

    info: {
      main: "#2563EB",
    },
  },

  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),

    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },

    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },

    h3: {
      fontWeight: 700,
      letterSpacing: "-0.015em",
    },

    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },

    h5: {
      fontWeight: 650,
    },

    h6: {
      fontWeight: 650,
    },

    body1: {
      fontSize: "0.95rem",
    },

    body2: {
      fontSize: "0.875rem",
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  spacing: 8,

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F5F7FA",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(16, 24, 40, 0.08)",
          borderBottom: "1px solid #E4E7EC",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #E4E7EC",
          backgroundColor: "#FFFFFF",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: "1px solid #EAECF0",
          boxShadow: "0 1px 3px rgba(16, 24, 40, 0.06)",
          backgroundImage: "none",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 40,
          borderRadius: 9,
          paddingLeft: 18,
          paddingRight: 18,
          boxShadow: "none",
        },

        contained: {
          boxShadow: "none",

          "&:hover": {
            boxShadow: "0 2px 6px rgba(16, 24, 40, 0.12)",
          },
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 9,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 9,

          "& fieldset": {
            borderColor: "#D0D5DD",
          },

          "&:hover fieldset": {
            borderColor: "#98A2B3",
          },

          "&.Mui-focused fieldset": {
            borderWidth: 2,
          },
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F8FAFC",

          "& .MuiTableCell-head": {
            color: "#475467",
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "uppercase",
            letterSpacing: "0.03em",
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#EAECF0",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 7,
          fontWeight: 600,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: "0 20px 40px rgba(16, 24, 40, 0.16)",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          border: "1px solid #EAECF0",
          borderRadius: 10,
          boxShadow: "0 8px 24px rgba(16, 24, 40, 0.12)",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.75rem",
          borderRadius: 6,
        },
      },
    },
  },
});

export default theme;
