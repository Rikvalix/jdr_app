import {CreateCampaignDto} from "~~/server/core/dto/input/CreateCampaignDto";
import {CampaignEntity} from "~~/server/core/entity/CampaignEntity";

export default interface ICampaignRepository {

    getAll() : Promise<CampaignEntity[]>

    getCampaignsByUserId(id: number): Promise<CampaignEntity[]>

    getCampaignById(id: number) : Promise<CampaignEntity | null>

    getCampaignByName(name: string) : Promise<CampaignEntity | null>

    addCampaign(dto: CreateCampaignDto) : Promise<CampaignEntity | null>


}