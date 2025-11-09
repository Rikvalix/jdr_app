import {z} from "zod";
import ShortCharacterDto from "~~/server/core/dto/output/characters/ShortCharacterDto";

const inputSchema = z.object({
    userId: z.string().optional(),
    campaignId: z.string().optional(),
});

export default defineEventHandler(async (event) => {
    // Arg soit userId soit CampaignId
    const query = await getValidatedQuery(event, inputSchema.parse);

    try {
        const characterService = services.characterService;

        if (query.userId != undefined) {
            const response: ShortCharacterDto[] = await characterService.getCharactersByUserId(parseInt(query.userId))
            return {
                data: response,
                count: response.length
            }
        } else if (query.campaignId != undefined) {
            const response : ShortCharacterDto[] = await characterService.getCharactersByCampaignId(parseInt(query.campaignId))
            return {
                data: response,
                count: response.length
            }
        }

    } catch (err) {
        if (
            err &&
            typeof err === "object" &&
            "statusCode" in err &&
            typeof err.statusCode === "number"
        ) {
            throw err;
        }
        throw createError({
            statusCode: 500,
            statusMessage: "Une erreur interne du serveur est survenue.",
        });
    }
});
