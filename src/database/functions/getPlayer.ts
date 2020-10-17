import { Player } from "../models/player";
import { User } from "../models/user";

export async function getPlayerinfo(userId: string): Promise<Player> {
    const user = await User.findOne({
        where: {
            discordId: userId
        }
    })

    const player = await Player.findOne({
        where: {
            userId: user?.id
        },
        relations: [
            'user',
            'trick',
            'treat'
        ]
    })

    return player as Player
}
