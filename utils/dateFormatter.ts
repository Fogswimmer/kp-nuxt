export default function (date: string): Date | string {
	const { locale } = useI18n();
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
	} as Intl.DateTimeFormatOptions;

	return new Date(date).toLocaleDateString(locale.value, options);
}
