import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
