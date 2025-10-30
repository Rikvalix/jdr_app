<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import useUserStore from "~/stores/UserStore";

const colorMode = useColorMode();
const userStore = useUserStore();
const dropdownItems = ref<DropdownMenuItem[]>([
  [ 
    {
      label: 'Profil',
      icon: 'i-lucide-user',
      to: '/profile'
    },
    {
      label: 'Admin',
      icon: 'i-lucide-lock-keyhole',
      to: '/admin'
    },
    {
      label: 'Paramètres',
      icon: 'i-lucide-cog',
      to: '/settings'
    }
  ]
])

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

    <div class="flex gap-4 items-center">
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

      <div v-if="userStore.isLogin()" class="hidden md:flex gap-4">
        <UButton
          icon="i-lucide-user"
          variant="outline"
          to="/profile"
          class="px-4 py-2"
          size="xl"
          aria-label="Profil"
        />
        <UButton
          icon="i-lucide-lock-keyhole"
          variant="outline"
          to="/admin"
          class="px-4 py-2"
          size="xl"
          aria-label="Admin"
        />
        <UButton
          icon="i-lucide-cog"
          variant="outline"
          to="/settings"
          class="px-4 py-2"
          size="xl"
          aria-label="Paramètres"
        />
      </div>

      <UDropdownMenu
        v-if="userStore.isLogin()"
        :items="dropdownItems"
        :popper="{ placement: 'bottom' }"
        class="md:hidden"
      >
        <UButton
          icon="i-lucide-menu"
          variant="outline"
          class="px-4 py-2"
          size="xl"
          aria-label="Ouvrir le menu"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>

<style scoped></style>
