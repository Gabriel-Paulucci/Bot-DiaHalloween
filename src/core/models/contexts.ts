import { Client, Message } from "discord.js";
import { ICommands } from "./commands";

export interface IContext {
    message: Message
    client: Client
    args: string[]
    commandsUnique: ICommands
    commands: ICommands
}
