import moment from "moment";
import { getPlayerinfo } from "../../database/functions/getPlayer";
import { Command } from "../models/commands";
import { IContext } from "../models/contexts";
import emojis from "../configs/emojis.json";
import { GuildMember, MessageEmbed, MessageReaction, User } from "discord.js";
import * as setPlayer from "../../database/functions/setPlayer";
import { resetPlayerTime } from "../../database/functions/resetPlayerTime";
import colors from "../configs/colors.json";

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
        const player = await getPlayerinfo(context.message.author.id)
        const dateNow = moment().valueOf()
        const dateStart = moment(player.trickOrTreatTime).valueOf()

        const embed = new MessageEmbed()
        embed.setColor(colors.laranja)

        if (dateNow > dateStart) {
            await resetPlayerTime(player)

            const emoji = emojis.emojiReact[Math.round(Math.random() * (emojis.emojiReact.length - 1))]
            context.message.react(emoji)

            const members: GuildMember[] = [] 

            const collector = context.message.createReactionCollector((reaction: MessageReaction, user: User) => {
                if (user.id == player.user.discordId || user.id == context.client.user?.id) {
                    return false
                }
                for (let i = 0; i < members.length; i++) {
                    const member = members[i];
                    if (user.id == member.id) {
                        return false
                    }
                }
                return reaction.emoji.name === emoji
            }, {
                time: 10000,
                max: 5
            })

            collector.on('collect', async (reaction, user) => {
                const member = reaction.message.guild?.members.cache.get(player.user.discordId)
                
                if (!member) return

                members.push(member)
                
                const isTrick = Math.round(Math.random())
    
                if (isTrick) {
                    const trick = emojis.tricks[Math.round(Math.random() * (emojis.tricks.length - 1))]
    
                    switch (trick) {
                        case emojis.egg:
                            setPlayer.addEgg(player)
                            break;
    
                        case emojis.rollOfPaper:
                            setPlayer.addRollOfPaper(player)
                            break;
                    
                        default:
                            break;
                    }
                    embed.setTitle('Hahahah travessura para você ' + member.displayName + ' ' + trick)
                    reaction.message.channel.send(embed)
                    return
                }
                else {
                    const treat = emojis.treats[Math.round(Math.random() * (emojis.treats.length - 1))]
    
                    switch (treat) {
                        case emojis.lollipop:
                            setPlayer.addLollipop(player)
                            break;
    
                        case emojis.candy:
                            setPlayer.addCandy(player)
                            break;
    
                        case emojis.chocolateBar:
                            setPlayer.addChocolatebar(player)
                            break;
                    
                        default:
                            break;
                    }
                    embed.setTitle('Uma doçura para você ' + member.displayName + ' ' + treat)
                    reaction.message.channel.send(embed)
                    return
                }
            })
        }
        else {
            const duration = moment(dateStart - dateNow).format('mm[m]')
            embed.setTitle('Espere ' + duration + ' para usar esse comando')
            context.message.channel.send(embed)
        }
    }
}

const trickOrTreat = new TrickOrTreat();

export default trickOrTreat
