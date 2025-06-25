export default defineNuxtRouteMiddleware(async (to) => {
    const token = to.params.token.toString();
    const { validateToken } = useAuthStore();

    if (!token || typeof token !== "string") {
        return navigateTo("/auth/password-reset/invalid");
    }

    const isTokenValid = await validateToken(token);
    console.log(isTokenValid);
    return isTokenValid || navigateTo("/auth/password-reset/invalid");
});
