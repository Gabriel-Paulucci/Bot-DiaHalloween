import { MessageEmbed } from "discord.js";
import { getPlayerinfo } from "../../database/functions/getPlayerInfo";
import { Player } from "../../database/models/player";
import { Command } from "../models/commands";
import { IContext } from "../models/contexts";
import emojis from '../configs/emojis.json';
import colors from '../configs/colors.json';

class Profile extends Command {
    name: string
    alias: string[]

    constructor() {
        super()
        this.name = 'profile',
        this.alias = [
            'perfil'
        ]
        this.info = {
            description: 'Apresenta as informações sobre o jogador',
            module: 'Util',
            usage: [
                'Usuario (Opicional)'
            ]
        }
    }

    async execCommand(context: IContext): Promise<void> {
        let player: Player
        let member = context.message.guild?.members.cache.get(context.args[0])

        if (member) {
            player = await getPlayerinfo(member.id)
        }
        else {
            member = context.message.guild?.members.cache.get(context.message.author.id)
            player = await getPlayerinfo(context.message.author.id)
        }

        const embed = new MessageEmbed()
        embed.setTitle('Perfil de ' + member?.displayName)
        embed.setThumbnail(member?.user.avatarURL() as string)
        embed.setColor(colors.laranja)

        let doces = 
            emojis.lollipop + ' ' + player.treat.lollipops + '\n' +
            emojis.candy + ' ' + player.treat.candys + '\n' +
            emojis.chocolateBar + ' ' + player.treat.chocolateBars

        embed.addField('Doces', doces)

        context.message.channel.send(embed)
    }
}

const profile = new Profile()

export default profile
