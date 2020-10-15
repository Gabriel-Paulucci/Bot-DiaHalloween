import { getRepository } from "typeorm";
import { Guild } from "../models/guild";

export async function createGuild(discordId: string): Promise<Guild> {
    const rep = getRepository(Guild)

    const exist = await rep.findOne({
        where: {
            discordId: discordId
        }
    })

    if (!exist) {
        const guild = rep.create({
            discordId: discordId
        })

        await rep.save(guild)

        return guild
    }

    return exist
}
