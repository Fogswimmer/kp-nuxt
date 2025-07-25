import { useI18n } from "vue-i18n";

export const useValidation = () => {
	const { t } = useI18n();
	const regExps = {
		email: /\S[^\s@]*@\S+\.\S+/,
		typeNum: /^\d+$/,
		letters: /^[a-z\s]+$/i,
		latinAndCyrillicLetters: /^[\wа-яА-Я&.\s-]+$/,
		password: /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{8,}$/i,
		url: /https?:\/\/(www\.)?[-\w@:%.~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-\w()@:%+.~#?&/=]*)/,
		latinChars: /^[a-z\s\d]+$/i,
	};
	const required = (value: string) =>
		value ? true : t("forms.rules.required");
	const requiredMinOneOption = (value: string) =>
		value.length > 0 ? true : t("forms.rules.required");
	const email = (value: string) =>
		regExps.email.test(value) ? true : t("forms.rules.invalid_email");
	const onlyNums = (value: string) =>
		regExps.typeNum.test(value) ? true : t("forms.rules.type_num");
	const onlyLetters = (value: string) =>
		regExps.latinAndCyrillicLetters.test(value)
			? true
			: t("forms.rules.only_letters");
	const minLength = (min: number) => (value: string) =>
		value.length >= min ? true : t("forms.rules.min_chars", { min });
	const maxLength = (max: number) => (value: string) =>
		value.length <= max ? true : t("forms.rules.max_chars", { max });
	const minYear = (year: number) => (value: string) =>
		new Date(value).getFullYear() >= year
			? true
			: t("forms.rules.min_year", { year });
	const maxYear = (year: number) => (value: string) =>
		new Date(value).getFullYear() <= year
			? true
			: t("forms.rules.max_year", { year });
	const onlyLatinChars = (value: string) =>
		regExps.latinChars.test(value)
			? true
			: t("forms.rules.only_latin_chars");
	const minBirthday = (date: number) => (value: string) =>
		new Date(value).getFullYear() >= date
			? true
			: t("forms.rules.min_birthday", { date });
	const maxBirthday = (date: number) => (value: string) =>
		new Date(value).getFullYear() <= date
			? true
			: t("forms.rules.min_birthday", { date });
	const validUrl = (value: string) =>
		regExps.url.test(value) ? true : t("forms.rules.invalid_url");
	const password = (value: string) =>
		regExps.password.test(value) ? true : t("forms.rules.invalid_password");
	const maxUploadSize = (size: number) => (value: File) =>
		value.size <= size ? true : t("forms.rules.max_file_size", { size });

	return {
		required,
		requiredMinOneOption,
		onlyNums,
		onlyLetters,
		email,
		minLength,
		maxLength,
		minYear,
		maxYear,
		onlyLatinChars,
		minBirthday,
		maxBirthday,
		validUrl,
		password,
		maxUploadSize,
	};
};
