export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore()

    if (!authStore.isAuthenticated && to.path !== '/auth/sign-in') {
        return navigateTo('/auth/sign-in')
    }
})
