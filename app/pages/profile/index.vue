<script setup lang="ts">
import { storeToRefs } from "pinia";
import useUserStore from "~/stores/UserStore";
import useCharacterStore from "~/stores/CharacterStore";
import type { CharacterListItem } from "~/models/characters/CharacterListItem";

// Variables
const userStore = useUserStore();
const characterStore = useCharacterStore();
const user = storeToRefs(userStore).user;
const characters = ref<CharacterListItem[]>([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  characters.value = await characterStore.getAllCharacterForUser(user.value.id);
  loading.value = false;
});
</script>

<template>
  <head>
    <title>Profile</title>
  </head>
  <UContainer class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">
      Bienvenue <span class="text-primary">{{ user.name }}</span>
    </h1>
    <UCard>
      <template #header>
        <h3>Vos campagnes en cours</h3>
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
              <UCard class="p-4 transition-all duration-300 group">
                <NuxtLink
                  :to="`/profile/characters/${character.id}`"
                  class="block w-full"
                >
                  <div class="flex items-center justify-between">
                    <span
                      class="text-lg font-medium truncate group-hover:text-primary"
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
        </div>
      </template>
    </UCard>
  </UContainer>
</template>

<style scoped></style>
