<script setup lang="ts">
// Variables
import type UserModel from "~/models/UserModel";
import useUserStore from "~/stores/UserStore";

const router = useRouter();

const showProfileSelector = ref(false);
const profileSelector = ref<number | undefined>(undefined);
const userStore = useUserStore();
const users = storeToRefs(userStore).users;
const loadingUser = ref(false);

// Computed
const usersOptions = computed(() =>
  users.value.map((user) => ({
    label: user.name,
    value: user.id,
  }))
);

// Fonctions
function handleShowProfileSelector() {
  showProfileSelector.value = !showProfileSelector.value;
}

function handleProfileSelectorSubmit() {
  if (!profileSelector.value) {
    console.warn("Aucun profil n'est sélectionné.");
    return;
  }

  const selectedUser = users.value.find(
    (user) => user.id === profileSelector.value
  );

  if (selectedUser) {
    userStore.setCurrentUser(selectedUser);

    router.push("/profile");
  } else {
    console.error(
      "Erreur : Impossible de retrouver l'utilisateur sélectionné."
    );
  }
}

onMounted(async () => {
  loadingUser.value = true;
  await userStore.getAllUsers();
  loadingUser.value = false;
});
</script>

<template>
  <head>
    <title>Accueil</title>
  </head>
  <UContainer class="flex flex-col items-center justify-center h-screen">
    <div class="text-center">
      <h2 class="text-3xl font-bold">Bienvenue à la taverne du JDR</h2>
      <p>
        Donnez vie à vos héros. Créez, gérez et retrouvez vos fiches
        personnages.
      </p>

      <UButton
        @click="handleShowProfileSelector"
        variant="outline"
        class="mt-4"
      >
        Accéder à mon profil
      </UButton>
    </div>
    <UCard
      v-if="showProfileSelector"
      class="rounded-2xl shadow-md p-4 mt-4 w-full max-w-sm"
    >
      <UForm @submit="handleProfileSelectorSubmit">
        <USkeleton v-if="loadingUser" type="rect" class="w-full h-12" />
        <div v-else class="flex flex-row gap-4" >
          <USelect
            v-model="profileSelector"
            :items="usersOptions"
            value-attribute="id"
            option-attribute="name"
            placeholder="Choisis ton nom"
            class="w-full"
          />

          <UButton
            icon="i-lucide-arrow-right"
            type="submit"
            variant="outline"
            class="px-4 py-2"
            size="lg"
          />
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>

<style scoped></style>
