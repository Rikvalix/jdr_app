<script setup lang="ts"></script>

<template>
  <div class="pt-4 pl-2 pr-2 mb-4 flex justify-between">
    <NuxtLink to="/">
      <h3 class="text-2xl font-bold">Taverne du <span class="text-primary">JDR</span></h3>
    </NuxtLink>

    <div class="flex gap-4">
      <UButton
        icon="i-lucide-user"
        variant="outline"
        to="/profile"
        class="px-4 py-2"
        size="xl"
      />
      <UButton
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
