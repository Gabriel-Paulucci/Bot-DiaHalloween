import { MessageEmbed } from "discord.js";
import { Command } from "../models/commands";
import { IContext } from "../models/contexts";
import colors from "../configs/colors.json";

interface IHelpModule {
    [keyof: string]: string
}

class Help extends Command {
    name: string;
    alias: string[];

    constructor() {
        super();
        this.name = 'help'
        this.alias = [
            'ajuda'
        ]
        this.info = {
            description: 'Comando para informações',
            module: 'Util',
            usage: [
                'Comando (Opicional)'
            ]
        }
    }

    async execCommand(context: IContext): Promise<void> {
        if (context.args[0]) {
            if (context.commands[context.args[0]]) {
                const command = context.commands[context.args[0]]
                const embed = new MessageEmbed()
                embed.setTitle(command.name)
                embed.setDescription(command.info.description)
                embed.setColor(colors.laranja)

                if (command.alias.length > 0) {
                    let alias = ''
                    for (let i = 0; i < command.alias.length; i++) {
                        alias = alias.concat(command.alias[i] + '\n')
                    }
                    embed.addField('Alias', alias)
                }

                if (command.info.usage.length > 0) {
                    let usage = ''
                    for (let i = 0; i < command.info.usage.length; i++) {
                        usage = usage.concat(command.info.usage[i] + '\n')
                    }
                    embed.addField('Informações a passar', usage)
                }

                context.message.channel.send(embed)
            }
            else {
                const embed = new MessageEmbed()
                embed.setColor(colors.laranja)
                embed.setTitle('Comando não encontrado')
                context.message.channel.send(embed)
            }
        }
        else {
            const embed = new MessageEmbed()
            embed.setTitle('Comandos')
            embed.setColor(colors.laranja)
            const modules: IHelpModule = {}

            for (const key in context.commandsUnique) {
                const command = context.commandsUnique[key];
                if (!modules[command.info.module]) modules[command.info.module] = ''
                modules[command.info.module] = modules[command.info.module].concat('`' + command.name + '` ')
            }

            for (const key in modules) {
                const info = modules[key];

                embed.addField(key, info)
            }

            context.message.channel.send(embed)
        }
    }
}

const help = new Help()

export default help
