import useSupabase from "~/composables/supabaseClient";
import type UserModel from "~/models/UserModel";
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


const useUserStore = defineStore('user', () => {
  
  const currentUser = ref<UserModel | null>(null)
  const users = ref<UserModel[]>([])

  const isLogin = computed(() => !!currentUser.value?.id)
  
  async function getAllUsers() {
    if (users.value.length !== 0) {
      return
    }

    const { data, error } = await useSupabase().from("players").select("*")

    if (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error)
      return
    }
    
    users.value = data as UserModel[]
  }

  async function getUserById(id: number) {
    const { data, error } = await useSupabase()
      .from("players")
      .select("*")
      .eq("id", id)
      .single()
      
    if (error) {
      console.error(`Erreur getUserById ${id}:`, error)
      return null
    }
    return data
  }

  function setCurrentUser(user: UserModel) {
    currentUser.value = user
  }

  return {
    currentUser,
    users,
    isLogin,
    getAllUsers,
    getUserById,
    setCurrentUser
  }
}, {
  persist: true,
})

export default useUserStore;

