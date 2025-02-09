export default defineNuxtRouteMiddleware((to, from) => {
	const userStore = useAuthStore();

	if (!userStore.isAuthenticated && to.path !== "/auth/sign-in") {
		return navigateTo("/auth/sign-in");
	}
});
