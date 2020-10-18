import { Command } from "../models/commands";
import { IContext } from "../models/contexts";

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
    }

    async execCommand(context: IContext): Promise<void> {
        
    }
}

const trickOrTreat = new TrickOrTreat();

export default trickOrTreat
