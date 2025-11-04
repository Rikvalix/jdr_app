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
            // TODO: Mettre un logger
            return []
        }
        if (!data) {
            return []
        }
        return data.map((item: any) => {
            // TODO: Voir pour un mapper auto
            return new PlayerEntity(item.id, item.name, item.avatar_url)
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

        return new PlayerEntity(data.id, data.name, data.avatar_url);
    }

    public static dataToPlayer(data: any): PlayerEntity {
        if (!data) {
            return  new PlayerEntity(0, "", "")
        }
        return new PlayerEntity(data.id, data.name, data.avatar_url)
    }
    
}