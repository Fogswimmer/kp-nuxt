// useInternationalName.ts
import { useI18n } from 'vue-i18n'

export const useInternationalName = () => {
    const { locale } = useI18n()

    return (original: string, international: string) =>
        locale.value === 'ru' ? original : international
}
