import { CreateCampaignDto } from "~~/server/core/dto/input/CreateCampaignDto";

export default defineEventHandler(async (event) => {
  
  const body = await readValidatedBody(event, body => CreateCampaignDto.parse(body));

  const campaignService = services.campaignService;


  try {
    const response = campaignService.addCampaign(body)
    return {
      data: response
    }
  } catch (err) {
        if (err && typeof err === 'object' && 'statusCode' in err && typeof err.statusCode === 'number') {
            throw err;
        }
        throw createError({
                statusCode: 500,
                statusMessage: "Une erreur interne du serveur est survenue.",
            }
        )
    }
});
