import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity('guilds')
export class Guild {
    @PrimaryGeneratedColumn('increment', {
        unsigned: true,
        type: 'integer'
    })
    id!: number

    @Column({
        type: 'integer',
        unsigned: true
    })
    discordId!: number

    @OneToMany(() => Player, x => x.guild.id)
    players!: Player[]
}
