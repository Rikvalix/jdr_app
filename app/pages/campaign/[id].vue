<script lang="ts" setup>
import type CampaignModel from "~/models/CampaignModel";
import type UserModel from "~/models/UserModel";
import useUserStore from "~/stores/UserStore";

// Variables
const campaignStore = useCampaignStore();
const userStore = useUserStore();
const route = useRoute();
const campaign = ref<CampaignModel | null>();
const gameMaster = ref<UserModel | null>();
// Computed
const campaignId = computed(() => {
  const id = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  return parseInt(id === undefined ? "0" : id);
});

// onMounted
onMounted(async () => {
  campaign.value = await campaignStore.getCampaignById(campaignId.value);
  // Chercher le game master
  if (campaign.value != null) {
    gameMaster.value = await userStore.getUserById(
      campaign.value?.game_master_id
    );
  }
});
</script>

<template>
  <UContainer class="h-svh">
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-primary">
          {{ campaign?.name }}
        </h2>
      </template>
      <template #default>
        <p>{{ campaign?.description }}</p>
      </template>
      <template #footer> 
        <p>Game master: <span class="text-primary">{{ gameMaster?.name }}</span> </p>
        <p>Nombre de joueurs: <span class="text-primary">{{  }}</span></p>
      </template>
    </UCard>

    <UCard class="mt-2">
         <template #header>
        <h2 class="text-xl font-semibold text-primary">
            Progression
        </h2>
      </template>
      <template #default>
        En travaux...
      </template>
    </UCard>
  </UContainer>
</template>
