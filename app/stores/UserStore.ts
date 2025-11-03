import type UserModel from "~/models/UserModel";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

const useUserStore = defineStore(
  "user",
  () => {
    const currentUser = ref<UserModel | null>(null);
    const users = ref<UserModel[]>([]);

    const isLogin = computed(() => !!currentUser.value?.id);

    async function getAllUsers() {
      const response = await $fetch("/api/players");

      if (response == undefined) {
        return;
      }

      users.value = response.data;
    }

    async function getUserById(id: number) : Promise<UserModel | null> {

      const response = await $fetch(`/api/players/${id}`);

      if (response == undefined) {
        return null;
      }

      return response.data as UserModel;
    }

    function setCurrentUser(user: UserModel) {
      currentUser.value = user;
    }

    return {
      currentUser,
      users,
      isLogin,
      getAllUsers,
      getUserById,
      setCurrentUser,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.sessionStorage(),
    },
  }
);

export default useUserStore;
