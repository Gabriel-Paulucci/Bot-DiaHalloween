import { Client, Message } from "discord.js"
import { createPlayer } from "../../database/functions/playerFuncs"
import { ICommands } from "../models/commands"

export async function executeCommand (message: Message, commands: ICommands, client: Client): Promise<void> {
    if (!message.guild || message.author.bot) {
        return
    }

    const player = await createPlayer(message.guild.id, message.author.id)

    // Separando os argumentos
    const args = message.content.slice(1).trim().split(/ +/)

    // Pegando o prefix e verificando se ele existe 
    const prefix = args.shift()?.toLowerCase() as string

    if (!prefix) {
        return
    }

    if (prefix != player.guild.prefix) {
        return
    }

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
        client: client
    })
}
