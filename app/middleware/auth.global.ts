import useUserStore from "~/stores/UserStore";

const publicPaths = ["/"];

export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore()
  
  const isUserLoggedIn = userStore.isLogin;

  const isPublicRoute = publicPaths.includes(to.path);

  if (!isUserLoggedIn && !isPublicRoute) {
    return navigateTo({
      path: "/",
      query: {
        redirectTo: to.fullPath,
      },
    });
  }

  return;
});
