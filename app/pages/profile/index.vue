<script setup lang="ts">
import { storeToRefs } from "pinia";
import useUserStore from "~/stores/UserStore";
import useCharacterStore from "~/stores/CharacterStore";
import type { CharacterListItem } from "~/models/characters/CharacterListItem";
import type CampaignModel from "~/models/CampaignModel";
import useCampaignStore from "~/stores/CampaignStore";

// Variables
const userStore = useUserStore();
const campaignStore = useCampaignStore();
const characterStore = useCharacterStore();
const user = storeToRefs(userStore).currentUser;
const characters = ref<CharacterListItem[]>([]);
const loading = ref(false);
const campaigns = ref<CampaignModel[] | null>([]);

onMounted(async () => {
  if (user.value != null) {
    loading.value = true;
    characters.value = await characterStore.getAllCharacterForUser(
      user.value.id
    );
    campaigns.value = await campaignStore.getCampaignsByUserId(user.value.id);
    loading.value = false;
  }
});
</script>

<template>
  <head>
    <title>Profile</title>
  </head>
  <UContainer class="flex flex-col gap-4 h-svh">
    <h1 class="text-2xl font-bold">
      Bienvenue <span class="text-primary">{{ user?.name }}</span>
    </h1>
    <UCard>
      <template #header>
        <h4 class="text-lg font-medium mb-3 text-gray-500 dark:text-gray-400">
          Vos campagnes en courts :
        </h4>
        <ul
          :class="[
            'grid gap-3',
            campaigns && campaigns.length > 0
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1',
          ]"
        >
          <li v-for="campaign in campaigns" :key="campaign.id">
            <UCard class="p- transition-all duration-300 group">
              <NuxtLink :to="`/campaign/${campaign.id}`" class="block w-full">
                <div class="flex items-center justify-between">
                  <span
                    class="text-md font-medium truncate group-hover:text-primary"
                  >
                    {{ campaign.name }}
                  </span>
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-5 h-5 group-hover:text-primary transition-colors"
                  />
                </div>
              </NuxtLink>
            </UCard>
          </li>

          <li v-if="!campaigns || campaigns.length === 0" class="col-span-full">
            <UAlert
              icon="i-lucide-scroll-text"
              title="Aucune campagne trouvé"
              description="Créez votre première campagne pour commencer l 'aventure !"
              variant="soft"
            />
          </li>
        </ul>
      </template>
    </UCard>
    <UCard>
      <template #header>
        <div class="mt-4">
          <h4 class="text-lg font-medium mb-3 text-gray-500 dark:text-gray-400">
            Personnages existants :
          </h4>

          <ul
            :class="[
              'grid gap-3',
              characters && characters.length > 0
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1',
            ]"
          >
            <li v-for="character in characters" :key="character.id">
              <UCard class="p- transition-all duration-300 group">
                <NuxtLink
                  :to="`/profile/characters/${character.id}`"
                  class="block w-full"
                >
                  <div class="flex items-center justify-between">
                    <span
                      class="text-md font-medium truncate group-hover:text-primary"
                    >
                      {{ character.name }}
                    </span>
                    <UIcon
                      name="i-lucide-arrow-right"
                      class="w-5 h-5 group-hover:text-primary transition-colors"
                    />
                  </div>
                  <p
                    v-if="character.campaigns"
                    class="text-sm dark:text-gray-400 mt-1"
                  >
                    Campagne : {{ character.campaigns }}
                  </p>
                </NuxtLink>
              </UCard>
            </li>

            <li
              v-if="!characters || characters.length === 0"
              class="col-span-full"
            >
              <UAlert
                icon="i-lucide-scroll-text"
                title="Aucun personnage trouvé"
                description="Créez votre première fiche pour commencer l'aventure !"
                variant="soft"
              />
            </li>
          </ul>
          <UButton
            to="/profile/characters/add"
            variant="outline"
            class="mt-4"
            icon="i-lucide-plus"
            >Ajouter un personnage</UButton
          >
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

<style scoped></style>
