import type CampaignModel from "./CampaignModel";

export default interface CharacterModel {
    id: number;
    name: string;
    concept: string;
    classe: string;
    description: string;
    avatar_url: string;
    player_id: number;
    campaign_id: number;
    is_public: boolean;
    force: number;
    dexterite: number;
    constitution: number;
    intelligence: number;
    sagesse: number;
    charisme: number;
    inventory: string; // Json stringified
    created_at: Date;
}

