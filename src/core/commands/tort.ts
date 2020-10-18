import moment from "moment";
import { getPlayerinfo } from "../../database/functions/getPlayer";
import { Command } from "../models/commands";
import { IContext } from "../models/contexts";
import emojis from "../configs/emojis.json";
import { GuildMember, MessageReaction, User } from "discord.js";
import * as setPlayer from "../../database/functions/setPlayer";
import { resetPlayerTime } from "../../database/functions/resetPlayerTime";

class TrickOrTreat extends Command {
    name: string;
    alias: string[];

    constructor() {
        super();
        this.name = 'trickortreat'
        this.alias = [
            'docuraoutravessura',
            'tort',
            'dout',
            'tt',
            'dt'
        ]
        this.info = {
            description: 'Caçar doçuras ou travessuras ',
            module: 'Game',
            usage: []
        }
    }

    async execCommand(context: IContext): Promise<void> {
        
    }
}

const trickOrTreat = new TrickOrTreat();

export default trickOrTreat
