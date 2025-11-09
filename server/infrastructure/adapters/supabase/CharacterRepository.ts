import CreateCharacterDto from "~~/server/core/dto/input/CreateCharacterDto";
import CharacterEntity from "~~/server/core/entity/CharacterEntity";
import ICharacterRepository from "../../ports/ICharacterRepository";
import {SupabaseClient} from "@supabase/supabase-js";
import PlayerRepository from "./PlayerRepository";
import CampaignRepository from "./CampaignRepository";

export default class CharacterRepository implements ICharacterRepository {
    #table: string;

    #dbClient: SupabaseClient;

    constructor(dbClient: SupabaseClient) {
        this.#dbClient = dbClient;
        this.#table = "characters";
    }

    async getCharacterById(id: number): Promise<CharacterEntity | null> {
        const {data, error} = await this.#dbClient
            .from(this.#table)
            .select(
                `
        *,
         campaigns:campaign_id (*) 
      `
            )
            .eq("id", id)
            .single();

        if (error) {
            return null;
        }
        return CharacterRepository.mapObjectToCharacter(data);
    }

    async getCharactersByUserId(id: number): Promise<CharacterEntity[]> {
        const {data, error} = await this.#dbClient
            .from(this.#table)
            .select(
                `
        *,
         player:player_id(*),
         campaign:campaign_id(*) 
      `
            )
            .eq("player_id", id);

        if (error) {
            return [];
        }

        return data.map((item) => CharacterRepository.mapObjectToCharacter(item));
    }

    async getCharactersByCampaignId(
        campaign_id: number
    ): Promise<CharacterEntity[]> {
        const {data, error} = await this.#dbClient
            .from(this.#table)
            .select(`
                *,
                 campaigns:campaign_id (*) 
            `)
            .eq("campaign_id", campaign_id);

        if (error) {
            return [];
        }

        return data.map((item) => CharacterRepository.mapObjectToCharacter(item));
    }

    async addCharacter(data: CreateCharacterDto): Promise<CharacterEntity> {
        throw new Error("Method not implemented.");
    }

    public static mapObjectToCharacter(obj: any) {
        return new CharacterEntity(
            obj.id,
            obj.name,
            obj.concept,
            obj.description,
            obj.avatar_url,
            obj.player != null ? PlayerRepository.mapObjectToEntity(obj.player) : null,
            obj.campaign != null ? CampaignRepository.mapObjectToEntity(obj.campaign) : null,
            obj.is_public,
            obj.force,
            obj.dexterite,
            obj.constitution,
            obj.intelligence,
            obj.sagesse,
            obj.charisme,
            obj.inventory
        );
    }
}
