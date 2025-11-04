import {services} from "../../utils/ServiceContainer";

export default defineEventHandler(async (event) => {
    const idStr = getRouterParam(event, "id");

    if (!idStr) {
        throw createError({
            statusCode: 400,
            statusMessage: "L'id doit être précisé dans l'URL.",
        });
    }

    const id = parseInt(idStr);

    if (isNaN(id)) {
        throw createError({
            statusCode: 400,
            statusMessage: "L'id doit être un nombre valide.",
        });
    }

    const playerService = services.playerService;

    try {
        const player = await playerService.getPlayerById(id);

        return {
            data: player,
        };
    } catch (err) {
        if (err && typeof err === 'object' && 'statusCode' in err && typeof err.statusCode === 'number') {
            throw err;
        }
        throw createError({
            statusCode: 500,
            statusMessage: "Une erreur interne du serveur est survenue.",
        });
    }
});
