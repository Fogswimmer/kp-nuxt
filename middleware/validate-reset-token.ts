export default defineNuxtRouteMiddleware(async (to) => {
	const token = to.params.token ? to.params.token.toString() : null;
	if (!token || typeof token !== "string") {
		return navigateTo("/auth/password-reset/invalid");
	}
	const { validateToken } = useAuthStore();

	const isTokenValid = await validateToken(token);
	console.log(isTokenValid);
	return isTokenValid || navigateTo("/auth/password-reset/invalid");
});
