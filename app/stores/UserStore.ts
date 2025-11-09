import type UserModel from "~/models/UserModel";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

const useUserStore = defineStore(
  "user",
  () => {
    const currentUser = ref<UserModel | null>(null);
    const users = ref<UserModel[]>([]);

    const isLogin = computed(() => !!currentUser.value?.id);

    function setAllUsers(data: UserModel[]) {
      users.value = data;
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
      setAllUsers,
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
