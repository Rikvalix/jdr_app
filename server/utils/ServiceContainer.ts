import PlayerRepository from "../infrastructure/adapters/supabase/PlayerRepository";
import { PlayerService } from "../core/service/PlayerService";
import useDatabase from "../plugins/database";
import CampaignRepository from "../infrastructure/adapters/supabase/CampaignRepository";
import CampaignService from "../core/service/CampaignService";

const dbClient = useDatabase();

// Repositories

const playerRepository = new PlayerRepository(dbClient);
const campaignRepository = new CampaignRepository(dbClient);

// Services

const playerService = new PlayerService(playerRepository);
const campaignService = new CampaignService(campaignRepository);

export const services =  {
  playerService,
  campaignService
}