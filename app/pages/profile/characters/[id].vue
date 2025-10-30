<script lang="ts" setup>
import type CharacterModel from "~/models/characters/CharacterModel";
import type CampaignModel from "~/models/CampaignModel"; 
import useCharacterStore from "~/stores/CharacterStore";

const route = useRoute();
const toast = useToast();
const characterStore = useCharacterStore();
const character = ref<CharacterModel | null>(null);
const loading = ref(true);

const characterId = computed(() => {
  const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  return parseInt(id === undefined ? '0': id);
});

async function fetchCharacter() {
  loading.value = true;
  const result = await characterStore.getFullCharacterById(characterId.value);
  loading.value = false;

  if (result == null) {
    toast.add({
      title: "Erreur",
      description: "Impossible de charger les détails du personnage.",
      color: "error"
    });
    character.value = null;
    return;
  }

  character.value = result; 
}

onMounted(() => {
  if (characterId.value) {
    fetchCharacter();
  }
});
</script>

<template>
  <div class="p-4 md:p-8 max-w-7xl mx-auto  ">
    <div v-if="loading" class="flex justify-center items-center h-64">
      <UProgress animation="swing" size="xl" />
      <span class="ml-3 text-lg">Chargement de la fiche...</span>
    </div>

    <UCard v-else-if="character">
      <template #header>
        <div class="flex items-center justify-between">
            <h1 class="text-3xl font-bold flex items-center">
                <UIcon name="i-lucide-scroll" class="w-7 h-7 mr-3 text-primary" />
                {{ character.name }}
            </h1>
             <UBadge v-if="character.is_public" color="primary" variant="subtle">Public</UBadge>
        </div>
      </template>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-1 space-y-6">
            <UCard class="h-full">
                <h2 class="text-xl font-semibold mb-3">Informations Clés</h2>

                <UDivider class="my-4"/>

                <div class="mb-4">
                    <p class="text-gray-500 dark:text-gray-400">Campagne</p>
                    <NuxtLink v-if="character.campaign_id" :to="`/campaign/${character.campaign_id}`" class="text-lg text-primary hover:underline font-medium">
                        Voir la campagne
                    </NuxtLink>
                    <p v-else class="text-lg font-medium italic">Aucune (Solo)</p>
                </div>

                <div class="mb-4">
                    <p class="text-gray-500 dark:text-gray-400">Concept</p>
                    <p class="text-lg font-medium">{{ character.concept || 'Non défini' }}</p>
                </div>
            </UCard>
        </div>

        <div class="lg:col-span-2 space-y-6">
            <UCard>
                <h2 class="text-xl font-semibold mb-3">Description et Histoire</h2>
                <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">{{ character.description || 'Ce personnage n\'a pas encore de description détaillée.' }}</p>
            </UCard>
            
            <UCard>
                <h2 class="text-xl font-semibold mb-3">Inventaire 🎒</h2>
                <div v-if="character.inventory">
                    <pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto">{{ character.inventory }}</pre>
                </div>
                <p v-else class="italic text-gray-500">L'inventaire est vide.</p>
            </UCard>
        </div>

        <UCard class="lg:col-span-3">
            <h2 class="text-xl font-semibold mb-4">Statistiques de Base</h2>
            <div class="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <p class="text-2xl font-bold">{{ character.force }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Force</p>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <p class="text-2xl font-bold">{{ character.dexterite }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Dextérité</p>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <p class="text-2xl font-bold">{{ character.constitution }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Constitution</p>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <p class="text-2xl font-bold">{{ character.intelligence }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Intelligence</p>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <p class="text-2xl font-bold">{{ character.sagesse }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Sagesse</p>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                    <p class="text-2xl font-bold">{{ character.charisme }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Charisme</p>
                </div>
            </div>
        </UCard>

      </div>
      
      <template #footer>
        <p class="text-xs text-gray-500 dark:text-gray-400">Créé le : {{ character.created_at ? new Date(character.created_at).toLocaleDateString() : 'N/D' }}</p>
      </template>

    </UCard>
    
    <div v-else class="flex flex-col items-center p-12">
        <h2 class="text-2xl text-red-500 mb-4">Personnage Non Trouvé</h2>
        <p class="text-lg mb-6">L'identifiant {{ characterId }} ne correspond à aucun personnage existant ou vous n'avez pas les permissions.</p>
        <UButton to="/profile/characters" icon="i-lucide-arrow-left">Retour à la liste</UButton>
    </div>
  </div>
</template>