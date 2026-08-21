import React from "react";
import ReactDOM from "react-dom/client";

import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";

import AuthProvider from "./auth/AuthProvider";

import {
  ThemeSettingsProvider,
  useThemeSettings,
} from "./theme/ThemeSettingsContext";

import baseTheme from "./theme/theme";

function DynamicThemeProvider({ children }) {
  const { mode, density } = useThemeSettings();

  const theme = React.useMemo(() => {
    const isDark = mode === "dark";

    return createTheme({
      ...baseTheme,

      palette: {
        ...baseTheme.palette,

        mode,

        background: {
          default: isDark ? "#101828" : "#F5F7FA",
          paper: isDark ? "#182230" : "#FFFFFF",
        },

        text: {
          primary: isDark ? "#F9FAFB" : "#172033",
          secondary: isDark ? "#98A2B3" : "#667085",
          disabled: isDark ? "#667085" : "#98A2B3",
        },

        divider: isDark ? "#344054" : "#E4E7EC",
      },

      components: {
        ...baseTheme.components,

        /*
         * Global page background
         */
        MuiCssBaseline: {
          ...baseTheme.components?.MuiCssBaseline,

          styleOverrides: {
            ...baseTheme.components?.MuiCssBaseline?.styleOverrides,

            html: {
              backgroundColor: isDark
                ? "#101828"
                : "#F5F7FA",
            },

            body: {
              backgroundColor: isDark
                ? "#101828"
                : "#F5F7FA",

              color: isDark
                ? "#F9FAFB"
                : "#172033",
            },

            "#root": {
              minHeight: "100vh",
              backgroundColor: isDark
                ? "#101828"
                : "#F5F7FA",
            },
          },
        },

        /*
         * Sidebar
         */
        MuiDrawer: {
          ...baseTheme.components?.MuiDrawer,

          styleOverrides: {
            ...baseTheme.components?.MuiDrawer
              ?.styleOverrides,

            paper: {
              ...baseTheme.components?.MuiDrawer
                ?.styleOverrides?.paper,

              backgroundColor: isDark
                ? "#111C2D"
                : "#FFFFFF",

              color: isDark
                ? "#F9FAFB"
                : "#172033",

              borderRight: isDark
                ? "1px solid #344054"
                : "1px solid #E4E7EC",
            },
          },
        },

        /*
         * Cards
         */
        MuiCard: {
          ...baseTheme.components?.MuiCard,

          styleOverrides: {
            ...baseTheme.components?.MuiCard
              ?.styleOverrides,

            root: {
              ...baseTheme.components?.MuiCard
                ?.styleOverrides?.root,

              backgroundColor: isDark
                ? "#182230"
                : "#FFFFFF",

              color: isDark
                ? "#F9FAFB"
                : "#172033",

              borderColor: isDark
                ? "#344054"
                : "#EAECF0",
            },
          },
        },

        /*
         * Paper
         */
        MuiPaper: {
          ...baseTheme.components?.MuiPaper,

          styleOverrides: {
            ...baseTheme.components?.MuiPaper
              ?.styleOverrides,

            root: {
              ...baseTheme.components?.MuiPaper
                ?.styleOverrides?.root,

              backgroundColor: isDark
                ? "#182230"
                : "#FFFFFF",

              color: isDark
                ? "#F9FAFB"
                : "#172033",
            },
          },
        },

        /*
         * Menus
         */
        MuiMenu: {
          ...baseTheme.components?.MuiMenu,

          styleOverrides: {
            ...baseTheme.components?.MuiMenu
              ?.styleOverrides,

            paper: {
              ...baseTheme.components?.MuiMenu
                ?.styleOverrides?.paper,

              backgroundColor: isDark
                ? "#182230"
                : "#FFFFFF",

              color: isDark
                ? "#F9FAFB"
                : "#172033",

              borderColor: isDark
                ? "#344054"
                : "#EAECF0",
            },
          },
        },

        /*
         * Dialogs
         */
        MuiDialog: {
          ...baseTheme.components?.MuiDialog,

          styleOverrides: {
            ...baseTheme.components?.MuiDialog
              ?.styleOverrides,

            paper: {
              ...baseTheme.components?.MuiDialog
                ?.styleOverrides?.paper,

              backgroundColor: isDark
                ? "#182230"
                : "#FFFFFF",

              color: isDark
                ? "#F9FAFB"
                : "#172033",
            },
          },
        },

        /*
         * Dialog titles
         */
        MuiDialogTitle: {
          ...baseTheme.components?.MuiDialogTitle,

          styleOverrides: {
            ...baseTheme.components?.MuiDialogTitle
              ?.styleOverrides,

            root: {
              ...baseTheme.components?.MuiDialogTitle
                ?.styleOverrides?.root,

              color: isDark
                ? "#F9FAFB"
                : "#172033",
            },
          },
        },

        /*
         * Inputs
         */
        MuiOutlinedInput: {
          ...baseTheme.components?.MuiOutlinedInput,

          styleOverrides: {
            ...baseTheme.components?.MuiOutlinedInput
              ?.styleOverrides,

            root: {
              ...baseTheme.components?.MuiOutlinedInput
                ?.styleOverrides?.root,

              backgroundColor: isDark
                ? "#182230"
                : "#FFFFFF",

              color: isDark
                ? "#F9FAFB"
                : "#172033",

              "& fieldset": {
                borderColor: isDark
                  ? "#475467"
                  : "#D0D5DD",
              },

              "&:hover fieldset": {
                borderColor: isDark
                  ? "#667085"
                  : "#98A2B3",
              },

              "&.Mui-focused fieldset": {
                borderColor: "#1E3A5F",
              },
            },

            input: {
              ...baseTheme.components?.MuiOutlinedInput
                ?.styleOverrides?.input,

              color: isDark
                ? "#F9FAFB"
                : "#172033",
            },
          },
        },

        /*
         * Select dropdown
         */
        MuiSelect: {
          ...baseTheme.components?.MuiSelect,

          styleOverrides: {
            ...baseTheme.components?.MuiSelect
              ?.styleOverrides,

            select: {
              ...baseTheme.components?.MuiSelect
                ?.styleOverrides?.select,

              color: isDark
                ? "#F9FAFB"
                : "#172033",
            },
          },
        },

        /*
         * DataGrid
         *
         * IMPORTANT:
         * We intentionally DO NOT change the column header.
         *
         * This preserves:
         * - Dark blue header
         * - White text
         * - Bold headers
         * - Center alignment
         * - Existing borders
         */
        MuiDataGrid: {
          ...baseTheme.components?.MuiDataGrid,

          styleOverrides: {
            ...baseTheme.components?.MuiDataGrid
              ?.styleOverrides,

            root: {
              ...baseTheme.components?.MuiDataGrid
                ?.styleOverrides?.root,

              backgroundColor: isDark
                ? "#182230"
                : "#FFFFFF",

              color: isDark
                ? "#F9FAFB"
                : "#172033",

              borderColor: isDark
                ? "#475467"
                : "#D0D5DD",
            },

            cell: {
              ...baseTheme.components?.MuiDataGrid
                ?.styleOverrides?.cell,

              color: isDark
                ? "#F9FAFB"
                : "#172033",

              borderColor: isDark
                ? "#344054"
                : "#EAECF0",
            },

            row: {
              ...baseTheme.components?.MuiDataGrid
                ?.styleOverrides?.row,

              "&:hover": {
                backgroundColor: isDark
                  ? "#1D2939"
                  : "#F8FAFC",
              },
            },

            footerContainer: {
              ...baseTheme.components?.MuiDataGrid
                ?.styleOverrides?.footerContainer,

              borderColor: isDark
                ? "#344054"
                : "#D0D5DD",
            },
          },
        },
      },

      customSettings: {
        density,
      },
    });
  }, [mode, density]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <ThemeSettingsProvider>
      <DynamicThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DynamicThemeProvider>
    </ThemeSettingsProvider>
  </React.StrictMode>
);
