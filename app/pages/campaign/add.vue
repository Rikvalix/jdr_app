<template>
  <UContainer class="h-svh">
    <h2 class="text-xl font-semibold">Ajouter une campagne</h2>

    <div class="mt-4">
      <AddCampaignComponent />
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import AddCampaignComponent from "~/components/forms/campaigns/addCampaignComponent.vue";
</script>
