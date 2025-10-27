<template>
  <div class="background-container xl:background-container">
    <HeaderComponent />
    <UApp>
      <NuxtPage />
    </UApp>
  </div>
</template>
<script setup lang="ts"></script>

<style>
.background-container {
  background-image: url("/images/phone.jpg");
  background-size: cover;
}

@media (min-width: 600px) {
  .xl\:background-container {
    background-image: none !important;

    background-color: var(--ui-color-neutral-900);
  }
}
</style>
