export default defineNuxtRouteMiddleware((to) => {
    if (!to.params.slug) {
        return navigateTo("/");
    }
})

