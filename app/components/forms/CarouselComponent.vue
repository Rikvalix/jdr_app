<template>
  <UCarousel
    v-slot="{ item }"
    :items="items"
    :autoplay="{ delay: 4000 }"
    class="w-full  mx-auto"
  >
    <img :src="item" class="rounded-lg" />
  </UCarousel>
</template>

<script lang="ts" setup>
const items = ["/images/home_1.jpg", "/images/home_2.jpeg"];
</script>

<style></style>
