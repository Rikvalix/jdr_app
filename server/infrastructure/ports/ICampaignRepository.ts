import { CreateCampaignDto } from "~~/server/core/dto/input/CreateCampaignDto";
import { CampaignEntity } from "~~/server/core/entity/CampaignEntity";

export default interface ICampaignRepository {

    getCampaignsByUserId(id: number): Promise<CampaignEntity[]>

    getCampaignById(id: number) : Promise<CampaignEntity>

    addCampaign(dto: CreateCampaignDto) : Promise<CampaignEntity>

}