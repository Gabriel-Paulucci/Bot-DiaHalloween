import { Guild } from "../models/guild";
import { Player } from "../models/player";
import { Treat } from "../models/treats";
import { Trick } from "../models/tricks";
import { User } from "../models/user";

export async function getPrefix(guildId: string, userId: string): Promise<Player> {
    console.log(guildId)
    console.log(userId)

    let user = await User.findOne({
        where: {
            discordId: userId
        }
    })

    if (!user) {
        user = User.create({
            discordId: userId
        })

        await User.save(user)
    }

    let guild = await Guild.findOne({
        where: {
            discordId: guildId
        }
    })

    if (!guild) {
        guild = Guild.create({
            discordId: guildId
        })

        await Guild.save(guild)
    }

    let player = await Player.findOne({
        where: {
            guildId: guild.id,
            userId: user.id
        },
        relations: [
            'guild'
        ]
    })

    if (!player) {
        const trick = await Trick.save(new Trick())
        const treat = await Treat.save(new Treat())

        player = Player.create({
            guild: guild,
            user: user,
            trick: trick,
            treat: treat
        })

        Player.save(player)
    }

    console.log(player)

    return player
}
