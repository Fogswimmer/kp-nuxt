import { usePreferredDark } from "@vueuse/core";

export const useDefaultTheme = () => {
  let defaultTheme = "light";
  if (import.meta.client) {
    const prefersDark = usePreferredDark();
    defaultTheme = prefersDark.value ? "dark" : "light";
  }
  return ref(defaultTheme);
};
