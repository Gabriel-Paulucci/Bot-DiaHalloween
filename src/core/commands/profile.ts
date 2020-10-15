import { Player } from "../../database/models/player";
import { Command } from "../models/commands";
import { IContext } from "../models/contexts";

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
                '<user>?'
            ]
        }
    }

    async execCommand(context: IContext): Promise<void> {
        const player = context.params['player'] as Player
        console.log(player)
    }
}

const profile = new Profile()

export default profile
