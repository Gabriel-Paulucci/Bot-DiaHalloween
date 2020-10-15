import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player";

@Entity('users')
export class User {
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
    
    @OneToMany(() => Player, x => x.user.id)
    players!: Player[]
}
