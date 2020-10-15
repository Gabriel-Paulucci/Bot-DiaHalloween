import { getRepository } from "typeorm";
import { Player } from "../models/player";
import { Treat } from "../models/treats";
import { Trick } from "../models/tricks";
import { createGuild } from "./guildFuncs";
import { createUser } from "./userFuncs";

export async function createPlayer(guildId: string, userId: string): Promise<Player> {
    const rep = getRepository(Player)

    const exist = await rep.findOne({
        where: {
            guild: {
                discordId: guildId
            },
            user: {
                discordId: userId
            }
        }
    })

    if (!exist) {
        const guild = await createGuild(guildId)
        const user = await createUser(userId)

        const player = rep.create({
            user: user,
            guild: guild,
            treat: await getRepository(Treat).save({}),
            trick: await getRepository(Trick).save({})
        })

        await rep.save(player)

        return player
    }

    return exist
}
