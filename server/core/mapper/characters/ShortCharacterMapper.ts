import ShortCharacterDto from "../../dto/output/characters/ShortCharacterDto";
import CharacterEntity from "../../entity/CharacterEntity";

export default class ShortCharacterMapper {

    public static toDto(entite: CharacterEntity): ShortCharacterDto{
        return {
            id: entite.id,
            name: entite.name,
            campaignName: entite.campaign != null ? entite.campaign.name : ""
        };
    }

    public static toDtos(entites: CharacterEntity[]) : ShortCharacterDto[] {
        return entites.map(item => ShortCharacterMapper.toDto(item));
    }
}