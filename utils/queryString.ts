export default (v: unknown): string | undefined => {
	if (typeof v === "string" && v.trim() !== "") return v;
	if (Array.isArray(v) && typeof v[0] === "string" && v[0].trim() !== "")
		return v[0];
	return undefined;
};
