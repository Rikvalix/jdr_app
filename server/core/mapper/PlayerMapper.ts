import { PlayerDto } from "../dto/output/PlayerDto";
import PlayerEntity from "../entity/PlayerEntity";

export class PlayerMapper {
  public static toDto(entite: PlayerEntity): PlayerDto {
    return {
      id: entite.id,
      name: entite.name,
      avatar_url: entite.avatar_url,
    };
  }

  public static toDtos(entites: PlayerEntity[]): PlayerDto[] {
    return entites.map((entite) => PlayerMapper.toDto(entite));
  }
}
