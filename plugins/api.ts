export default defineNuxtPlugin((nuxtApp) => {
	const authStore = useAuthStore();
	nuxtApp.provide("userStore", authStore);

	const api = $fetch.create({
		baseURL: useRuntimeConfig().public.apiBase,
		headers: {
			"Content-Type": "application/json",
		},
		onRequest({ options }) {
			options.headers = options.headers || {};
			if (authStore.token) {
				options.headers.set("Authorization", `Bearer ${authStore.token}`);
			}
		},
		async onResponseError({ response }) {
			if (response.status === 401) {
				navigateTo("/auth/sign-in");
			}
		},
	});

	return {
		provide: {
			api,
		},
	};
});
