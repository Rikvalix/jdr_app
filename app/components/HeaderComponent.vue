<script setup lang="ts">
import useUserStore from "~/stores/UserStore";

const colorMode = useColorMode();
const userStore = useUserStore();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>

<template>
  <div class="pt-4 pl-2 pr-2 mb-4 flex justify-between">
    <NuxtLink to="/">
      <h3 class="text-2xl font-bold">
        Taverne du <span class="text-primary">JDR</span>
      </h3>
    </NuxtLink>

    <div class="flex gap-4">
      <ClientOnly v-if="!colorMode?.forced">
        <UButton
          :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
          variant="outline"
          class="px-4 py-2"
          size="xl"
          :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
          @click="isDark = !isDark"
        />
      </ClientOnly>

      <UButton
        v-if="userStore.isLogin()"
        icon="i-lucide-user"
        variant="outline"
        to="/profile"
        class="px-4 py-2"
        size="xl"
      />
      <UButton
        v-if="userStore.isLogin()"
        icon="i-lucide-lock-keyhole"
        variant="outline"
        to="/admin"
        class="px-4 py-2"
        size="xl"
      />
    </div>
  </div>
</template>

<style scoped></style>
