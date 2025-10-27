import useSupabase from "~/composables/supabaseClient";
import type UserModel from "~/models/UserModel";

const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as UserModel,
        users : [] as UserModel[],
    }),

    actions: {
        async getAllUsers() {
            if (this.users.length != 0){
                return;
            }
            
            const result = await useSupabase()
                .from('players')
                .select('*');

            if (result.error) {
                console.error(result.error);
            }
            this.users = result.data as UserModel[];
            
        },

        setCurrentUser(user: UserModel) {
            this.user = user;
        },

        getCurrentUser() {
            return this.user
        },

        setStubUser() {
            this.user = {
                id: 1,
                name: "Titouan",
                avatar_url: "https://avatars.githubusercontent.com/u/103690945?v=4",
            };
        }
    }
})

export default useUserStore;