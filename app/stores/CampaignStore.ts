import { defineStore } from "pinia";
import { ref } from "vue";
import useSupabase from "~/composables/supabaseClient";
import type CampaignModel from "~/models/CampaignModel";

const useCampaignStore = defineStore("campaignStore", () => {
  const campaigns = ref<Array<CampaignModel>>([]);
  const currentCampaign = ref<CampaignModel | null>(null);

  async function getAllCampaigns() {
    const result = await useSupabase().from("campaigns").select("*");

    if (result.error) {
      return;
    }
    campaigns.value = result.data as CampaignModel[];
  }

  async function getCampaignsByUserId(
    userId: number
  ): Promise<CampaignModel[] | null> {
    const { data, error } = await useSupabase()
      .from("campaigns")
      .select(
        `
            *,
            players_campaigns!inner()
        `
      )
      .eq("players_campaigns.player_id", userId);

    if (error) {
      return null;
    }
    return data as CampaignModel[];
  }

  async function getCampaignById(id: number): Promise<CampaignModel | null> {
    const { data, error } = await useSupabase()
      .from("campaigns")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return null;
    }
    return data;
  }

  async function addCampaign(campaign: Partial<CampaignModel>) {
    const { error } = await useSupabase().from("campaigns").insert({
      name: campaign.name,
      description: campaign.description,
      game_master_id: campaign.game_master_id,
    });

    if (error) {
      return false;
    }
    return true;
  }

  return {
    campaigns,
    currentCampaign,
    getAllCampaigns,
    getCampaignsByUserId,
    getCampaignById,
    addCampaign,
  };
});

export default useCampaignStore;