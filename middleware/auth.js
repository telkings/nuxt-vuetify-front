export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      return navigateTo("/login", { replace: true });
    }
  }
});
