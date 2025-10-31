import { defineStore } from "pinia";
import { ref } from "vue";
import useSupabase from "~/composables/supabaseClient";
import type CharacterModel from "~/models/characters/CharacterModel";
import type { CharacterListItem } from "~/models/characters/CharacterListItem";
import type { CharacterClassModel } from "~/models/characters/CharacterClassModel";

const useCharacterStore = defineStore("characterStore", () => {
  const myCharacters = ref<Array<CharacterModel>>([]);
  const shortClasses = ref<Array<Partial<CharacterClassModel>>>([]);

  async function addCharacter(data: Partial<CharacterModel>) {
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
      return false;
    }

    return true;
  }

  async function getCharacterById(id: number) {
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
      return null;
    }
    return data;
  }

  async function getFullCharacterById(id: number) {
    const { data, error } = await useSupabase()
      .from("characters")
      .select(
        `
          *, 
          characters_class!inner( class (*) )
          characters_bonds!inner( bonds (*) )
          characters_attack!inner( attacks (*) )
          `
      )
      .eq("id", id);
    if (error) {
      return null;
    }
    console.table(data);
    return data;
  }

  async function getAllCharacterForUser(
    userId: Number
  ): Promise<CharacterListItem[]> {
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
      return [];
    }
    if (data == null) {
      return [];
    }
    return data;
  }

  async function getAllCharacterByCampaignId(
    campaignId: Number
  ): Promise<CharacterModel[] | []> {
    const { data, error } = await useSupabase()
      .from("characters")
      .select(
        ` 
          *
        `
      )
      .eq("campaign_id", campaignId);

    if (error) {
      return [];
    }
    if (data == null) {
      return [];
    }
    return data;
  }

  async function addClass(data: Partial<CharacterClassModel>) {
    const { error } = await useSupabase().from("class").insert({
      name: data.name,
      description: data.description,
    });

    if (error) {
      return false;
    }
    return true;
  }

  async function getAllClass() {
    const { data, error } = await useSupabase().from("class").select(` 
        id,
        name
        `);
    if (error) {
      return;
    }
    shortClasses.value = data;
  }

  return {
    myCharacters,
    shortClasses,
    addCharacter,
    getCharacterById,
    getFullCharacterById,
    getAllCharacterForUser,
    getAllCharacterByCampaignId,
    addClass,
    getAllClass,
  };
});

export default useCharacterStore;