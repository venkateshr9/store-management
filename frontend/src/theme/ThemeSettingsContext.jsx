import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

const ThemeSettingsContext = createContext(null);

const STORAGE_KEY = "storemgt_theme_settings";

const defaultSettings = {
  mode: "light",
  density: "comfortable",
};

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed = JSON.parse(stored);

      return {
        ...defaultSettings,
        ...parsed,
      };
    }
  } catch (error) {
    console.warn(
      "Unable to load theme settings:",
      error
    );
  }

  return defaultSettings;
}

export function ThemeSettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  const updateSettings = (changes) => {
    setSettings((previous) => {
      const updated = {
        ...previous,
        ...changes,
      };

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(updated)
        );
      } catch (error) {
        console.warn(
          "Unable to save theme settings:",
          error
        );
      }

      return updated;
    });
  };

  const value = useMemo(
    () => ({
      mode: settings.mode,
      density: settings.density,

      setMode: (mode) => {
        if (mode !== "light" && mode !== "dark") {
          return;
        }

        updateSettings({ mode });
      },

      setDensity: (density) => {
        if (
          density !== "comfortable" &&
          density !== "compact"
        ) {
          return;
        }

        updateSettings({ density });
      },

      resetSettings: () => {
        setSettings(defaultSettings);

        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultSettings)
          );
        } catch (error) {
          console.warn(
            "Unable to reset theme settings:",
            error
          );
        }
      },
    }),
    [settings]
  );

  return (
    <ThemeSettingsContext.Provider value={value}>
      {children}
    </ThemeSettingsContext.Provider>
  );
}

export function useThemeSettings() {
  const context = useContext(ThemeSettingsContext);

  if (!context) {
    throw new Error(
      "useThemeSettings must be used inside ThemeSettingsProvider"
    );
  }

  return context;
}
