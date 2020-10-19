import { Guild } from "../models/guild";
import { Player } from "../models/player";
import { User } from "../models/user";

export async function getPlayerinfo(userId: string, guildId: string): Promise<Player> {
    const user = await User.findOne({
        where: {
            discordId: userId
        }
    })

    const guild = await Guild.findOne({
        where: {
            discordId: guildId
        }
    })

    const player = await Player.findOne({
        where: {
            userId: user?.id,
            guildId: guild?.id
        },
        relations: [
            'user',
            'trick',
            'treat'
        ]
    })

    return player as Player
}
