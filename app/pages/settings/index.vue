<script lang="ts" setup>
import AddClassesComponent from "~/components/forms/characters/class/AddClassesComponent.vue";
import type { FormModalsProps } from "~/models/FormModalModel";
import useCharacterStore from "~/stores/CharacterStore";

const characterStore = useCharacterStore();
const shortClasses = storeToRefs(characterStore).shortClasses;

const addClassFormProps = ref<FormModalsProps>({
  show: false,
});

onMounted(async () => {
  await characterStore.getAllClass();
});
</script>
<template>
  <UContainer class="h-svh">
    <UCard>
      <template #header>
        <h2 class="text-primary font-bold">Classes</h2>
      </template>
      <template #default>
        <ul>
          <li
            v-for="shortClass in shortClasses"
            :key="shortClass.id"
            class="text-toned"
          >
            <div class="flex justify-between mt-2">
              {{ shortClass.name }}
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
      </template>
      <template #footer>
        <UButton
          label="Ajouter une classe"
          variant="outline"
          icon="i-lucide-plus"
          @click="() => {addClassFormProps.show = !addClassFormProps.show} "
        />
      </template>
    </UCard>

  <AddClassesComponent v-if="addClassFormProps.show" />
  </UContainer>

</template>

<style></style>
