import ru_messages from "./locales/ru-RU";
import en_messages from "./locales/en-US";
import fr_messages from "./locales/fr-FR";
import { en, fr, ru } from "vuetify/locale";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ru",
  messages: {
    en: {
      $vuetify: {
        ...en,
      },
      ...en_messages,
    },

    fr: {
      $vuetify: {
        ...fr,
      },
      ...fr_messages,
    },

    ru: {
      $vuetify: {
        ...ru,
      },
      ...ru_messages,
    },
  },
}));
