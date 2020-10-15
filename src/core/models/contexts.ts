import { Client, Message } from "discord.js";

interface IContextType {
    [keyof: string]: any
}

export interface IContext {
    message: Message
    client: Client
    args: string[]
    params: IContextType
}
