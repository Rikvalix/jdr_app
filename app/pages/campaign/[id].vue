<script lang="ts" setup>
import type CampaignModel from "~/models/CampaignModel";
import type CharacterModel from "~/models/characters/CharacterModel";
import type UserModel from "~/models/UserModel";
import useCampaignStore from "~/stores/CampaignStore";
import useCharacterStore from "~/stores/CharacterStore";
import useUserStore from "~/stores/UserStore";

// Variables
const campaignStore = useCampaignStore();
const userStore = useUserStore();
const characterStore = useCharacterStore();
const route = useRoute();
const campaign = ref<CampaignModel | null>();
const gameMaster = ref<UserModel | null>();
const charactersCampaigns = ref<CharacterModel[] | []>();

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
      campaign.value.game_master_id
    );
    charactersCampaigns.value =
      await characterStore.getAllCharacterByCampaignId(campaign.value.id);
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
        <p>
          Game master: <span class="text-primary">{{ gameMaster?.name }}</span>
        </p>
        <p>
          Nombre de joueurs:
          <span class="text-primary">{{ charactersCampaigns?.length }}</span>
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
            v-for="character in charactersCampaigns"
            :to="`/profile/characters/${character.id}`"
            :key="character.id"
            class="p-1 border rounded-lg border-accented"
            orientation="vertical"
            :name="character.name"
            :description="character.classe"
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
