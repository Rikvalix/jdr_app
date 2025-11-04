import {z} from "zod";
import {CampaignDto} from "~~/server/core/dto/output/CampaignDto";

const inputSchema = z.object({
    userId: z.string().optional(),
    campaignId: z.string().optional()
})

export default defineEventHandler(async (event) => {

    // Arg soit userId soit CampaignId
    const query = await getValidatedQuery(event, inputSchema.parse)

    try {
        const campaignService = services.campaignService;
        if (query.userId != undefined) {
            const response: CampaignDto[] = await campaignService.getCampaignsByUserId(parseInt(query.userId));
            return {
                data: response,
                count: response.length
            }
        } else if (query.campaignId != undefined) {
            const response: CampaignDto = await campaignService.getCampaignById(parseInt(query.campaignId));
            return {
                data: response,
            }
        } else if (query.campaignId == undefined && query.userId == undefined) {
            const response: CampaignDto[] = await campaignService.getAllCampaigns();
            return {
                data: response,
                count: response.length
            }
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
})

