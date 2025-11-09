import {defineStore} from "pinia";
import {ref} from "vue";
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

    async function setCampaignsByUserId(data: CampaignModel[]){
        campaigns.value = data;
    }

    async function addCampaign(campaign: Partial<CampaignModel>) {
        const result = await $fetch("/api/campaigns", {
            method: 'POST',
            body: {
                campaign
            },
        })

        return result.data;

    }

    return {
        campaigns,
        currentCampaign,
        getAllCampaigns,
        setCampaignsByUserId,
        addCampaign,
    };
});

export default useCampaignStore;