import {CampaignEntity} from "~~/server/core/entity/CampaignEntity";
import ICampaignRepository from "../../ports/ICampaignRepository";
import {SupabaseClient} from "@supabase/supabase-js";
import CreateCampaignDto from "~~/server/core/dto/input/CreateCampaignDto";
import PlayerRepository from "./PlayerRepository";

export default class CampaignRepository implements ICampaignRepository {
    #table: string;

    #dbClient: SupabaseClient;

    constructor(dbClient: SupabaseClient) {
        this.#dbClient = dbClient;
        this.#table = "campaigns";
    }

    async getAll(): Promise<CampaignEntity[]> {
        const {data, error} = await this.#dbClient
            .from(this.#table)
            .select("*");

        if (error) {
            return []
        }
        return data.map((item: any) => CampaignRepository.mapObjectToCampaign(item));
    }

    async getCampaignsByUserId(id: number): Promise<CampaignEntity[]> {
        const {data, error} = await this.#dbClient.from(this.#table)
            .select(`*,
              players_campaigns!inner()
            `)
            .eq("players_campaigns.player_id", id);

        if (error) {
            return [];
        }
        return data.map((item: any) => CampaignRepository.mapObjectToCampaign(item));
    }

    async getCampaignById(id: number): Promise<CampaignEntity | null> {
        const {data, error} = await this.#dbClient
            .from(this.#table)
            .select(`
                *,
                gameMaster:players!game_master_id(
                    *
                )
            `)
            .eq("id", id)
            .single();

        if (error) {
            return null;
        }
        return CampaignRepository.mapObjectToCampaign(data);
    }

    async addCampaign(dto: CreateCampaignDto): Promise<CampaignEntity> {
        throw new Error("Method not implemented.");
    }

    public static mapObjectToCampaign(data: any) {
        return new CampaignEntity(
            data.id,
            data.name,
            data.description,
            PlayerRepository.dataToPlayer(data.gameMaster),
            data.created_at,
        )
    }


}
