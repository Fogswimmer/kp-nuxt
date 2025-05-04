// vuetify.config.ts
import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

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
      class: "glassed",
      border: true,
    },
    VExpansionPanels: {
      class: "glassed",
      border: true,
    },
    VList: {
      class: "glassed",
    },
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      dark: {
        dark: true,
        colors: {
          background: "#00000",
          surface: "#040A18",
          primary: "#ffae00",
        },
      },
    },
  },
});
