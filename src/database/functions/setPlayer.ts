import { Player } from "../models/player";
import { Treat } from "../models/treats";
import { Trick } from "../models/tricks";

export async function addEgg(player: Player) {
    player.trick.eggs++
    await Trick.save(player.trick)
}

export async function addRollOfPaper(player: Player) {
    player.trick.rollsOfPaper++
    await Trick.save(player.trick)
}

export async function addLollipop(player: Player) {
    player.treat.lollipops++
    await Treat.save(player.treat)
}

export async function addCandy(player: Player) {
    player.treat.candys++
    await Treat.save(player.treat)
}

export async function addChocolatebar(player: Player) {
    player.treat.chocolateBars++
    await Treat.save(player.treat)
}
