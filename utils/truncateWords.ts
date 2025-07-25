export default (text: string, maxLength: number = 10): string => {
	const { locale } = useI18n();
	const segmenter = new Intl.Segmenter(locale.value, {
		granularity: "grapheme",
	});
	const segments = [...segmenter.segment(text)];

	if (segments.length > maxLength) {
		return segments.slice(0, maxLength).join("") + "...";
	}
	console.log(text);
	return text;
};
