import { MessageEmbed } from "discord.js";
import { getPrefixByGuild } from "../../database/functions/getPrefix";
import { setPrefix } from "../../database/functions/setPrefix";
import { Command } from "../models/commands";
import { IContext } from "../models/contexts";
import colors from "../configs/colors.json";

class Prefix extends Command {
    name: string;
    alias: string[];

    constructor() {
        super();
        this.name = 'prefix'
        this.alias = [
            'prefixo'
        ],
        this.info = {
            module: 'Config',
            description: 'Pega o prefixo ou define um prefixo',
            usage: [
                'Novo prefixo (Opicional)'
            ]
        }
    }

    async execCommand(context: IContext): Promise<void> {
        if (!context.message.guild) return

        const embed = new MessageEmbed()
        embed.setColor(colors.laranja)

        if (context.args[0]) {
            if (!context.message.member?.hasPermission('MANAGE_GUILD')) {
                embed.setTitle('Você deve ter permissão gerenciar servidor')
                context.message.channel.send(embed)
                return
            }

            if (context.args[0].length > 13) {
                embed.setTitle('O prefixo deve conter no maximo 13 caracteres')
                context.message.channel.send(embed)
                return
            }

            const guild = await setPrefix(context.message.guild.id, context.args[0])
            embed.setTitle('Meu novo prefixo é ' + guild.prefix)
            context.message.channel.send(embed)
        }
        else {
            const guild = await getPrefixByGuild(context.message.guild.id)
            embed.setTitle('Meu prefixo é ' + guild.prefix)
            context.message.channel.send(embed)
        }
    }
}

const prefix = new Prefix()

export default prefix
