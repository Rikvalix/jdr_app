import { CampaignEntity } from "~~/server/core/entity/CampaignEntity";
import ICampaignRepository from "../../ports/ICampaignRepository";
import { SupabaseClient } from "@supabase/supabase-js";
import CreateCampaignDto from "~~/server/core/dto/input/CreateCampaignDto";

export default class CampaignRepository implements ICampaignRepository {
  #table: string;

  #dbClient: SupabaseClient;

  constructor(dbClient: SupabaseClient) {
    this.#dbClient = dbClient;
    this.#table = "campaigns";
  }

  async getCampaignsByUserId(id: number): Promise<CampaignEntity[]> {
    const { data, error } = await this.#dbClient.from(this.#table)
    .select(`*,
      players_campaigns!inner(
      id,
      name)
    `)
    .eq("players_campaigns.player_id",id);

    if (error) {
      return [];
    }
    return data;
  }

  async getCampaignById(id: number): Promise<CampaignEntity> {
    throw new Error("Method not implemented.");
  }
  async addCampaign(dto: CreateCampaignDto): Promise<CampaignEntity> {
    throw new Error("Method not implemented.");
  }
}
