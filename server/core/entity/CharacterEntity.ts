import { CampaignEntity } from "./CampaignEntity";
import PlayerEntity from "./PlayerEntity";

export default class CharacterEntity {
  #id: number;
  #name: string;
  #concept: string;
  #description: string;
  #avatarUrl: string;
  #player: PlayerEntity | null;
  #campaign: CampaignEntity | null;
  #isPublic: boolean;
  #force: number;
  #dexterite: number;
  #constitution: number;
  #intelligence: number;
  #sagesse: number;
  #charisme: number;
  #inventory: number;
  // Jointures

  constructor(
    id: number,
    name: string,
    concept: string,
    description: string,
    avatarUrl: string,
    player: PlayerEntity | null,
    campaign: CampaignEntity | null,
    isPublic: boolean,
    force: number,
    dexterite: number,
    constitution: number,
    intelligence: number,
    sagesse: number,
    charisme: number,
    inventory: number
  ) {
    this.#id = id;
    this.#name = name;
    this.#concept = concept;
    this.#description = description;
    this.#avatarUrl = avatarUrl;
    this.#player = player;
    this.#campaign = campaign;
    this.#isPublic = isPublic;
    this.#force = force;
    this.#dexterite = dexterite;
    this.#constitution = constitution;
    this.#intelligence = intelligence;
    this.#sagesse = sagesse;
    this.#charisme = charisme;
    this.#inventory = inventory;
  }
  get id(): number {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get concept(): string {
    return this.#concept;
  }

  get description(): string {
    return this.#description;
  }

  get avatarUrl(): string {
    return this.#avatarUrl;
  }

  get player(): PlayerEntity {
    return <PlayerEntity>this.#player;
  }

  get campaign(): CampaignEntity {
    return <CampaignEntity>this.#campaign;
  }

  get isPublic(): boolean {
    return this.#isPublic;
  }

  get force(): number {
    return this.#force;
  }

  get dexterite(): number {
    return this.#dexterite;
  }

  get constitution(): number {
    return this.#constitution;
  }

  get intelligence(): number {
    return this.#intelligence;
  }

  get sagesse(): number {
    return this.#sagesse;
  }

  get charisme(): number {
    return this.#charisme;
  }

  get inventory(): number {
    return this.#inventory;
  }
  set id(value: number) {
    this.#id = value;
  }

  set name(value: string) {
    this.#name = value;
  }

  set concept(value: string) {
    this.#concept = value;
  }

  set description(value: string) {
    this.#description = value;
  }

  set avatarUrl(value: string) {
    this.#avatarUrl = value;
  }

  set player(value: PlayerEntity) {
    this.#player = value;
  }

  set campaign(value: CampaignEntity) {
    this.#campaign = value;
  }

  set isPublic(value: boolean) {
    this.#isPublic = value;
  }

  set force(value: number) {
    this.#force = value;
  }

  set dexterite(value: number) {
    this.#dexterite = value;
  }

  set constitution(value: number) {
    this.#constitution = value;
  }

  set intelligence(value: number) {
    this.#intelligence = value;
  }

  set sagesse(value: number) {
    this.#sagesse = value;
  }

  set charisme(value: number) {
    this.#charisme = value;
  }

  set inventory(value: number) {
    this.#inventory = value;
  }
}
