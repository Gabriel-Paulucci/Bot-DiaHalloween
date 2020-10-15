import { getRepository } from "typeorm";
import { User } from "../models/user";

export async function create({ discordId }: User): Promise<User> {
    const rep = getRepository(User)

    const exist = await rep.findOne({
        where: {
            discordId: discordId
        }
    })

    if (!exist) {
        const user = rep.create({
            discordId: discordId
        })

        await rep.save(user)

        return user
    }

    return exist
}
