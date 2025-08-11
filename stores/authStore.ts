export const useAuthStore = defineStore("authStore", () => {
	enum ERole {
		USER = "ROLE_USER",
		ADMIN = "ROLE_ADMIN",
	}
	interface ResetTokenResponse {
		token: string;
		expiresAt: string;
	}
	const baseUrl = useRuntimeConfig().public.apiBase;
	const currentUser = ref<CurrentUser | null>();
	const loading = ref(false);
	const authError = ref<Error | unknown>();
	const resetPasswordError = ref<Error | unknown>();
	const tokenCookie = useCookie("auth_token", {
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 7,
		secure: true,
	});

	const resetToken = ref<string | null | undefined>(null);
	const token = ref<string | null | undefined>(
		tokenCookie.value || null || "",
	);
	if (import.meta.server) {
		const headers = useRequestHeaders(["cookie"]);
		const cookieHeader = headers?.cookie || "";
		const match = cookieHeader.match(/auth_token=([^;]+)/);
		token.value = match ? match[1] : tokenCookie?.value;
	} else {
		token.value = tokenCookie.value;
	}
	const isAuthenticated = computed(() => {
		return !!token.value && !!currentUser.value;
	});
	const authHeaders = computed(() => {
		return {
			Authorization: `Bearer ${token.value}`,
		};
	});
	const isAdmin = computed(() => {
		return !!currentUser.value?.roles?.find((role) => role === ERole.ADMIN);
	});

	const defaultUserValues: Partial<CurrentUser> = {
		id: null,
		username: "",
		email: "",
		password: "",
		cover: "",
		displayName: "",
		avatar: "",
		age: 18,
	};
	const userForm = ref<Partial<CurrentUser>>({ ...defaultUserValues });
	const showErrorMessage = ref<boolean>(false);
	interface PasswordResetForm {
		email: string;
		newPassword: string;
	}
	const passwordResetForm = ref<PasswordResetForm>({
		email: "",
		newPassword: "",
	});

	const fetchCurrentUser = async (locale: string, force = false) => {
		if (currentUser.value && !force) {
			return currentUser.value;
		}

		try {
			loading.value = true;
			const response = await $fetch<CurrentUser>(
				`${baseUrl}/current-user?locale=${locale}`,
				{
					headers: authHeaders.value,
				},
			);
			currentUser.value = response;
		} catch (error: unknown) {
			authError.value = error;
			showErrorMessage.value = true;
		} finally {
			loading.value = false;
		}
	};

	const login = async () => {
		try {
			loading.value = true;

			const response = await $fetch<JWTResponse>(
				`${baseUrl}/login_check`,
				{
					headers: authHeaders.value,
					method: "POST",
					body: userForm.value,
				},
			);
			token.value = response?.token || null;
			tokenCookie.value = token.value;
		} catch (error: unknown) {
			authError.value = error;
			showErrorMessage.value = true;
		} finally {
			loading.value = false;
		}
	};

	const register = async () => {
		try {
			loading.value = true;
			await $fetch<CurrentUser>(`${baseUrl}/register`, {
				method: "POST",
				body: userForm.value,
			});
		} catch (error: unknown) {
			authError.value = error;
			showErrorMessage.value = true;
		} finally {
			loading.value = false;
		}
	};
	const signOut = async () => {
		try {
			loading.value = true;
			await $fetch<CurrentUser>(`${baseUrl}/logout`, {
				method: "POST",
			});
			currentUser.value = null;
			token.value = null;
		} catch (error: unknown) {
			handleError(error);
		} finally {
			loading.value = false;
		}
	};
	const uploadAvatar = async (avatar: File, id: number) => {
		try {
			loading.value = true;
			const formData = new FormData();
			formData.append("file", avatar);
			const response = await $fetch<CurrentUser>(
				`${baseUrl}/users/${id}/avatar`,
				{
					headers: authHeaders.value,
					method: "POST",
					body: formData,
				},
			);
			currentUser.value = response;
		} catch (error: unknown) {
			handleError(error);
		} finally {
			loading.value = false;
		}
	};

	const uploadCover = async (cover: File, id: number) => {
		try {
			loading.value = true;
			const formData = new FormData();
			formData.append("file", cover);
			const response = await $fetch<CurrentUser>(
				`${baseUrl}/users/${id}/cover`,
				{
					headers: authHeaders.value,
					method: "POST",
					body: formData,
				},
			);
			currentUser.value = response;
		} catch (error: unknown) {
			handleError(error);
		} finally {
			loading.value = false;
		}
	};

	const editUser = async () => {
		try {
			loading.value = true;
			const response = await $fetch<CurrentUser>(
				`${baseUrl}/current-user/edit`,
				{
					headers: authHeaders.value,
					method: "POST",
					body: userForm.value,
				},
			);
			currentUser.value = response;
		} catch (error: unknown) {
			handleError(error);
		} finally {
			loading.value = false;
		}
	};

	const resetPasswordRequest = async (locale: string): Promise<boolean> => {
		try {
			loading.value = true;
			await $fetch<ResetTokenResponse>(
				`${baseUrl}/reset-password/request?locale=${locale}`,
				{
					method: "POST",
					body: {
						email: passwordResetForm.value.email,
					},
				},
			);
			loading.value = false;
			return true;
		} catch (error: unknown) {
			console.log(error);
			resetPasswordError.value = error;
			showErrorMessage.value = true;
			return false;
		} finally {
			loading.value = false;
		}
	};

	const validateToken = async (token: string) => {
		try {
			loading.value = true;
			await $fetch<ResetTokenResponse>(
				`${baseUrl}/reset-password/validate/${token}`,
				{
					method: "POST",
				},
			);
			loading.value = false;
			return true;
		} catch (error: unknown) {
			console.log(error);
			resetPasswordError.value = error;
			showErrorMessage.value = true;
			return false;
		} finally {
			loading.value = false;
		}
	};

	const sendNewPassword = async (
		token: string,
		locale: string,
	): Promise<boolean> => {
		try {
			loading.value = true;
			await $fetch<ResetTokenResponse>(
				`${baseUrl}/reset-password/${token}/new-password?locale=${locale}`,
				{
					method: "POST",
					body: {
						password: passwordResetForm.value.newPassword,
					},
				},
			);
			loading.value = false;
			return true;
		} catch (error: unknown) {
			console.log(error);
			resetPasswordError.value = error;
			showErrorMessage.value = true;
			return false;
		} finally {
			loading.value = false;
		}
	};
	const clearError = () => {
		authError.value = null;
		showErrorMessage.value = false;
	};

	return {
		currentUser,
		userForm,
		loading,
		authError,
		showErrorMessage,
		token,
		isAuthenticated,
		isAdmin,
		passwordResetForm,
		resetToken,
		validateToken,
		register,
		signOut,
		uploadAvatar,
		uploadCover,
		fetchCurrentUser,
		editUser,
		resetPasswordRequest,
		sendNewPassword,
		login,
		clearError,
	};
});
