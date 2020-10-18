import { Client, Message } from "discord.js"
import { getPrefix } from "../../database/functions/getPrefix"
import { ICommands } from "../models/commands"

export async function executeCommand (message: Message, commands: ICommands, client: Client, commandsUnique: ICommands): Promise<void> {
    if (!message.guild || message.author.bot) {
        return
    }

    const player = await getPrefix(message.guild.id, message.author.id)

    if (!message.content.startsWith(player.guild.prefix)) {
        return
    }

    // Separando os argumentos
    const args = message.content.slice(player.guild.prefix.length).trim().split(/ +/)

    // Pegando o commandName e verifiando se ele existe
    const commandName = args.shift()?.toLowerCase() as string

    if (!commandName) {
        return
    }

    const command = commands[commandName]

    if (!command) {
        return
    }

    // Executando comando
    command.execCommand({
        message: message,
        client: client,
        args: args,
        commandsUnique: commandsUnique,
        commands: commands
    })
}
