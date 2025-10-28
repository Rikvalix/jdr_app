import { da } from "@nuxt/ui/runtime/locale/index.js";
import useSupabase from "~/composables/supabaseClient";
import type UserModel from "~/models/UserModel";

const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as UserModel,
    users: [] as UserModel[],
  }),

  actions: {
    async getAllUsers() {
      if (this.users.length != 0) {
        return;
      }

      const result = await useSupabase().from("players").select("*");

      if (result.error) {
        console.error(result.error);
      }
      this.users = result.data as UserModel[];
    },

    async getUserById(id: number) {
      const { data, error } = await useSupabase()
        .from("players")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        return null;
      }
      return data;
    },

    setCurrentUser(user: UserModel) {
      this.user = user;
    },

    getCurrentUser() {
      return this.user;
    },

    isLogin() : boolean {
      return this.user.id != null
    }
  },
});

export default useUserStore;
