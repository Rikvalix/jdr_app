import PlayerEntity from "~~/server/core/entity/PlayerEntity";

export interface IPlayerRepository {

    findAllUsers(): Promise<PlayerEntity[]>

    findUserById(id: number) : Promise<PlayerEntity | null>

}