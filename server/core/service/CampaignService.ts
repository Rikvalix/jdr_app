import ICampaignRepository from "~~/server/infrastructure/ports/ICampaignRepository";

export default class CampaignService {
  #campaignRepository: ICampaignRepository;

  constructor(campaignRepository: ICampaignRepository) {
    this.#campaignRepository = campaignRepository;
  }

  
}
