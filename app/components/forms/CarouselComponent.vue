<template>
  <UCarousel
    v-slot="{ item }"
    :items="items"
    :autoplay="{ delay: 4000 }"
    class="mx-auto"
  >
    <img :src="item" class="rounded-lg w-1/2" />
  </UCarousel>
</template>

<script lang="ts" setup>
const items = ["/images/home_1.jpg", "/images/home_2.jpeg"];
</script>

<style></style>
