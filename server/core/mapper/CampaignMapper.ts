import { CampaignDto } from "../dto/output/CampaignDto";
import { CampaignEntity } from "../entity/CampaignEntity";
import { PlayerMapper } from "./PlayerMapper";

export class CampaignMapper {
    
    public static toDto(entite: CampaignEntity) : CampaignDto {
        return {
            id: entite.id,
            name : entite.name,
            description : entite.description,
            gameMaster: entite.gameMaster == null ? null : PlayerMapper.toDto(entite.gameMaster),
            createdAt: entite.createdAt
        }
    }

    public static toDtos(entites: CampaignEntity[]) : CampaignDto[] {
        return entites.map(item => CampaignMapper.toDto(item))
    }
}