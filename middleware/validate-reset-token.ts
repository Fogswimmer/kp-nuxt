export default defineNuxtRouteMiddleware(async (to) => {
  const token = to.params.token;

  if (!token || typeof token !== 'string') {
    return navigateTo('/auth/password-reset-invalid');
  }

  try {
    await $fetch(`/api/reset-password/reset/${token}`, {
      method: 'POST',
    });
  } catch (err) {
    console.warn('Token validation failed:', err);
    return navigateTo('/auth/password-reset-invalid');
  }
});
