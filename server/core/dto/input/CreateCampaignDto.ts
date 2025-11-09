import { z } from "zod" 

export interface CreateCampaignDto {
  name: string,
  description: string;
  game_master_id: number;
}

export const CreateCampaignDto = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  game_master_id: z.number()
})




