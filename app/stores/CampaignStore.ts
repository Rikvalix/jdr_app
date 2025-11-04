import {defineStore} from "pinia";
import {ref} from "vue";
import useSupabase from "~/composables/supabaseClient";
import type CampaignModel from "~/models/CampaignModel";

const useCampaignStore = defineStore("campaignStore", () => {
    const campaigns = ref<Array<CampaignModel>>([]);
    const currentCampaign = ref<CampaignModel | null>(null);

    async function getAllCampaigns() {
        const response = await $fetch("/api/campaigns")

        if (response == undefined) {
            return;
        }
        campaigns.value = response.data as CampaignModel[];
    }

    async function getCampaignsByUserId(
        userId: number
    ): Promise<CampaignModel[] | null> {
        const response = await $fetch("/api/campaigns?userId=" + userId);

        if (response == undefined) {
            return [];
        }

        return response.data as CampaignModel[];
    }

    async function getCampaignById(id: number): Promise<CampaignModel | null> {
        const response = await $fetch("/api/campaigns?campaignId=" + id);

        if (response == undefined) {
            return null;
        }

        return response.data as CampaignModel;
    }

    async function addCampaign(campaign: Partial<CampaignModel>) {
        const {error} = await useSupabase().from("campaigns").insert({
            name: campaign.name,
            description: campaign.description,
            game_master_id: 6,
        });

        return !error;

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