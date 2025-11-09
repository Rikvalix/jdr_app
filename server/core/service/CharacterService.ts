import ICharacterRepository from "~~/server/infrastructure/ports/ICharacterRepository";
import ShortCharacterDto from "../dto/output/characters/ShortCharacterDto";
import ShortCharacterMapper from "../mapper/characters/ShortCharacterMapper";
import CharacterEntity from "../entity/CharacterEntity";

export default class CharacterService {
    #characterRepository: ICharacterRepository;

    constructor(characterRepository: ICharacterRepository) {
        this.#characterRepository = characterRepository;
    }

    public async getCharactersByUserId(id: number): Promise<ShortCharacterDto[]> {
        const entites: CharacterEntity[] = await this.#characterRepository.getCharactersByUserId(id)
        return ShortCharacterMapper.toDtos(entites)
    }

    public async getCharactersByCampaignId(id: number): Promise<ShortCharacterDto[]> {
        const entites: CharacterEntity[] = await this.#characterRepository.getCharactersByCampaignId(id)
        return ShortCharacterMapper.toDtos(entites)
    }

}
