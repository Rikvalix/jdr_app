<script setup lang="ts"></script>

<template>
  <div class="pt-4 pl-2 pr-2 mb-4 flex justify-between">
    <UButton
      icon="i-lucide-house"
      variant="outline"
      to="/"
      class="px-4 py-2"
      size="lg"
    />

    <h3 class="text-2xl font-bold">Taverne du JDR</h3>

    <div class="flex gap-4">
      <UButton
        icon="i-lucide-user"
        variant="outline"
        to="/profile"
        class="px-4 py-2"
        size="lg"
      />
      <UButton
        icon="i-lucide-lock-keyhole"  
        variant="outline"
        to="/admin"
        class="px-4 py-2"
        size="lg"
      />
    </div>
  </div>
</template>

<style scoped></style>
