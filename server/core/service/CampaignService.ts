import ICampaignRepository from "~~/server/infrastructure/ports/ICampaignRepository";
import {CampaignDto} from "../dto/output/CampaignDto";
import {CampaignMapper} from "../mapper/CampaignMapper";

export default class CampaignService {
    #campaignRepository: ICampaignRepository;

    constructor(
        campaignRepository: ICampaignRepository,
    ) {
        this.#campaignRepository = campaignRepository;
    }

    public async getAllCampaigns(): Promise<CampaignDto[]> {
        const response = await this.#campaignRepository.getAll();
        return CampaignMapper.toDtos(response);
    }

    public async getCampaignsByUserId(userId: number): Promise<CampaignDto[]> {
        const response = await this.#campaignRepository.getCampaignsByUserId(userId)
        return CampaignMapper.toDtos(response)
    }

    public async getCampaignById(id: number): Promise<CampaignDto> {
        const response = await this.#campaignRepository.getCampaignById(id)
        if (response == null) {
            throw createError({
                status: 400,
                statusMessage: "l'id est inexistant"
            })
        }

        return CampaignMapper.toDto(response)
    }


}
