import { getPrefixByGuild } from "../../database/functions/getPrefix";
import { setPrefix } from "../../database/functions/setPrefix";
import { Command } from "../models/commands";
import { IContext } from "../models/contexts";

class Prefix extends Command {
    name: string;
    alias: string[];

    constructor() {
        super();
        this.name = 'prefix'
        this.alias = [],
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

        if (context.args[0]) {
            if (context.args[0].length > 13) {
                context.message.channel.send('O prefixo deve conter no maximo 13 caracteres')
                return
            }

            const guild = await setPrefix(context.message.guild.id, context.args[0])
            context.message.channel.send('Meu novo prefixo é ' + guild.prefix)
        }
        else {
            const guild = await getPrefixByGuild(context.message.guild.id)
            context.message.channel.send('Meu prefixo é ' + guild.prefix)
        }
    }

}

const prefix = new Prefix()

export default prefix
