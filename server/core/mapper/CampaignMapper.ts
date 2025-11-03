import { CampaignDto } from "../dto/output/CampaignDto";
import { CampaignEntity } from "../entity/CampaignEntity";

export class CampaignMapper {
    
    public static toDto(entite: CampaignEntity) : CampaignDto {
        return {
            id: entite.id,
            name : entite.name,
            description : entite.description,
            gameMaster: entite.gameMaster,
            createdAt: entite.createdAt
        }
    }

    public static toDtos(entites: CampaignEntity[]) : CampaignDto[] {
        return entites.map(item => CampaignMapper.toDto(item))
    }
}