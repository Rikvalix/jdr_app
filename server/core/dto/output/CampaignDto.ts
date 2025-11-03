import { PlayerDto } from "./PlayerDto";

export interface CampaignDto {
    id: number,
    name: string,
    description: string,
    gameMaster: PlayerDto,
    createdAt: Date
}