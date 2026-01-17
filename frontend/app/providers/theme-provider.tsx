"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ConfigProvider, ThemeConfig,theme as antdTheme } from "antd";


export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#2563EB", // Professional blue
    colorInfo: "#2563EB",
    colorSuccess: "#16A34A",
    colorWarning: "#F59E0B",
    colorError: "#DC2626",

    colorBgLayout: "#F4F6F9",
    colorBgContainer: "#FFFFFF",
    colorBgElevated: "#FFFFFF",

    colorText: "#1F2937",
    colorTextSecondary: "#6B7280",

    borderRadius: 8,
    fontSize: 14,
    controlHeight: 42,
    colorBorder: "#E5E7EB",
  },

  components: {
    // Button: {
    //   borderRadius: 8,
    //   controlHeight: 42,
    //   paddingInline: 20,
    //   fontWeight: 500,
    // },

    // Input: {
    //   borderRadius: 8,
    //   controlHeight: 42,
    //   paddingBlock: 10,
    // },

    // Select: {
    //   borderRadius: 8,
    //   controlHeight: 42,
    // },

    Table: {
      headerBg: "#F9FAFB",
      headerColor: "#111827",
      rowHoverBg: "#F1F5F9",
      borderColor: "#E5E7EB",
      fontSize: 13,
    },

    Card: {
      borderRadius: 12,
      padding: 20,
      boxShadow:
        "0 1px 2px rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.06)",
    },

    Menu: {
      itemSelectedBg: "#EEF2FF",
      itemSelectedColor: "#2563EB",
      itemHoverColor: "#2563EB",
      borderRadius: 8,
    },

    Tabs: {
      itemSelectedColor: "#2563EB",
      inkBarColor: "#2563EB",
    },
  },
};


export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#3B82F6",

    colorBgLayout: "#0F172A",
    colorBgContainer: "#020617",
    colorBgElevated: "#020617",

    colorText: "#E5E7EB",
    colorTextSecondary: "#9CA3AF",

    borderRadius: 8,
    fontSize: 14,
    controlHeight: 42,
    colorBorder: "#1E293B",
  },

  components: {
    Table: {
      headerBg: "#020617",
      rowHoverBg: "#020617",
      borderColor: "#1E293B",
    },

    Card: {
      borderRadius: 12,
      boxShadow: "0 0 0 1px #1E293B",
    },

    Menu: {
      itemSelectedBg: "#1E293B",
      itemSelectedColor: "#60A5FA",
    },
  },
};



interface ThemeContextType {
  theme: ThemeConfig;
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
  toggleDarkMode: () => void;
}

export const theme = {
  token: {
    colorPrimary: "#2588FA",          
    colorInfo: "#2588FA",
    colorSuccess: "#28A745",
    colorWarning: "#FFC107",
    colorError: "#DC3545",

    borderRadius: 6,
    fontSize: 14,
    colorBgContainer: "#ffffff",
    colorBorder: "#D9D9D9",
    controlHeight: 12,
  },

  components: {
    Button: {
      colorPrimary: "#2588FA",
      colorPrimaryHover: "#1D6FD1",
      colorPrimaryActive: "#1557A6",
      borderRadius: 6,
      controlHeight: 42,
      paddingInline: 10,
      fontWeight: 500,
    },

    // Input: {
    //   colorBorder: "#CFCFCF",
    //   activeBorderColor: "#2588FA",
    //   hoverBorderColor: "#2588FA",
    //   borderRadius: 6,
    //   controlHeight: 12,
    //   paddingBlock: 10,
    // },

    // Select: {
    //   colorBorder: "#CFCFCF",
    //   activeBorderColor: "#2588FA",
    //   hoverBorderColor: "#2588FA",
    //   borderRadius: 6,
    //   controlHeight: 12,
    // },

    Table: {
      headerBg: "#F5F8FF",
      headerColor: "#1E1E1E",
      borderColor: "#E6E6E6",
      rowHoverBg: "#F0F7FF",
      padding: 12,
    },

    Card: {
      borderRadius: 10,
      padding: 20,
      boxShadow:
        "0 2px 6px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
    },

    Menu: {
      itemSelectedBg: "#E8F2FF",
      itemSelectedColor: "#2588FA",
      itemHoverColor: "#2588FA",
      borderRadius: 6,
    },

    Tabs: {
      itemSelectedColor: "#2588FA",
      itemHoverColor: "#2588FA",
      inkBarColor: "#2588FA",
    },
  },
};

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
//   toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};



export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
 const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
     <ThemeContext.Provider value={{mode }}>
      <ConfigProvider >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
