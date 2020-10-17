import { Guild } from "../models/guild";

export async function setPrefix(discordId: string, prefix: string): Promise<Guild> {
    const guild = await Guild.findOne({
        where: {
            discordId: discordId
        }
    }) as Guild

    guild.prefix = prefix

    await Guild.save(guild)

    return guild
}