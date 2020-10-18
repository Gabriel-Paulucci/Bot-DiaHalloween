import { Player } from "../models/player";
import { defaultTime } from "./defaultTime";

export async function resetPlayerTime(player :Player) {
    player.trickOrTreatTime = defaultTime().toISOString()
    
    await Player.save(player)
}
