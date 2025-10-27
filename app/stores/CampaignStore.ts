import { ca } from "@nuxt/ui/runtime/locale/index.js";
import { defineStore } from "pinia";
import { description } from "valibot";
import useSupabase from "~/composables/supabaseClient";
import type CampaignModel from "~/models/CampaignModel";

export const useCampaignStore = defineStore("campaignStore", {
  state: () => ({
    campaigns: [] as Array<CampaignModel>,
    currentCampaign: null as CampaignModel | null,
  }),
  actions: {
    async getAllCampaigns() {
      const result = await useSupabase().from("campaigns").select("*");

      if (result.error) {
        console.error(result.error);
      }
      this.campaigns = result.data as CampaignModel[];
    },

    async addCampaign(campaign: Partial<CampaignModel>) {
      const { error } = await useSupabase()
        .from("campaigns")
        .insert({
          name: campaign.name,
          description: campaign.description,
          game_master_id: campaign.game_master_id,
        })
        
      if (error) {
        console.error(error);
        return false
      }
      return true
    },
  },
});
