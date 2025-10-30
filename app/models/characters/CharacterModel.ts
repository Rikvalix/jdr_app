import type { CharacterClassModel } from "./CharacterClassModel";
import type CharacterAbilitiesModel from "./CharactersAbilitiesModel";

export default interface CharacterModel extends FullCharacterInterface{
    id: number;
    name: string;
    concept: string;
    classe: string;
    description: string;
    avatar_url: string;
    player_id: number;
    campaign_id: number;
    is_public: boolean;
    force: number;
    dexterite: number;
    constitution: number;
    intelligence: number;
    sagesse: number;
    charisme: number;
    inventory: string; // Json stringified
    created_at: Date;
}

interface FullCharacterInterface {
    character_class: CharacterClassModel
    character_abilities: CharacterAbilitiesModel
}

