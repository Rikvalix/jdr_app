<script lang="ts" setup>
import type CampaignModel from "~/models/CampaignModel";
import type ShortCharacterModel from "~/models/characters/ShortCharacterModel";

// Variables
const route = useRoute();

// Computed
const campaignId = computed(() => {
  const id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  return parseInt(id === undefined ? "0" : id);
});

const {data: campaignData, pending: campaignPending} = await useAsyncData(
    "campaignDataById",
    async () => {
      if (!campaignId.value) {
        return Promise.reject(new Error("Campaign ID est requis"));
      }
      const response = await $fetch(`/api/campaigns?campaignId=${campaignId.value}`);
      return response?.data as CampaignModel;
    }
)

const {data: charactersData, pending: charactersPending} = await useAsyncData(
    "charactersDataByCampaignId",
    async () => {
      if (!campaignId.value) {
        return Promise.reject(new Error("Campaign ID est requis"));
      }
      const response = await $fetch(`/api/characters?campaignId=${campaignId.value}`);
      return response?.data as ShortCharacterModel[];
    }
)

</script>

<template>
  <UContainer class="h-svh">
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-primary">
          {{ campaignData?.name }}
        </h2>
      </template>
      <template #default>
        <p>{{ campaignData?.description }}</p>
      </template>
      <template #footer>
        <p>
          Game master: <span class="text-primary">{{ campaignData?.gameMaster.name }}</span>
        </p>
        <p>
          Nombre de joueurs:
          <span class="text-primary">{{ charactersData?.length }}</span>
        </p>
      </template>
    </UCard>

    <UCard class="mt-4">
      <template #header>
        <h2 class="text-xl font-semibold text-primary">Personnages</h2>
      </template>
      <template #default>
        <div class="grid grid-cols-2 gap-2">
          <UUser
            v-for="character in charactersData"
            :to="`/profile/characters/${character.id}`"
            :key="character.id"
            class="p-1 border rounded-lg border-accented"
            orientation="vertical"
            :name="character.name"

            :chip="{
              color: 'primary',
              position: 'top-right',
            }"
          />
        </div>
      </template>
    </UCard>

    <UCard class="mt-4">
      <template #header>
        <h2 class="text-xl font-semibold text-primary">Progression</h2>
      </template>
      <template #default> En travaux... </template>
    </UCard>
  </UContainer>
</template>
