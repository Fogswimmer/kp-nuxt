export const useDeclineAge = (age: number) => {
	const { locale, t } = useI18n();
	return ref(
		locale.value === "ru"
			? declineInRussian(age || 0, ["год", "года", "лет"])
			: age + " " + t("general.years_old") || "",
	);
};
