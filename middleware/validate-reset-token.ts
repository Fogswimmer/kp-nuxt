export default defineNuxtRouteMiddleware(async (to) => {
  const token = to.params.token;
  const { validateToken } = useAuthStore();

  if (!token || typeof token !== "string") {
    return navigateTo("/auth/password-reset/invalid");
  }

  const isTokenValid = await validateToken(token);
  return isTokenValid || navigateTo("/auth/password-reset/invalid");
});
