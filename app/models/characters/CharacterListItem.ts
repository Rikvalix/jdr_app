export interface CampaignNameOnly {
    name: string;
}

export interface CharacterListItem {
    id: number;
    name: string;
    campaigns?: CampaignNameOnly | null;
}