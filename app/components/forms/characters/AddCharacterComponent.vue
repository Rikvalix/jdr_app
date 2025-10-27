<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import { storeToRefs } from "pinia";
import * as v from "valibot";
import CHARACTERS_CLASS from "~/global/characterClasse";
import type CampaignModel from "~/models/CampaignModel";
import type CharacterModel from "~/models/characters/CharacterModel";
import useCharacterStore from "~/stores/CharacterStore";
import useUserStore from "~/stores/UserStore";

const characterSchema = v.object({
  name: v.pipe(v.string(), v.minLength(3)),
  concept: v.pipe(v.string(), v.minLength(5)),
  classe: v.pipe(v.string()),
  description: v.pipe(v.string(), v.minLength(10)),
  avatar_url: v.pipe(v.string(), v.url()),

  player_id: v.number(),
  campaign_id: v.pipe(v.number()),

  force: v.pipe(v.number(), v.minValue(1)),
  dexterite: v.pipe(v.number(), v.minValue(1)),
  constitution: v.pipe(v.number(), v.minValue(1)),
  intelligence: v.pipe(v.number(), v.minValue(1)),
  sagesse: v.pipe(v.number(), v.minValue(1)),
  charisme: v.pipe(v.number(), v.minValue(1)),
});

type Schema = v.InferOutput<typeof characterSchema>;

const userStore = useUserStore();
const campaignStore = useCampaignStore();
const characterStore = useCharacterStore();
const availableCampaigns = storeToRefs(campaignStore).campaigns;
const toast = useToast();
const currentUser = storeToRefs(userStore).user;

const characterModel = ref<Partial<CharacterModel>>({
  name: "",
  concept: "",
  description: "",
  classe: "",
  avatar_url:
    "https://static.wikia.nocookie.net/leagueoflegends/images/0/08/AstroNautilus_Chroma_profileicon.png/revision/latest?cb=20200512193656",
  player_id: currentUser.value.id,
  campaign_id: undefined,
  force: 10,
  dexterite: 10,
  constitution: 10,
  intelligence: 10,
  sagesse: 10,
  charisme: 10,
});

const campaignOptions = computed(() => {
  const campaigns = availableCampaigns.value.map((c: CampaignModel) => ({
    label: c.name,
    value: c.id,
  }));
  return [{ label: "Aucune campagne (Solo)", value: 0 }, ...campaigns];
});

onMounted(async () => {
  await campaignStore.getAllCampaigns();
});

async function onCharacterFormSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Création",
    description: "Envoi du formulaire de personnage...",
    color: "primary",
  });
  const result = await characterStore.addCharacter(event.data);
  if (result) {
    toast.add({
      title: "Succès",
      description: "Personnage créé avec succès !",
      color: "success",
    });
  } else {
    toast.add({
      title: "Erreur",
      description: "Erreur dans la création de personnage",
      color: "error"
    })
  }
}
</script>

<template>
  <UCard class="space-y-6">
    <template #header>
      <h2 class="text-xl font-bold">Créer un nouveau Personnage</h2>
    </template>

    <UForm
      class="space-y-6"
      @submit="onCharacterFormSubmit"
      :schema="characterSchema"
      :state="characterModel"
    >
      <UDivider label="Détails" />

      <UFormField label="Nom du Personnage" name="name" required>
        <UInput
          v-model="characterModel.name"
          placeholder="Ex: Grog le Barbare"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Concept" name="concept">
        <UInput
          v-model="characterModel.concept"
          placeholder="Ex: Ancien garde du corps reconverti"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Classe" name="classe">
        <USelect
          v-model="characterModel.classe"
          class="w-full"
          placeholder="Votre classe de personnage"
          :items="CHARACTERS_CLASS"
        >

        </USelect>
      </UFormField>

      <UFormField label="Description Détaillée" name="description">
        <UTextarea
          v-model="characterModel.description"
          placeholder="Écrivez son histoire, sa personnalité..."
          class="w-full"
          :rows="10"
        />
      </UFormField>

      <UFormField label="URL de l'Avatar" name="avatar_url">
        <UInput
          v-model="characterModel.avatar_url"
          placeholder="https://..."
          :disabled="true"
        />
      </UFormField>

      <UDivider label="Liens & Stats" />

      <UFormField label="Campagne associée" name="campaign_id">
        <USelect
          v-model="characterModel.campaign_id"
          :items="campaignOptions"
          value-attribute="value"
          option-attribute="label"
          placeholder="Sélectionner une campagne"
        />
      </UFormField>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <UFormField label="Force (STR)" name="force">
          <UInput v-model.number="characterModel.force" type="number" min="1" />
        </UFormField>
        <UFormField label="Dextérité (DEX)" name="dexterite">
          <UInput
            v-model.number="characterModel.dexterite"
            type="number"
            min="1"
          />
        </UFormField>
        <UFormField label="Constitution (CON)" name="constitution">
          <UInput
            v-model.number="characterModel.constitution"
            type="number"
            min="1"
          />
        </UFormField>
        <UFormField label="Intelligence (INT)" name="intelligence">
          <UInput
            v-model.number="characterModel.intelligence"
            type="number"
            min="1"
          />
        </UFormField>
        <UFormField label="Sagesse (SAG)" name="sagesse">
          <UInput
            v-model.number="characterModel.sagesse"
            type="number"
            min="1"
          />
        </UFormField>
        <UFormField label="Charisme (CHA)" name="charisme">
          <UInput
            v-model.number="characterModel.charisme"
            type="number"
            min="1"
          />
        </UFormField>
      </div>

      <input
        type="hidden"
        v-model="characterModel.player_id"
        name="player_id"
      />

      <UButton icon="i-lucide-scroll" size="lg" type="submit" block>
        Créer le Personnage
      </UButton>
    </UForm>
  </UCard>
</template>
