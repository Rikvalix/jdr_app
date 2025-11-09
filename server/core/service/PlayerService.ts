import { IPlayerRepository } from "~~/server/infrastructure/ports/IPlayerRepository";
import { PlayerDto } from "../dto/output/PlayerDto";
import { PlayerMapper } from "../mapper/PlayerMapper";

export class PlayerService {
  private playerRepository: IPlayerRepository;

  constructor(playerRepository: IPlayerRepository) {
    this.playerRepository = playerRepository;
  }

  public async getAllPlayers(): Promise<PlayerDto[]> {
    return PlayerMapper.toDtos(await this.playerRepository.findAllUsers());
  }

  public async getPlayerById(id: number): Promise<PlayerDto> {
    const data = await this.playerRepository.findUserById(id);
    if (data == null) {
      throw createError({
        status: 400,
        statusMessage: "l'ID est inexistant",
      });
    }
    return PlayerMapper.toDto(data);
  }

  /**
   * Vérifie si l'utilisateur existe, si true => oui, si false => non
   * @param id 
   * @returns 
   */
  public async playerExist(id: number) : Promise<boolean> {
    return await this.playerRepository.findUserById(id) != null;
  }
}
