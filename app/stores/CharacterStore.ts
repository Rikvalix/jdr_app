import { defineStore } from "pinia";
import useSupabase from "~/composables/supabaseClient";
import type CharacterModel from "~/models/characters/CharacterModel";
import type { CharacterListItem } from "~/models/characters/CharacterListItem";

const useCharacterStore = defineStore("characterStore", {
  state: () => ({
    myCharacters: [] as Array<CharacterModel>,
  }),
  actions: {
    async addCharacter(data: Partial<CharacterModel>) {
      const {
        name,
        concept,
        description,
        avatar_url,
        player_id,
        campaign_id,
        force,
        dexterite,
        constitution,
        intelligence,
        sagesse,
        charisme,
      } = data;
      const { error } = await useSupabase()
        .from("characters")
        .insert({
          name: name,
          concept: concept || null,
          description: description || null,
          avatar_url: avatar_url || null,

          player_id: player_id,
          campaign_id: campaign_id ?? null,

          force: force ?? 10,
          dexterite: dexterite ?? 10,
          constitution: constitution ?? 10,
          intelligence: intelligence ?? 10,
          sagesse: sagesse ?? 10,
          charisme: charisme ?? 10,
        });

      if (error) {
        console.error("Erreur d'insertion du personnage:", error);
        return false;
      }

      return true;
    },

    async getCharacterById(id: number) {
      const { data, error } = await useSupabase()
        .from("characters")
        .select(
          `
        *, 
        campaigns:campaign_id (*) 
    `
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error(error)
      }
      return data;
    },

    async getAllCharacterForUser(userId: Number): Promise<CharacterListItem[]> {
      const { data, error } = await useSupabase()
        .from("characters")
        .select(
          `
          id,
          name,
          campaign:campaign_id (name) 
        `
        )
        .eq("player_id", userId);

      if (error) {
        console.error(error);
      }
      if (data == null) {
        return [];
      }
      return data;
    },
  },
});

export default useCharacterStore;
