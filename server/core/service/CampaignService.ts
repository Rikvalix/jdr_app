import ICampaignRepository from "~~/server/infrastructure/ports/ICampaignRepository";
import { CampaignDto } from "../dto/output/CampaignDto";
import { CampaignMapper } from "../mapper/CampaignMapper";
import { CreateCampaignDto } from "../dto/input/CreateCampaignDto";
import { PlayerService } from "./PlayerService";

export default class CampaignService {
  #campaignRepository: ICampaignRepository;
  #playerService: PlayerService;
  constructor(
    campaignRepository: ICampaignRepository,
    playerService: PlayerService
  ) {
    this.#campaignRepository = campaignRepository;
    this.#playerService = playerService;
  }

  public async getAllCampaigns(): Promise<CampaignDto[]> {
    const response = await this.#campaignRepository.getAll();
    return CampaignMapper.toDtos(response);
  }

  public async getCampaignsByUserId(userId: number): Promise<CampaignDto[]> {
    const response = await this.#campaignRepository.getCampaignsByUserId(
      userId
    );
    return CampaignMapper.toDtos(response);
  }

  public async getCampaignById(id: number): Promise<CampaignDto> {
    const response = await this.#campaignRepository.getCampaignById(id);
    if (response == null) {
      throw createError({
        status: 400,
        statusMessage: "l'id est inexistant",
      });
    }

    return CampaignMapper.toDto(response);
  }

  public async addCampaign(data: CreateCampaignDto): Promise<CampaignDto> {
    // Check si une campagne existe déja
    if ((await this.#campaignRepository.getCampaignByName(data.name)) != null) {
      throw createError({
        statusCode: 400,
        statusMessage: "Une campagne avec le même nom existe déja",
      });
    }
    // Check si le gameMaster existe
    if (await this.#playerService.playerExist(data.game_master_id) == false) {
        throw createError({
            statusCode: 400,
            statusMessage: "L'utilisateur n'existe pas"
        })
    }
    const response = await this.#campaignRepository.addCampaign(data);
    if (!response) {
      throw createError({
        statusCode: 500,
        statusMessage: "Erreur d'ajout de la campagne",
      });
    }
    return CampaignMapper.toDto(response);
  }
}
