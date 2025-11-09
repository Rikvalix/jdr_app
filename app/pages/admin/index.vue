<script setup lang="ts">

const {data: usersData, pending : usersPending} = await useFetch('/api/players')
const {data: campaignsData, pending: campaignsPending} = await useFetch('/api/campaigns')

</script>

<template>
  <head>
    <title>Dashboard</title>
  </head>
  <UContainer class="h-svh">
    <h1 class="text-3xl font-bold text-primary">
       Dashboard
    </h1>
    <div class="mt-4">
      <UCard class="mb-4">
        <template #header>
          <h3 class="font-semibold">Gestion des utilisateurs</h3>
        </template>
        <template #default>
          <div v-if="usersPending" class="grid gap-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[200px]" />
          </div>
          <div v-else-if="usersData?.data.length === 0">
            <p>Aucun utilisateur trouvé.</p>
          </div>
          <div v-else>
            <ul>
              <li v-for="user in usersData?.data">
                <div class="flex justify-between mt-2">
                  {{ user.name }}
                  <div class="flex gap-2">
                    <UButton variant="outline" icon="i-lucide-user" />
                    <UButton
                      variant="outline"
                      color="secondary"
                      icon="i-lucide-edit-2"
                    />
                    <UButton
                      variant="outline"
                      color="error"
                      icon="i-lucide-trash"
                    />
                  </div>
                </div>
              </li>
            </ul>
            <USeparator class="my-4" />
            <span class="mt-2"
              >Total utilisateurs :
              <span class="font-bold">{{ usersData?.data.length }}</span></span
            >
          </div>
        </template>
        <template #footer>
          <UButton variant="outline" color="primary">
            Ajouter un utilisateur
          </UButton>
        </template>
      </UCard>
      <UCard>
        <template #header>
          <h3 class="font-semibold">Gestion des campagnes</h3>
        </template>
        <template #default>
          <div v-if="campaignsPending" class="grid gap-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[200px]" />
          </div>
          <div v-else-if="campaignsData?.data.length === 0">
            <p>Aucune campagne(s) trouvé(es).</p>
          </div>
          <ul v-else>
            <li v-for="campaign in campaignsData?.data">
              <div class="flex justify-between mt-2">
                <NuxtLink
                  class="text-secondary"
                  :to="`/campaign/${campaign.id}`"
                >
                  {{ campaign.name }}
                </NuxtLink>

                <div class="flex gap-2">
                  <UButton
                    variant="outline"
                    color="secondary"
                    icon="i-lucide-edit-2"
                  />
                  <UButton
                    variant="outline"
                    color="error"
                    icon="i-lucide-trash"
                  />
                </div>
              </div>
            </li>
          </ul>
        </template>
        <template #footer>
          <UButton variant="outline" color="primary" to="/campaign/add">
            Ajouter une campagne
          </UButton>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>

<style scoped></style>
