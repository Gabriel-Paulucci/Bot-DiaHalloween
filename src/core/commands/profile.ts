import { MessageEmbed } from "discord.js";
import { getPlayerinfo } from "../../database/functions/getPlayer";
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
        let member = context.message.mentions.members?.first()

        if (member) {
            player = await getPlayerinfo(member.id, context.message.guild?.id as string)
        }
        else {
            member = context.message.guild?.members.cache.get(context.message.author.id)
            player = await getPlayerinfo(context.message.author.id, context.message.guild?.id as string)
        }

        if (!player) {
            const embed = new MessageEmbed()
            embed.setColor(colors.laranja)
            embed.setTitle(member?.displayName + ' não esta participando do jogo')
            context.message.channel.send(embed)
            return
        }

        const embed = new MessageEmbed()
        embed.setTitle('Perfil de ' + member?.displayName)
        embed.setThumbnail(member?.user.avatarURL({dynamic: true}) as string)
        embed.setColor(colors.laranja)
        embed.setDescription('Jogo Doçuras ou Travessuras')

        embed.addField('\u200b', '\u200b')

        let pontos = ((
            player.treat.lollipops +
            player.treat.candys +
            player.treat.chocolateBars
        ) - (
            player.trick.eggs + 
            player.trick.rollsOfPaper
        )) * 18

        embed.addField('Pontos', pontos)

        let docuras = 
            emojis.lollipop + ' ' + player.treat.lollipops + '\n' +
            emojis.candy + ' ' + player.treat.candys + '\n' +
            emojis.chocolateBar + ' ' + player.treat.chocolateBars

        embed.addField('Doçuras', docuras, true)

        let travessuras =
            emojis.egg + ' ' + player.trick.eggs + '\n' + 
            emojis.rollOfPaper + ' ' + player.trick.rollsOfPaper

        embed.addField('Travessuras', travessuras, true)

        context.message.channel.send(embed)
    }
}

const profile = new Profile()

export default profile
