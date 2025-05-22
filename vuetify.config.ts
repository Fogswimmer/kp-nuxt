// vuetify.config.ts
import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";
import { usePreferredDark } from "@vueuse/core";
let defaultTheme = "light";
if (import.meta.client) {
  const prefersDark = usePreferredDark();
  defaultTheme = prefersDark.value ? "dark" : "light";
}

export default defineVuetifyConfiguration({
  labComponents: true,
  defaults: {
    VTextField: {
      variant: "filled",
    },
    VSelect: {
      variant: "filled",
    },
    VCombobox: {
      variant: "filled",
    },
    VSheet: {
      border: true,
    },
    VExpansionPanels: {
      border: true,
    },
  },
  theme: {
    defaultTheme: defaultTheme,
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#ffffff",
        },
      },
      dark: {
        dark: true,
        colors: {
          background: "#000000",
          surface: "#08141b",
          primary: "#ffae00",
        },
      },
    },
  },
});
