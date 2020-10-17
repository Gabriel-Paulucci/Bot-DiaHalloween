import { Message, MessageReaction } from "discord.js";
import { getPlayerinfo } from "../../database/functions/getPlayer";
import * as setPlayer from "../../database/functions/setPlayer";
import emojis from '../configs/emojis.json';


export async function genCandy(message: Message) {
    if (!message.guild || message.author.bot) return

    const numb = Math.round(Math.random() * (100 - 1) + 1)

    if (numb >= 1 && numb <= 10) {
        const emoji = emojis.emojiReact[Math.round(Math.random() * (emojis.emojiReact.length - 1))]
        await message.react(emoji)

        const collector = message.createReactionCollector((reaction: MessageReaction) => {
            return reaction.emoji.name === emoji
        }, {
            time: 10000,
            max: 1
        })

        collector.on('collect', async (reaction, user) => {
            const member = reaction.message.guild?.members.cache.get(user.id)
            
            if (!member) return
            
            const isTrick = Math.round(Math.random())
            const player = await getPlayerinfo(member.id)

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

                reaction.message.channel.send('Hahahah travessura para você ' + member.displayName + ' ' + trick)
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
                
                reaction.message.channel.send('Uma doçura para você ' + member.displayName + ' ' + treat)
            }
        })
    }
}
