import PlayerEntity from "~~/server/core/entity/PlayerEntity";
import { IPlayerRepository } from "../../ports/IPlayerRepository";
import { SupabaseClient } from "@supabase/supabase-js";

export default class PlayerRepository implements IPlayerRepository {

    #table: string

    #dbClient: SupabaseClient;

    constructor(dbClient: SupabaseClient) {
        this.#dbClient = dbClient
        this.#table = "players"
    }

    async findAllUsers(): Promise<PlayerEntity[]> {

        const {data, error} = await this.#dbClient
            .from(this.#table)
            .select("*")
        
        if (error) {
            return []
        }
        if (!data) {
            return []
        }
        return data.map((item: any) => {
            return PlayerRepository.mapObjectToEntity(item)
        })
    }


    async findUserById(id: number): Promise<PlayerEntity | null>  {
        const {data, error} = await this.#dbClient
            .from(this.#table)
            .select("*")
            .eq("id",id)
            .single();

        if (error) {
            return null
        }
        if (!data) {
            return null
        }

        return PlayerRepository.mapObjectToEntity(data);
    }

    public static mapObjectToEntity(data: any): PlayerEntity {
        if (!data) {
            return  new PlayerEntity(0, "", "")
        }
        return new PlayerEntity(data.id, data.name, data.avatar_url)
    }
    
}