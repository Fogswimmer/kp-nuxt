import { useI18n } from "vue-i18n";
export const useInternationalName = (
    originalName: string,
    internationalName: string,
) => {
    const { locale } = useI18n();
    return locale.value === "ru" ? originalName : internationalName;
};
