import CreateCharacterDto from "~~/server/core/dto/input/CreateCharacterDto";
import CharacterEntity from "~~/server/core/entity/CharacterEntity";

export default interface ICharacterRepository {

    getCharacterById(id: number) : Promise<CharacterEntity | null>

    getCharactersByUserId(id: number) : Promise<CharacterEntity[]>

    getCharactersByCampaignId(campaign_id: number) : Promise<CharacterEntity[]>

    addCharacter(data: CreateCharacterDto): Promise<CharacterEntity>


}