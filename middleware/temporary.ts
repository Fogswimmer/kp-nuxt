export default defineNuxtRouteMiddleware((to) => {
  if (to.path !== "/auth/password-reset" && to.name !== "passwordReset") {
    return navigateTo("/auth/sign-in");
  }
});
