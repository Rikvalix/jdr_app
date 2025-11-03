import PlayerEntity from "./PlayerEntity";

export class CampaignEntity {
  #id: number;
  #name: string;
  #description: string;
  #gameMaster: PlayerEntity;
  #created_at: Date;

  constructor(
    id: number,
    name: string,
    description: string,
    gameMaster: PlayerEntity, // Jointure dans le répo (name, id)
    created_at: Date
  ) {
    this.#id = id;
    this.#name = name;
    this.#description = description;
    this.#gameMaster = gameMaster;
    this.#created_at = created_at
  }

  public get id() : number {
    return this.#id;
  }

  public get name() : string {
    return this.#name;
  }

  public get description(): string {
    return this.#description;
  }

  public get gameMaster(): PlayerEntity {
    return this.#gameMaster;
  }

  public get createdAt(): Date {
    return this.#created_at;
  }
}
