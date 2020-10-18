import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";
import config from "../../configs/bot.json";

@Entity('guilds')
@Index(['discordId'], {
    unique: true 
})
export class Guild extends BaseEntity {
    @PrimaryGeneratedColumn('increment', {
        unsigned: true,
        type: 'integer'
    })
    id!: number

    @Column({
        type: 'text',
        unsigned: true
    })
    discordId!: string

    @Column({
        type: 'text',
        default: config.prefix
    })
    prefix!: string

    @OneToMany(() => Player, x => x.guild)
    players!: Player[]
}
