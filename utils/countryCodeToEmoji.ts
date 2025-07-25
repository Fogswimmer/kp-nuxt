export default (countryCode: string) => {
	if (!countryCode) return "";
	return countryCode
		.toUpperCase()
		.replace(/./g, (char: string) =>
			String.fromCodePoint(127397 + char.charCodeAt(0)),
		);
};
