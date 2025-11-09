import { services } from "~~/server/utils/ServiceContainer"

export default defineEventHandler(async (event) => {
    
    const playerService = services.playerService;
    
    try {
        const allPlayers = await playerService.getAllPlayers();
        return {
            data: allPlayers,
            count: allPlayers.length
        }
    } catch(error) {
        console.error(error)
    }
})
