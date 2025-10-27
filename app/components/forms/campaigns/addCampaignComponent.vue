<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import * as v from "valibot";
import type CampaignModel from "~/models/CampaignModel";
import useUserStore from "~/stores/UserStore";

type Schema = v.InferOutput<typeof campaignSchema>;

// Variables
const campaignStore = useCampaignStore();
const userStore = useUserStore();
const toast = useToast();
const users = storeToRefs(userStore).users;
const currentUser = storeToRefs(userStore).user;
const campaignSchema = v.object({
  name: v.pipe(v.string(), v.minLength(2)),
  description: v.pipe(v.string(), v.minLength(2)),
  game_master_id: v.number(),
});

const campaignModel = ref<Partial<CampaignModel>>({
  name: "",
  description: "",
  game_master_id: currentUser.value.id,
});

// Computed
const usersOptions = computed(() =>
  users.value.map((user) => ({
    label: user.name,
    value: user.id,
  }))
);

// Fonctions
async function onCampaignFormSubmit(event: FormSubmitEvent<Schema>) {
  console.log("envoi");
  toast.add({
    title: "Envoi",
    description: "Envoi du formulaire",
    color: "primary",
  });
  const result = await campaignStore.addCampaign(event.data);
  if (result) {
    toast.add({
      title: "Succès",
      description: "Succès de l'ajout de la campagne",
      color: "success",
    });
  } else {
    toast.add({
      title: "Erreur",
      description: "Erreur dans l'ajout de la campagne",
      color: "error",
    });
  }
}
</script>

<template>
  <UCard>
    <UForm
      class="space-y-4"
      @submit="onCampaignFormSubmit"
      :schema="campaignSchema"
      :state="campaignModel"
    >
      <UFormField label="Nom" name="name">
        <UInput
          v-model="campaignModel.name"
          placeholder="Nom de votre campagne"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Description" name="description">
        <UTextarea
          v-model="campaignModel.description"
          placeholder="Description de la campagne  "
          class="w-full"
        />
      </UFormField>
      <UFormField label="Game master" name="game_master">
        <USelect
          v-model="campaignModel.game_master_id"
          :items="usersOptions"
          value-attribute="id"
          option-attribute="name"
          placeholder="Game master"
          class="w-full"
        />
      </UFormField>

      <UButton icon="i-lucide-rocket" size="lg" type="submit">
        Ajouter
      </UButton>
    </UForm>
  </UCard>
</template>

<style></style>
