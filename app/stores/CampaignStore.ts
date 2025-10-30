import { ca, da } from "@nuxt/ui/runtime/locale/index.js";
import { defineStore } from "pinia";
import { description } from "valibot";
import useSupabase from "~/composables/supabaseClient";
import type CampaignModel from "~/models/CampaignModel";
import type CharacterModel from "~/models/characters/CharacterModel";

export const useCampaignStore = defineStore("campaignStore", {
  state: () => ({
    campaigns: [] as Array<CampaignModel>,
    currentCampaign: null as CampaignModel | null,
  }),
  actions: {
    async getAllCampaigns() {
      const result = await useSupabase().from("campaigns").select("*");

      if (result.error) {
        return [];
      }
      this.campaigns = result.data as CampaignModel[];
    },

    async getCampaignsByUserId(userId: number) : Promise<CampaignModel[]|null> {
      const { data, error } = await useSupabase()
        .from("campaigns")
        .select( `
            *,
            players_campaigns!inner()
        `)
        .eq('players_campaigns.player_id', userId);

        if (error) {
          return null;
        }
        return data as CampaignModel[];
    },

    async getCampaignById(id: number): Promise<CampaignModel | null> {
      const { data, error } = await useSupabase()
        .from("campaigns")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return null;
      }
      return data;
    },

    async addCampaign(campaign: Partial<CampaignModel>) {
      const { error } = await useSupabase().from("campaigns").insert({
        name: campaign.name,
        description: campaign.description,
        game_master_id: campaign.game_master_id,
      });

      if (error) {
        return false;
      }
      return true;
    },
  },
});
