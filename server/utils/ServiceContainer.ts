import PlayerRepository from "../infrastructure/adapters/supabase/PlayerRepository";
import { PlayerService } from "../core/service/PlayerService";
import useDatabase from "../plugins/database";
import CampaignRepository from "../infrastructure/adapters/supabase/CampaignRepository";
import CampaignService from "../core/service/CampaignService";
import CharacterRepository from "../infrastructure/adapters/supabase/CharacterRepository";
import CharacterService from "../core/service/CharacterService";

const dbClient = useDatabase();

// Repositories

const playerRepository = new PlayerRepository(dbClient);
const campaignRepository = new CampaignRepository(dbClient);
const characterRepository = new CharacterRepository(dbClient);
// Services

const playerService = new PlayerService(playerRepository);
const campaignService = new CampaignService(campaignRepository, playerService);
const characterService = new CharacterService(characterRepository);

export const services =  {
  playerService,
  campaignService,
  characterService
}