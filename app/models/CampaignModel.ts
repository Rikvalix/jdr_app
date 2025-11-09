import type UserModel from "./UserModel";

export default interface CampaignModel {
    id: number;
    name: string;
    description: string;
    gameMaster: UserModel;
    createdAt: string;
}